/**
 * PredictionResolverService
 * 
 * Combines price data from the PriceOracle and blockchain interactions from ContractService
 * to automatically resolve predictions based on their target prices and outcomes.
 */

import { Prediction, PredictionStatus } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import priceOracle from './priceOracle';
import contractService from './contractService';

export interface ResolveOptions {
    updateDatabase?: boolean;
    updateBlockchain?: boolean;
    resolverPrivateKey?: string;
    dryRun?: boolean;
}

export interface ResolveResult {
    predictionId: string;
    contractAddress?: string;
    actualPrice?: number;
    targetPrice?: string;
    comparisonOperator?: string;
    outcome: boolean;
    resolved: boolean;
    txHash?: string;
    error?: string;
}

export class PredictionResolverService {
    /**
     * Resolves a single prediction using price data if applicable
     * 
     * @param prediction The prediction to resolve
     * @param options Resolution options
     * @returns Resolution result
     */
    async resolvePrediction(
        prediction: Prediction,
        options: ResolveOptions = { updateDatabase: true, updateBlockchain: true, dryRun: false }
    ): Promise<ResolveResult | null> {
        try {
            const {
                updateDatabase = true,
                updateBlockchain = true,
                resolverPrivateKey,
                dryRun = false
            } = options;

            // Skip if not ready to resolve or already resolved
            if (
                prediction.status !== PredictionStatus.OPEN &&
                prediction.status !== PredictionStatus.CLOSED
            ) {
                console.log(`Prediction ${prediction.id} is already resolved or not in a resolvable state`);
                return null;
            }

            // Only process AUTO resolution predictions if they have contract address
            if (!prediction.contractAddress) {
                console.log(`Prediction ${prediction.id} has no contract address, skipping`);
                return null;
            }

            // Check if the prediction has expired
            const now = new Date();
            if (prediction.expiresAt > now) {
                console.log(`Prediction ${prediction.id} has not expired yet`);
                return null;
            }

            // Default result with updated values
            const result: ResolveResult = {
                predictionId: prediction.id,
                contractAddress: prediction.contractAddress || undefined,
                targetPrice: prediction.targetPrice || undefined,
                comparisonOperator: prediction.comparisonOperator || undefined,
                outcome: false,
                resolved: false
            };                // Determine the outcome
            if (prediction.targetPrice && prediction.comparisonOperator) {
                // All predictions with target price and comparison operator are handled as price comparisons
                try {
                    // Use tokenSymbol if available, otherwise fall back to extracting from content
                    const symbol = prediction.tokenSymbol || prediction.content.split(' ')[0];

                    // Try to get the price based on the category
                    const actualPrice = await priceOracle.getPrice(
                        prediction.category.toLowerCase(),
                        symbol
                    );

                    result.actualPrice = actualPrice;

                    // Evaluate using the comparison operator
                    result.outcome = await priceOracle.evaluatePricePrediction(
                        prediction.category.toLowerCase(),
                        symbol,
                        parseFloat(prediction.targetPrice),
                        prediction.comparisonOperator
                    );

                    console.log(`Evaluated prediction for ${prediction.id} (${prediction.category}): ${actualPrice} ${prediction.comparisonOperator} ${prediction.targetPrice} = ${result.outcome}`);
                } catch (error) {
                    console.error(`Error evaluating prediction ${prediction.id}:`, error);
                    // For now, default to false outcome for errors
                    result.outcome = false;
                    result.error = `Failed to evaluate: ${(error as Error).message}`;
                }
            } else {
                // Predictions without price data get a default outcome of false
                console.log(`Prediction ${prediction.id} doesn't have price data for automated resolution, defaulting to FALSE`);
                result.outcome = false;
            }

            // Update blockchain if requested and we have a contract address
            if (updateBlockchain && prediction.contractAddress && !dryRun) {
                if (!resolverPrivateKey) {
                    throw new Error('Resolver private key is required to update blockchain');
                }

                try {
                    // Check if the contract is already resolved
                    const isResolved = await contractService.isPredictionResolved(prediction.contractAddress);

                    if (!isResolved) {
                        result.txHash = await contractService.resolvePredictionMarket(
                            prediction.contractAddress,
                            result.outcome,
                            resolverPrivateKey
                        );
                        console.log(`Resolved contract on blockchain: ${result.txHash}`);
                    } else {
                        console.log(`Contract already resolved on blockchain: ${prediction.contractAddress}`);
                    }
                } catch (error) {
                    console.error(`Blockchain update failed: ${(error as Error).message}`);
                    result.error = `Blockchain update failed: ${(error as Error).message}`;
                }
            } else if (dryRun) {
                console.log(`[DRY RUN] Would resolve prediction ${prediction.id} as ${result.outcome ? 'TRUE' : 'FALSE'}`);
            }

            // Update database if requested and not a dry run
            if (updateDatabase && !dryRun) {
                try {
                    await prisma.prediction.update({
                        where: { id: prediction.id },
                        data: {
                            status: result.outcome ? PredictionStatus.RESOLVED_TRUE : PredictionStatus.RESOLVED_FALSE,
                            resolvedAt: new Date()
                        }
                    });

                    result.resolved = true;
                    console.log(`Updated database for prediction ${prediction.id}`);
                } catch (dbError) {
                    console.error(`Database update failed: ${(dbError as Error).message}`);
                    result.error = `Database update failed: ${(dbError as Error).message}`;
                }
            }

            return result;
        } catch (error) {
            console.error(`Error resolving prediction ${prediction.id}:`, error);
            return {
                predictionId: prediction.id,
                outcome: false,
                resolved: false,
                error: `Resolution failed: ${(error as Error).message}`
            };
        }
    }

