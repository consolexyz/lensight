// Script to test the full lifecycle of a prediction market
import * as hre from "hardhat";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
import { PredictionMarket, PredictionMarketFactory } from "../typechain-types/contracts";

// Load environment variables
dotenv.config();

// Sleep function to wait between steps
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    console.log(`=== PREDICTION MARKET FULL LIFECYCLE TEST ===`);

    // Use the private key from environment variable
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    if (!PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY is not set in environment");
    }

    const provider = hre.ethers.provider;
    const mainWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log(`Wallet address: ${mainWallet.address}`);
    const startingBalance = await provider.getBalance(mainWallet.address);
    console.log(`Starting balance: ${ethers.formatEther(startingBalance)} GRASS`);

    try {
        // Step 1: Connect to the factory contract
        console.log("\n=== STEP 1: Connect to Factory Contract ===");
        const factoryAddress = "0x25532FC37C702cd332e3EC781F32c5a8CB01e300";

        const factory = await hre.ethers.getContractAt(
            "PredictionMarketFactory",
            factoryAddress
        ) as PredictionMarketFactory;

        console.log(`Connected to PredictionMarketFactory at ${factoryAddress}`);

        // Step 2: Create a new market with 3 minute expiry
        console.log("\n=== STEP 2: Create a New Market ===");
        const question = "Will ETH price exceed $5,000 today?";
        const expiryTime = Math.floor(Date.now() / 1000) + 180; // 3 minutes from now
        const targetPrice = ethers.parseEther("5000");
        const comparisonOperator = ">";
        const category = "crypto";
        const resolutionSource = "MANUAL";

        console.log(`Creating market that expires in 3 minutes...`);
        console.log(`Expiry time: ${new Date(expiryTime * 1000).toLocaleTimeString()}`);
        const createTx = await factory.connect(mainWallet).createMarket(
            question,
            expiryTime,
            resolutionSource,
            targetPrice,
            comparisonOperator,
            category
        );

        console.log(`Market creation transaction submitted: ${createTx.hash}`);
        await createTx.wait();
        console.log(`Market creation transaction confirmed`);

        // Get the new market address
        const marketCount = await factory.getMarketCount();
        const marketIndex = marketCount - 1n;
        const marketAddress = await factory.markets(marketIndex);
        console.log(`New market created at: ${marketAddress}`);

        // Connect to the market contract
        const market = await hre.ethers.getContractAt(
            "PredictionMarket",
            marketAddress
        ) as PredictionMarket;

        // Step 3: Place bets on the market
        console.log("\n=== STEP 3: Place Bets ===");

        // Place a YES bet
        const yesBetAmount = ethers.parseEther("1");
        console.log(`Placing YES bet of ${ethers.formatEther(yesBetAmount)} GRASS...`);
        const yesTx = await market.connect(mainWallet).placeBet(true, { value: yesBetAmount });
        console.log(`YES bet transaction submitted: ${yesTx.hash}`);
        await yesTx.wait();
        console.log(`YES bet confirmed`);

        // Place a NO bet (smaller amount to ensure we make a profit when YES wins)
        const noBetAmount = ethers.parseEther("0.5");
        console.log(`Placing NO bet of ${ethers.formatEther(noBetAmount)} GRASS...`);
        const noTx = await market.connect(mainWallet).placeBet(false, { value: noBetAmount });
        console.log(`NO bet transaction submitted: ${noTx.hash}`);
        await noTx.wait();
        console.log(`NO bet confirmed`);

        // Check positions
        const yesPosition = await market.yesPositions(mainWallet.address);
        const noPosition = await market.noPositions(mainWallet.address);
        const totalYes = await market.totalYesAmount();
        const totalNo = await market.totalNoAmount();
        const odds = await market.getOdds();

        console.log(`\nPositions Summary:`);
        console.log(`Your YES position: ${ethers.formatEther(yesPosition)} GRASS`);
        console.log(`Your NO position: ${ethers.formatEther(noPosition)} GRASS`);
        console.log(`Total YES pool: ${ethers.formatEther(totalYes)} GRASS`);
        console.log(`Total NO pool: ${ethers.formatEther(totalNo)} GRASS`);
        console.log(`Current odds - YES: ${odds[0]}%, NO: ${odds[1]}%`);

        // Step 4: Wait for market to expire
        console.log("\n=== STEP 4: Wait for Market to Expire ===");
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToWait = expiryTime - currentTime + 2; // +2 seconds buffer

        if (timeToWait > 0) {
            console.log(`Waiting ${timeToWait} seconds for market to expire...`);
            for (let i = timeToWait; i > 0; i--) {
                process.stdout.write(`${i}... `);
                await sleep(1000);
            }
            console.log("\nMarket should now be expired!");
        } else {
            console.log("Market is already expired!");
        }

        // Step 5: Close the market
        console.log("\n=== STEP 5: Close Market ===");
        try {
            console.log(`Closing the market...`);
            const closeTx = await market.connect(mainWallet).closeMarket();
            await closeTx.wait();
            console.log(`Market closed successfully`);
        } catch (error: any) {
            console.log(`Error closing market: ${error.message}`);
            console.log(`Continuing to next step...`);
        }

        // Step 6: Resolve the market
        console.log("\n=== STEP 6: Resolve Market ===");
        try {
            console.log(`Resolving market with YES outcome...`);
            const resolveTx = await market.connect(mainWallet).resolveMarket(1); // 1 = YES
            await resolveTx.wait();
            console.log(`Market resolved successfully with YES outcome`);

            // Check the final state
            const state = await market.state();
            const outcome = await market.outcome();
            const stateLabels = ["OPEN", "CLOSED", "RESOLVED", "CANCELED"];
            const outcomeLabels = ["UNRESOLVED", "YES", "NO", "INVALID"];
            console.log(`Market state: ${stateLabels[Number(state)]}`);
            console.log(`Market outcome: ${outcomeLabels[Number(outcome)]}`);
        } catch (error: any) {
            console.error(`Error resolving market: ${error.message}`);
            return;
        }

        // Step 7: Claim rewards
        console.log("\n=== STEP 7: Claim Rewards ===");
        try {
            // Calculate expected reward
            const potentialReward = await market.calculateReward(mainWallet.address);
            console.log(`Potential reward: ${ethers.formatEther(potentialReward)} GRASS`);

            if (potentialReward <= 0n) {
                console.log(`No rewards available to claim`);
                return;
            }

            const balanceBeforeClaim = await provider.getBalance(mainWallet.address);
            console.log(`Balance before claim: ${ethers.formatEther(balanceBeforeClaim)} GRASS`);

            console.log(`Claiming rewards...`);
            const claimTx = await market.connect(mainWallet).claimReward();
            await claimTx.wait();
            console.log(`Rewards claimed successfully!`);

            const balanceAfterClaim = await provider.getBalance(mainWallet.address);
            console.log(`Balance after claim: ${ethers.formatEther(balanceAfterClaim)} GRASS`);

            // Show profit (approximate due to gas fees)
            const profit = balanceAfterClaim - balanceBeforeClaim;
            console.log(`\nApproximate profit from claim: ${ethers.formatEther(profit)} GRASS`);

            // Show overall position change
            const totalChange = balanceAfterClaim - startingBalance;
            console.log(`Overall balance change (including gas): ${ethers.formatEther(totalChange)} GRASS`);

            // Verify claimed status
            const hasClaimed = await market.claimed(mainWallet.address);
            console.log(`Has claimed: ${hasClaimed}`);
        } catch (error: any) {
            console.error(`Error claiming rewards: ${error.message}`);
        }
    } catch (error: any) {
        console.error(`Error in test process: ${error.message}`);
    }

    console.log("\n=== TEST COMPLETE ===");
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
