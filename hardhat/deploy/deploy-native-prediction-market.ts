import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";
import * as ethers from "ethers";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running native prediction market deploy script for Lens Chain`);

    // Initialize the wallet - use environment variable for private key
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    if (!PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY is not set in environment");
    }

    const wallet = new Wallet(PRIVATE_KEY);
    console.log(`Deployer address: ${wallet.address}`);

    // Create deployer object
    const deployer = new Deployer(hre, wallet);

    // Load factory contract artifact
    console.log("Loading PredictionMarketFactory artifact...");
    const factoryArtifact = await deployer.loadArtifact("PredictionMarketFactory");

    // Deploy the factory contract
    console.log("Deploying PredictionMarketFactory...");
    const factory = await deployer.deploy(factoryArtifact, []);

    // Show the contract info
    const factoryAddress = await factory.getAddress();
    console.log(`${factoryArtifact.contractName} was deployed to ${factoryAddress}`);

    // Create a test prediction market
    console.log("Creating a test prediction market...");
    const now = Math.floor(Date.now() / 1000);
    const oneMonthLater = now + 30 * 24 * 60 * 60; // 30 days from now

    try {
        // Get function parameters for market creation
        const question = "Will ETH price exceed $5,000 by the end of the month?";
        const targetPrice = ethers.parseEther("5000"); // 5000 ETH in wei format
        const comparisonOperator = ">";
        const category = "crypto";
        const resolutionSource = "MANUAL";

        console.log("Creating market with native tokens (GRASS)");

        // Create market - use try/catch for better error handling
        try {
            const createMarketTx = await factory.createMarket(
                question,
                oneMonthLater,
                resolutionSource,
                targetPrice,
                comparisonOperator,
                category
            );

            console.log(`Market creation transaction submitted: ${createMarketTx.hash}`);
            console.log("Waiting for transaction confirmation...");
            const receipt = await createMarketTx.wait();
            console.log("Market creation confirmed");
        } catch (error: any) {
            console.error("Failed to create market:", error.message);
            throw error; // Re-throw to halt execution
        }

        // Try to get the market count and retrieve the last created market
        try {
            // Get the market count
            const marketCount = await factory.getMarketCount();
            console.log(`Total markets: ${marketCount}`);

            if (marketCount > 0) {
                // Get the last market (index = count - 1)
                const lastIndex = marketCount - 1n;
                const marketAddress = await factory.markets(lastIndex);
                console.log(`Test prediction market created at: ${marketAddress}`);

                // Load PredictionMarket artifact
                const predictionMarketArtifact = await deployer.loadArtifact("PredictionMarket");
                console.log(`Contract type: ${predictionMarketArtifact.contractName}`);

                // Get instance of the deployed market contract
                const marketContract = await hre.ethers.getContractAt(
                    predictionMarketArtifact.abi,
                    marketAddress
                );

                // Get some details to verify it's working
                const marketQuestion = await marketContract.question();
                console.log(`Market question: ${marketQuestion}`);
                console.log(`Market expiry time: ${await marketContract.expiryTime()}`);
            }
        } catch (error) {
            console.log("Could not retrieve market details:", error);
        }
    } catch (error: any) {
        console.error("Error creating market:", error.message || error);
    }

    console.log("Deployment complete!");
}