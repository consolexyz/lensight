import {
    createPublicClient,
    http,
    createWalletClient,
    parseAbi,
    getContract,
    decodeEventLog,
    custom
} from 'viem';
import { lensChainMainnet } from './chains';
import type { Address } from 'viem';
import 'dotenv/config';

// Contract addresses
const PREDICTION_MARKET_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_PREDICTION_FACTORY_ADDRESS;

// ABI for the specific functions we need
const PREDICTION_MARKET_FACTORY_ABI = parseAbi([
    'function createMarket(string question, uint256 expiryTime, string resolutionSource, uint256 targetPrice, string comparisonOperator, string category) returns (address)',
    'event MarketCreated(address indexed market, address indexed creator, string question)',
]);

export interface CreatePredictionParams {
    question: string;
    expiryTime: number; // Unix timestamp
    targetPrice: string; // String representation of the price in wei
    comparisonOperator: string; // >, <, etc.
    category: string;
}

export async function createPredictionMarket(params: CreatePredictionParams): Promise<string> {
    try {
        // Check if window.ethereum is available (MetaMask is installed)
        if (!window.ethereum) {
            throw new Error("Please install MetaMask or another web3 provider");
        }

        // Create public client for reading from the blockchain
        const publicClient = createPublicClient({
            chain: lensChainMainnet,
            transport: http()
        });            // Check if we're on the right network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (parseInt(chainId as string, 16) !== lensChainMainnet.id) {
            console.warn(`Wrong network detected: ${chainId}, expected: ${lensChainMainnet.id}`);
            // Get current network name if available
            let currentNetwork = "unknown network";
            try {
                const chainList = await window.ethereum.request({ method: 'eth_chainId' });
                currentNetwork = `network with ID ${parseInt(chainId as string, 16)}`;
            } catch (e) {
                console.error("Failed to get network info:", e);
            }

            throw new Error(`Please switch from ${currentNetwork} to the ${lensChainMainnet.name} network (Chain ID: ${lensChainMainnet.id})`);
        }

        // Create wallet client for writing to the blockchain
        // Using custom transport with window.ethereum
        const walletClient = createWalletClient({
            chain: lensChainMainnet,
            transport: custom(window.ethereum)
        });

        // Get connected accounts
        const [address] = await walletClient.requestAddresses();

        // Create contract instance
        const contract = getContract({
            address: PREDICTION_MARKET_FACTORY_ADDRESS as Address,
            abi: PREDICTION_MARKET_FACTORY_ABI,
            // Use the Viem v2 syntax for client 
            client: { public: publicClient, wallet: walletClient }
        });

        // Create a new market
        const hash = await contract.write.createMarket([
            params.question,
            BigInt(params.expiryTime),
            "MANUAL", // Resolution source - we'll use manual resolution for now
            BigInt(params.targetPrice),
            params.comparisonOperator,
            params.category
        ], { account: address }); console.log("Transaction submitted with hash:", hash);

        // Wait for the transaction to be mined
        let receipt;
        try {
            receipt = await publicClient.waitForTransactionReceipt({ hash });
            console.log("Transaction confirmed in block:", receipt.blockNumber);
        } catch (waitError) {
            console.error("Error waiting for transaction receipt:", waitError);
            throw new Error("Transaction was submitted but we couldn't confirm it. Please check your wallet for status.");
        }

        // Check if transaction was successful
        if (receipt.status === 'reverted') {
            throw new Error("Transaction failed. The contract reverted the operation.");
        }

        // Find the MarketCreated event in the logs
        const marketCreatedLog = receipt.logs.find(log => {
            try {
                const event = decodeEventLog({
                    abi: PREDICTION_MARKET_FACTORY_ABI,
                    data: log.data,
                    topics: log.topics
                });
                return event.eventName === 'MarketCreated';
            } catch {
                return false;
            }
        });

        if (!marketCreatedLog) {
            throw new Error("Failed to extract market address from events");
        }

        // Decode the event to get the market address
        const event = decodeEventLog({
            abi: PREDICTION_MARKET_FACTORY_ABI,
            data: marketCreatedLog.data,
            topics: marketCreatedLog.topics
        });

        // Return the address of the new prediction market
        return event.args.market as string;
    } catch (error) {
        console.error("Error creating prediction market:", error);

        // Provide more detailed error message
        if (error instanceof Error) {
            // Check for common error patterns
            if (error.message.includes("user rejected")) {
                throw new Error("You rejected the transaction in your wallet");
            } else if (error.message.includes("insufficient funds")) {
                throw new Error("Insufficient funds in your wallet to complete this transaction");
            } else if (error.message.includes("nonce")) {
                throw new Error("Transaction nonce error. Please try refreshing the page");
            }
        }

        throw error;
    }
}
