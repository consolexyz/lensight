import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function main() {
    try {
        console.log("Starting contract verification on Lens Chain Mainnet...");

        // Load deployment information
        const deploymentPath = './deployments-zk/lensMainnet-deployment.json';

        if (!fs.existsSync(deploymentPath)) {
            throw new Error(`Deployment file not found at ${deploymentPath}. Please deploy the contracts first.`);
        }

        const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
        const { factoryAddress } = deploymentInfo;

        console.log(`Verifying PredictionMarketFactory at address: ${factoryAddress}`);

        // Run verification command
        // Note: The actual verification command may vary based on your verification setup
        const command = `npx hardhat verify --network lensMainnet ${factoryAddress}`;

        console.log(`Running command: ${command}`);
        const { stdout, stderr } = await execAsync(command);

        if (stderr) {
            console.error("Verification Error:", stderr);
        }

        console.log("Verification Output:", stdout);
        console.log("Verification process complete!");
        console.log(`View contract on block explorer: https://explorer.lens.xyz/address/${factoryAddress}`);

    } catch (error) {
        console.error("Verification failed:", error);
        process.exit(1);
    }
}

main();
