import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";
import * as ethers from "ethers";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Deploy script for Lens Chain Mainnet
 * Network: Lens Chain Mainnet
 * Chain ID: 232
 * RPC: https://rpc.lens.xyz
 * Currency: GHO
 * Explorer: https://explorer.lens.xyz
 */
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running native prediction market deploy script for Lens Chain Mainnet`);

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
    console.log("Deploying PredictionMarketFactory to Lens Chain Mainnet...");
    const factory = await deployer.deploy(factoryArtifact, []);

    // Show the contract info
    const factoryAddress = await factory.getAddress();
    console.log(`${factoryArtifact.contractName} was deployed to ${factoryAddress}`);
    console.log(`Verify contract at: https://explorer.lens.xyz/address/${factoryAddress}`);

    // Save deployment info to a file
    const fs = require('fs');
    const deploymentInfo = {
        network: "lensMainnet",
        chainId: 232,
        factoryAddress: factoryAddress,
        deploymentDate: new Date().toISOString(),
        deployer: wallet.address
    };

    fs.writeFileSync(
        './deployments-zk/lensMainnet-deployment.json',
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("Deployment information saved to ./deployments-zk/lensMainnet-deployment.json");
    console.log("Deployment complete!");
}
