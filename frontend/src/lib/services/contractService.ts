/**
 * ContractService
 * 
 * Provides functionality to interact with the PredictionMarket smart contract
 * for resolution and management of predictions.
 */

import { ethers, ContractTransactionResponse } from 'ethers';
import { lensChainMainnet } from "@/lib/contracts/chains";
import PredictionMarketABI from '@/lib/contracts/abis/PredictionMarket.json';

export interface ContractDetails {
    question: string;
    expiryTime: bigint;
    state: number; // 0=OPEN, 1=CLOSED, 2=RESOLVED, 3=CANCELED
    outcome: number; // 0=UNRESOLVED, 1=YES, 2=NO, 3=INVALID
    totalYesAmount: bigint;
    totalNoAmount: bigint;
    resolver: string;
}

// Define a type for the connected contract with all necessary methods
type PredictionMarketContract = ethers.Contract & {
    resolveMarket(outcome: number): Promise<ContractTransactionResponse>;
    state(): Promise<number>;
    expiryTime(): Promise<bigint>;
    closeMarket(): Promise<ContractTransactionResponse>;
    question(): Promise<string>;
    outcome(): Promise<number>;
    totalYesAmount(): Promise<bigint>;
    totalNoAmount(): Promise<bigint>;
    resolver(): Promise<string>;
    creator(): Promise<string>;
    setResolver(address: string): Promise<ContractTransactionResponse>;
};

export class ContractService {
    private provider: ethers.Provider;
    private oracleAddress: string | null = null;

    constructor() {
        // Use RPC URL from environment variable or default to public lens testnet endpoint
        const rpcUrl = process.env.LENS_RPC_URL || lensChainMainnet.rpcUrls.default.http[0];
        try {
            this.provider = new ethers.JsonRpcProvider(rpcUrl);

            // Initialize oracle address if private key is set
            this.initializeOracleAddress();
        } catch (error) {
            console.error('Error initializing ethers provider:', error);
            // Fallback to a default provider as last resort
            this.provider = ethers.getDefaultProvider(lensChainMainnet.id);
        }
    }

    /**
     * Initialize the oracle address from the private key
     */
    private async initializeOracleAddress() {
        try {
            const oraclePrivateKey = process.env.ORACLE_PRIVATE_KEY;
            if (!oraclePrivateKey) {
                console.log('No oracle private key found in environment variables');
                return;
            }

            const wallet = new ethers.Wallet(oraclePrivateKey);
            this.oracleAddress = wallet.address;
            console.log('Oracle address initialized:', this.oracleAddress);
        } catch (error) {
            console.error('Failed to initialize oracle address:', error);
        }
    }

    /**
     * Gets the oracle address
     */
    public getOracleAddress(): string | null {
        return this.oracleAddress;
    }

    /**
     * Creates a wallet instance with the private key
     * @param privateKey The private key to use
     * @returns An ethers Wallet instance
     */
    private getWallet(privateKey: string): ethers.Wallet {
        return new ethers.Wallet(privateKey, this.provider);
    }

    /**
     * Gets a contract instance for a prediction market
     * @param contractAddress The address of the prediction market contract
     * @returns A contract instance
     */
    private getPredictionMarketContract(contractAddress: string): PredictionMarketContract {
        return new ethers.Contract(
            contractAddress,
            PredictionMarketABI,
            this.provider
        ) as PredictionMarketContract;
    }

