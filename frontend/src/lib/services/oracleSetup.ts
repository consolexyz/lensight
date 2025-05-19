/**
 * Oracle utilities for setting up automated prediction resolution
 */

import contractService from './contractService';

/**
 * Sets the oracle as the resolver for a prediction contract
 * 
 * This function can be called after a prediction is created to ensure
 * that the oracle can automatically resolve it when it expires.
 * 
 * @param contractAddress Address of the prediction market contract
 * @param creatorPrivateKey Private key of the creator (needed to set resolver)
 * @returns Transaction hash or empty string if no action taken
 */
export async function setupAutomatedResolution(
    contractAddress: string,
    creatorPrivateKey: string
): Promise<string> {
    try {
        if (!contractAddress) {
            throw new Error('Contract address is required');
        }

        if (!creatorPrivateKey) {
            throw new Error('Creator private key is required');
        }

        // Get oracle address
        const oracleAddress = contractService.getOracleAddress();
        if (!oracleAddress) {
            console.warn('Oracle address not available. Automated resolution cannot be set up.');
            return '';
        }

        // Set the oracle as resolver
        return await contractService.setOracleAsResolver(contractAddress, creatorPrivateKey);
    } catch (error) {
        console.error('Failed to set up automated resolution:', error);
        throw error;
    }
}

/**
 * Checks if the oracle is set as resolver for a prediction
 * 
 * @param contractAddress Address of the prediction market contract
 * @returns Boolean indicating if oracle is the resolver
 */
export async function isOracleResolver(contractAddress: string): Promise<boolean> {
    try {
        if (!contractAddress) {
            return false;
        }

        // Get oracle address
        const oracleAddress = contractService.getOracleAddress();
        if (!oracleAddress) {
            return false;
        }

        // Get prediction details
        const details = await contractService.getPredictionDetails(contractAddress);

        // Compare resolver with oracle address
        return details.resolver.toLowerCase() === oracleAddress.toLowerCase();
    } catch (error) {
        console.error('Failed to check if oracle is resolver:', error);
        return false;
    }
}
