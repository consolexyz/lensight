import { expect } from "chai";
import * as hre from "hardhat";
import { Wallet, Provider } from "zksync-ethers";
import * as ethers from "ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import type { PredictionMarket, PredictionMarketFactory } from "../typechain-types/contracts";

describe("PredictionMarket", function () {
    const oneMonth = 30 * 24 * 60 * 60; // 30 days in seconds
    let provider: Provider;
    let owner: Wallet;
    let user1: Wallet;
    let user2: Wallet;
    let factory: PredictionMarketFactory;
    let market: PredictionMarket;
    let marketAddress: string;
    const initialBalance = ethers.parseEther("10");

    // Helper function to deploy the factory
    async function deployFactory() {
        const artifact = await hre.artifacts.readArtifact("PredictionMarketFactory");
        const deployer = new Deployer(hre, owner);
        return await deployer.deploy(artifact, []);
    }

    // Helper function to create a market
    async function createMarket(factory: any) {
        const now = Math.floor(Date.now() / 1000);
        const expiry = now + oneMonth;

        const tx = await factory.connect(owner).createMarket(
            "Will ETH price exceed $5,000?",
            expiry,
            "MANUAL",
            ethers.parseEther("5000"),
            ">",
            "crypto"
        );

        const receipt = await tx.wait();

        const marketCountAfter = await factory.getMarketCount();
        expect(marketCountAfter).to.equal(1n);

        const marketAddress = await factory.markets(0);
        return await hre.ethers.getContractAt("PredictionMarket", marketAddress) as PredictionMarket;
    }

    before(async () => {
        provider = hre.provider;

        // Create wallet instances
        const testAccounts = hre.config.networks.zkSyncTestnet.accounts as string[];
        owner = new Wallet(testAccounts[0]);
        user1 = new Wallet(testAccounts[1]);
        user2 = new Wallet(testAccounts[2]);

        // Fund accounts if needed
        // These steps might be skipped if testing in memory node
    });

    beforeEach(async () => {
        // Deploy the factory contract
        factory = await deployFactory() as PredictionMarketFactory;

        // Create a prediction market
        market = await createMarket(factory);
        marketAddress = await market.getAddress();
        console.log(`Created market at ${marketAddress}`);
    });

    describe("Factory", () => {
        it("should be deployed with the right owner", async () => {
            expect(await factory.owner()).to.equal(owner.address);
        });

        it("should create a market with the right parameters", async () => {
            expect(await market.question()).to.equal("Will ETH price exceed $5,000?");
            expect(await market.creator()).to.equal(owner.address);
            expect(await market.resolver()).to.equal(owner.address);
            expect(await market.state()).to.equal(0); // OPEN
            expect(await market.outcome()).to.equal(0); // UNRESOLVED
        });
    });

    describe("Market", () => {
        it("should allow users to place YES bets", async () => {
            const betAmount = ethers.parseEther("1");
            await market.connect(user1).placeBet(true, { value: betAmount });

            expect(await market.yesPositions(user1.address)).to.be.greaterThan(0);
            expect(await market.totalYesAmount()).to.be.greaterThan(0);
        });

        it("should allow users to place NO bets", async () => {
            const betAmount = ethers.parseEther("1");
            await market.connect(user2).placeBet(false, { value: betAmount });

            expect(await market.noPositions(user2.address)).to.be.greaterThan(0);
            expect(await market.totalNoAmount()).to.be.greaterThan(0);
        });

        it("should calculate correct odds", async () => {
            // Place bets
            await market.connect(user1).placeBet(true, { value: ethers.parseEther("3") });
            await market.connect(user2).placeBet(false, { value: ethers.parseEther("1") });

            const [yesOdds, noOdds] = await market.getOdds();
            expect(yesOdds).to.be.approximately(75n, 1n); // ~75%
            expect(noOdds).to.be.approximately(25n, 1n); // ~25%
        });

        it("should close market when expired", async () => {
            // Fast-forward time
            await hre.network.provider.send("evm_increaseTime", [oneMonth + 1]);
            await hre.network.provider.send("evm_mine");

            await market.connect(owner).closeMarket();
            expect(await market.state()).to.equal(1); // CLOSED
        });

        it("should resolve market correctly when YES wins", async () => {
            // Place bets
            await market.connect(user1).placeBet(true, { value: ethers.parseEther("3") });
            await market.connect(user2).placeBet(false, { value: ethers.parseEther("2") });

            // Fast-forward time
            await hre.network.provider.send("evm_increaseTime", [oneMonth + 1]);
            await hre.network.provider.send("evm_mine");

            // Close and resolve market
            await market.connect(owner).closeMarket();
            await market.connect(owner).resolveMarket(1); // YES outcome

            expect(await market.state()).to.equal(2); // RESOLVED
            expect(await market.outcome()).to.equal(1); // YES

            // Check reward calculation
            const reward = await market.calculateReward(user1.address);
            expect(reward).to.be.greaterThan(ethers.parseEther("3")); // Should get back more than bet
        });

        it("should allow claiming rewards", async () => {
            // Place bets
            await market.connect(user1).placeBet(true, { value: ethers.parseEther("3") });
            await market.connect(user2).placeBet(false, { value: ethers.parseEther("2") });

            // Fast-forward time
            await hre.network.provider.send("evm_increaseTime", [oneMonth + 1]);
            await hre.network.provider.send("evm_mine");

            // Close and resolve market
            await market.connect(owner).closeMarket();
            await market.connect(owner).resolveMarket(1); // YES outcome

            // Get balance before
            const balanceBefore = await provider.getBalance(user1.address);

            // Claim reward
            await market.connect(user1).claimReward();

            // Check balance after
            const balanceAfter = await provider.getBalance(user1.address);
            expect(balanceAfter).to.be.greaterThan(balanceBefore);

            // Should be marked as claimed
            expect(await market.claimed(user1.address)).to.equal(true);
        });

        it("should handle INVALID outcome - return funds minus fees", async () => {
            // Place bets
            await market.connect(user1).placeBet(true, { value: ethers.parseEther("3") });
            await market.connect(user2).placeBet(false, { value: ethers.parseEther("2") });

            // Cancel market
            await market.connect(owner).cancelMarket();

            expect(await market.state()).to.equal(3); // CANCELED
            expect(await market.outcome()).to.equal(3); // INVALID

            // Both users should get funds back
            const user1Reward = await market.calculateReward(user1.address);
            const user2Reward = await market.calculateReward(user2.address);

            // Should be approximately equal to their bet minus protocol fees
            const user1ExpectedRefund = ethers.parseEther("3");
            const user2ExpectedRefund = ethers.parseEther("2");

            expect(user1Reward).to.be.lessThanOrEqual(user1ExpectedRefund);
            expect(user2Reward).to.be.lessThanOrEqual(user2ExpectedRefund);
        });

        it("should allow fee withdrawal by fee receiver", async () => {
            // Place bets to generate fees
            await market.connect(user1).placeBet(true, { value: ethers.parseEther("10") });

            const feeReceiver = await market.feeReceiver();
            const receiverBalanceBefore = await provider.getBalance(feeReceiver);

            // Withdraw fees
            await market.connect(await hre.ethers.getSigner(feeReceiver)).withdrawFees();

            const receiverBalanceAfter = await provider.getBalance(feeReceiver);
            expect(receiverBalanceAfter).to.be.greaterThan(receiverBalanceBefore);
        });
    });
});