    /**
     * Resolves a prediction market with the final outcome
     * 
     * @param contractAddress The address of the prediction market contract
     * @param isTrue Whether the prediction is true (YES) or false (NO)
     * @param privateKey Private key of the resolver account
     * @returns Transaction hash
     */
    async resolvePredictionMarket(
        contractAddress: string,
        isTrue: boolean,
        privateKey: string
    ): Promise<string> {
        try {
            const wallet = this.getWallet(privateKey);
            const contract = this.getPredictionMarketContract(contractAddress);
            // Correctly type the connected contract
            const connectedContract = contract.connect(wallet) as PredictionMarketContract;

            // Check if market is already resolved
            const state = await connectedContract.state();

            if (state === 2) { // RESOLVED
                throw new Error('Market is already resolved');
            }

            // If market is still open and past expiry, close it first
            if (state === 0) { // OPEN
                const expiryTime = await connectedContract.expiryTime();
                const currentTime = BigInt(Math.floor(Date.now() / 1000));

                if (currentTime >= expiryTime) {
                    const closeTx = await connectedContract.closeMarket();
                    await closeTx.wait();
                } else {
                    throw new Error('Market is still open and not expired');
                }
            }

            // Resolve the market with outcome (1=YES, 2=NO)
            const outcome = isTrue ? 1 : 2; // 1=YES, 2=NO

            const tx = await connectedContract.resolveMarket(outcome);
            const receipt = await tx.wait();

            return tx.hash;
        } catch (error) {
            console.error('Error resolving prediction market:', error);
            throw new Error(`Failed to resolve market: ${(error as Error).message}`);
        }
    }

    /**
     * Checks if a prediction market is already resolved
     * 
     * @param contractAddress The address of the prediction market contract
     * @returns Boolean indicating if the market is resolved
     */
    async isPredictionResolved(contractAddress: string): Promise<boolean> {
        try {
            const contract = this.getPredictionMarketContract(contractAddress);
            const state = await contract.state();
            return state === 2; // 2 = RESOLVED
        } catch (error) {
            console.error('Error checking if prediction is resolved:', error);
            throw new Error(`Failed to check if market is resolved: ${(error as Error).message}`);
        }
    }

    /**
     * Gets details from a prediction market contract
     * 
     * @param contractAddress The address of the prediction market contract
     * @returns Contract details
     */
    async getPredictionDetails(contractAddress: string): Promise<ContractDetails> {
        try {
            const contract = this.getPredictionMarketContract(contractAddress);

            const question = await contract.question();
            const expiryTime = await contract.expiryTime();
            const state = await contract.state();
            const outcome = await contract.outcome();
            const totalYesAmount = await contract.totalYesAmount();
            const totalNoAmount = await contract.totalNoAmount();
            const resolver = await contract.resolver();

            return {
                question: question,
                expiryTime: expiryTime,
                state: Number(state),
                outcome: Number(outcome),
                totalYesAmount: totalYesAmount,
                totalNoAmount: totalNoAmount,
                resolver: resolver
            };
        } catch (error) {
            console.error('Error fetching prediction details:', error);
            throw new Error(`Failed to fetch market details: ${(error as Error).message}`);
        }
    }

    /**
     * Sets the resolver of a prediction market to the oracle address
     * 
     * @param contractAddress The address of the prediction market contract
     * @param privateKey Private key of the creator account
     * @returns Transaction hash
     */
    async setOracleAsResolver(contractAddress: string, privateKey: string): Promise<string> {
        try {
            if (!this.oracleAddress) {
                throw new Error('Oracle address not initialized. Make sure ORACLE_PRIVATE_KEY is set.');
            }

            const wallet = this.getWallet(privateKey);
            const contract = this.getPredictionMarketContract(contractAddress);
            // Correctly type the connected contract
            const connectedContract = contract.connect(wallet) as PredictionMarketContract;

            // Check if wallet address is the creator
            const creator = await connectedContract.creator();

            if (creator.toLowerCase() !== wallet.address.toLowerCase()) {
                throw new Error('Only the creator can set the resolver');
            }

            // Check current resolver
            const currentResolver = await connectedContract.resolver();

            if (currentResolver.toLowerCase() === this.oracleAddress.toLowerCase()) {
                console.log('Oracle is already set as resolver');
                return '';
            }

            // Set the oracle as the resolver
            const tx = await connectedContract.setResolver(this.oracleAddress);
            const receipt = await tx.wait();

            console.log(`Smiaet oracle as resolver for contract ${contractAddress}, tx: ${tx.hash}`);
            return tx.hash;
        } catch (error) {
            console.error('Error setting oracle as resolver:', error);
            throw new Error(`Failed to set oracle as resolver: ${(error as Error).message}`);
        }
    }
}

export default new ContractService();