    /**
     * Resolves all pending predictions that are ready for resolution
     * 
     * @param options Resolution options
     * @returns Array of resolution results
     */
    async resolveAllPendingPredictions(options: ResolveOptions = {}): Promise<ResolveResult[]> {
        try {
            // Find all expired predictions that aren't resolved yet
            const pendingPredictions = await prisma.prediction.findMany({
                where: {
                    AND: [
                        { expiresAt: { lt: new Date() } },
                        {
                            status: {
                                in: [PredictionStatus.OPEN, PredictionStatus.CLOSED]
                            }
                        },
                        // Must have a contract address
                        { contractAddress: { not: null } }
                    ]
                }
            });

            console.log(`Found ${pendingPredictions.length} pending predictions to resolve`);

            // Process each prediction and collect results
            const results: ResolveResult[] = [];
            for (const prediction of pendingPredictions) {
                try {
                    const result = await this.resolvePrediction(prediction, options);
                    if (result) {
                        results.push(result);
                    }
                } catch (error) {
                    console.error(`Failed to resolve prediction ${prediction.id}:`, error);
                    results.push({
                        predictionId: prediction.id,
                        outcome: false,
                        resolved: false,
                        error: `Failed to resolve: ${(error as Error).message}`
                    });
                }
            }

            return results;
        } catch (error) {
            console.error('Error resolving pending predictions:', error);
            throw new Error(`Failed to resolve predictions: ${(error as Error).message}`);
        }
    }

    /**
     * Syncs on-chain data with the database for a specific prediction
     * 
     * @param contractAddress The blockchain contract address
     * @returns Boolean indicating success
     */
    async syncContractData(contractAddress: string): Promise<boolean> {
        try {
            // Look up the prediction in the database
            const prediction = await prisma.prediction.findFirst({
                where: { contractAddress }
            });

            if (!prediction) {
                throw new Error(`No prediction found with contract address ${contractAddress}`);
            }

            // Get contract data
            const contractDetails = await contractService.getPredictionDetails(contractAddress);

            // Determine status based on contract state and outcome
            let status: PredictionStatus;
            let resolvedAt: Date | null = null;

            if (contractDetails.state === 2) { // RESOLVED
                if (contractDetails.outcome === 1) { // YES
                    status = PredictionStatus.RESOLVED_TRUE;
                    resolvedAt = new Date();
                } else if (contractDetails.outcome === 2) { // NO
                    status = PredictionStatus.RESOLVED_FALSE;
                    resolvedAt = new Date();
                } else {
                    status = PredictionStatus.CLOSED;
                }
            } else if (contractDetails.state === 1) { // CLOSED
                status = PredictionStatus.CLOSED;
            } else if (contractDetails.state === 3) { // CANCELED
                status = PredictionStatus.CLOSED;
            } else {
                status = PredictionStatus.OPEN;
            }

            // Update database
            await prisma.prediction.update({
                where: { id: prediction.id },
                data: {
                    status,
                    resolvedAt,
                    totalBetsTrue: Number(contractDetails.totalYesAmount) / 1e18, // Convert from wei to ether
                    totalBetsFalse: Number(contractDetails.totalNoAmount) / 1e18  // Convert from wei to ether
                }
            });

            return true;
        } catch (error) {
            console.error(`Error syncing contract data for ${contractAddress}:`, error);
            return false;
        }
    }
}

export default new PredictionResolverService();
