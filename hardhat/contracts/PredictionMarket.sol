// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./PredictionMarketFactory.sol";

/**
 * @title PredictionMarket
 * @dev Implementation of a binary prediction market with YES/NO outcomes using native token (GRASS)
 */
contract PredictionMarket is ReentrancyGuard, Pausable {
    // Outcome options
    enum Outcome {
        UNRESOLVED,
        YES,
        NO,
        INVALID
    }

    // Market state
    enum State {
        OPEN, // Accepting bets
        CLOSED, // Betting closed, awaiting resolution
        RESOLVED, // Outcome determined
        CANCELED // Market canceled (e.g., due to dispute)
    }

    // Market information
    string public question;
    uint256 public expiryTime;
    string public resolutionSource;
    uint256 public targetPrice; // Target price for the prediction
    string public comparisonOperator; // Comparison operator (>, <, >=, etc.)
    string public category; // Category (crypto, sports, etc.)

    // Participants
    address public creator;
    address public resolver;

    // Protocol settings
    uint16 public protocolFeeBps;
    address public feeReceiver;

    // Pool state
    uint256 public totalYesAmount;
    uint256 public totalNoAmount;
    uint256 public protocolFeeAmount;

    // Outcome state
    State public state = State.OPEN;
    Outcome public outcome = Outcome.UNRESOLVED;

    // User position tracking
    mapping(address => uint256) public yesPositions;
    mapping(address => uint256) public noPositions;
    mapping(address => bool) public claimed;

    // Events
    event BetPlaced(address indexed user, uint256 amount, bool isYes);
    event MarketResolved(Outcome indexed outcome);
    event RewardClaimed(address indexed user, uint256 amount);
    event MarketCanceled();

    /**
     * @dev Creates a new prediction market
     */
    constructor(
        string memory _question,
        uint256 _expiryTime,
        string memory _resolutionSource,
        uint16 _protocolFeeBps,
        address _feeReceiver,
        address _creator,
        uint256 _targetPrice,
        string memory _comparisonOperator,
        string memory _category
    ) {
        require(_expiryTime > block.timestamp, "Expiry must be in the future");
        require(_feeReceiver != address(0), "Invalid fee receiver");
        require(_creator != address(0), "Invalid creator");
        require(
            bytes(_comparisonOperator).length > 0,
            "Invalid comparison operator"
        );

        question = _question;
        expiryTime = _expiryTime;
        resolutionSource = _resolutionSource;
        protocolFeeBps = _protocolFeeBps;
        feeReceiver = _feeReceiver;
        creator = _creator;

        // Always set resolver to the factory owner
        // This removes the ability for creators to resolve markets
        PredictionMarketFactory factory = PredictionMarketFactory(msg.sender);
        resolver = factory.owner();

        targetPrice = _targetPrice;
        comparisonOperator = _comparisonOperator;
        category = _category;
    }

    /**
     * @dev Places a bet on YES or NO outcome
     * @param isYes True for YES, false for NO
     */
    function placeBet(bool isYes) external payable nonReentrant whenNotPaused {
        require(state == State.OPEN, "Market not open");
        require(block.timestamp < expiryTime, "Market expired");
        require(msg.value > 0, "Amount must be > 0");

        uint256 amount = msg.value;

        // Calculate and deduct protocol fee
        uint256 fee = (amount * protocolFeeBps) / 10000;
        uint256 remainingAmount = amount - fee;
        protocolFeeAmount += fee;

        // Update pool totals
        if (isYes) {
            yesPositions[msg.sender] += remainingAmount;
            totalYesAmount += remainingAmount;
        } else {
            noPositions[msg.sender] += remainingAmount;
            totalNoAmount += remainingAmount;
        }

        emit BetPlaced(msg.sender, remainingAmount, isYes);
    }

    /**
     * @dev Closes the market when expiry is reached
     */
    function closeMarket() external {
        require(state == State.OPEN, "Not in OPEN state");
        require(block.timestamp >= expiryTime, "Market not expired yet");

        state = State.CLOSED;
    }

    /**
     * @dev Resolves the market with a final outcome
     * @param finalOutcome The final outcome (1=YES, 2=NO, 3=INVALID)
     */
    function resolveMarket(Outcome finalOutcome) external {
        require(msg.sender == resolver, "Not resolver");
        require(
            state == State.CLOSED ||
                (state == State.OPEN && block.timestamp >= expiryTime),
            "Cannot resolve yet"
        );
        require(finalOutcome != Outcome.UNRESOLVED, "Invalid outcome");

        // If market wasn't explicitly closed, close it now
        if (state == State.OPEN) {
            state = State.CLOSED;
        }

        outcome = finalOutcome;
        state = State.RESOLVED;

        emit MarketResolved(finalOutcome);
    }

    /**
     * @dev Claim rewards if the outcome matches your bet
     */
    function claimReward() external nonReentrant {
        require(state == State.RESOLVED, "Market not resolved yet");
        require(!claimed[msg.sender], "Already claimed");

        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No reward to claim");

        claimed[msg.sender] = true;

        // Transfer reward as native token
        (bool success, ) = payable(msg.sender).call{value: reward}("");
        require(success, "Transfer failed");

        emit RewardClaimed(msg.sender, reward);
    }

    /**
     * @dev Calculate the reward for a user
     * @param user The address of the user
     * @return The reward amount
     */
    function calculateReward(address user) public view returns (uint256) {
        if (state != State.RESOLVED) {
            return 0;
        }

        // Handle INVALID outcome - everyone gets their money back minus fees
        if (outcome == Outcome.INVALID) {
            return yesPositions[user] + noPositions[user];
        }

        uint256 totalPool = totalYesAmount + totalNoAmount;

        // Calculate reward based on outcome
        if (outcome == Outcome.YES && yesPositions[user] > 0) {
            // (yourYes / totalYes) * totalPool
            return (yesPositions[user] * totalPool) / totalYesAmount;
        } else if (outcome == Outcome.NO && noPositions[user] > 0) {
            // (yourNo / totalNo) * totalPool
            return (noPositions[user] * totalPool) / totalNoAmount;
        }

        return 0; // No reward (bet on the wrong outcome)
    }

    /**
     * @dev Cancels the market and allows all users to withdraw their funds
     * Only callable by the resolver in case of disputes
     */
    function cancelMarket() external {
        require(msg.sender == resolver, "Not resolver");
        require(
            state != State.RESOLVED && state != State.CANCELED,
            "Cannot cancel"
        );

        state = State.CANCELED;
        outcome = Outcome.INVALID;

        emit MarketCanceled();
    }

    /**
     * @dev Change the resolver address
     * @param newResolver The address of the new resolver
     */
    function setResolver(address newResolver) external {
        require(msg.sender == creator, "Not creator");
        require(newResolver != address(0), "Invalid address");
        resolver = newResolver;
    }

    /**
     * @dev Withdraw protocol fees to fee receiver
     */
    function withdrawFees() external nonReentrant {
        require(msg.sender == feeReceiver, "Not fee receiver");
        require(protocolFeeAmount > 0, "No fees");

        uint256 amount = protocolFeeAmount;
        protocolFeeAmount = 0;

        // Transfer fees as native token
        (bool success, ) = payable(feeReceiver).call{value: amount}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Emergency pause/unpause for security
     * @param paused True to pause, false to unpause
     */
    function setPaused(bool paused) external {
        require(
            msg.sender == creator || msg.sender == resolver,
            "Not authorized"
        );

        if (paused) {
            _pause();
        } else {
            _unpause();
        }
    }

    /**
     * @dev Get total pool size (YES + NO bets)
     */
    function getTotalPoolSize() external view returns (uint256) {
        return totalYesAmount + totalNoAmount;
    }

    /**
     * @dev Get current odds for YES/NO positions
     * @return yesOdds Percentage odds for YES (0-100)
     * @return noOdds Percentage odds for NO (0-100)
     */
    function getOdds() external view returns (uint256 yesOdds, uint256 noOdds) {
        uint256 total = totalYesAmount + totalNoAmount;
        if (total == 0) {
            return (50, 50); // Default 50/50
        }

        yesOdds = (totalYesAmount * 100) / total;
        noOdds = 100 - yesOdds;

        return (yesOdds, noOdds);
    }

    /**
     * @dev Allows the contract to receive native tokens
     */
    receive() external payable {}
}
