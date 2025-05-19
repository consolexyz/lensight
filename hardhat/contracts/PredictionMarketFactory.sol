// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PredictionMarket.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PredictionMarketFactory
 * @dev Factory contract for creating new prediction markets using native token (GRASS)
 */
contract PredictionMarketFactory is Ownable {
    // All markets created by this factory
    PredictionMarket[] public markets;

    // Protocol fee in basis points (100 = 1%)
    uint16 public protocolFeeBps = 100; // 1% default fee

    // Address where protocol fees are sent
    address public feeReceiver;

    // Events
    event MarketCreated(
        address indexed market,
        address indexed creator,
        string question
    );
    event ProtocolFeeUpdated(uint16 newFeeBps);
    event FeeReceiverUpdated(address newFeeReceiver);

    constructor() Ownable(msg.sender) {
        feeReceiver = msg.sender;
    }

    /**
     * @dev Creates a new prediction market
     * @param question The question being predicted
     * @param expiryTime The timestamp when betting ends
     * @param resolutionSource Identifier for the resolution source (e.g., "MANUAL", "CHAINLINK:BTC-USD")
     * @param targetPrice The target price for the prediction
     * @param comparisonOperator The comparison operator (>, <, >=, etc.)
     * @param category The category of the prediction (crypto, sports, etc.)
     */
    function createMarket(
        string memory question,
        uint256 expiryTime,
        string memory resolutionSource,
        uint256 targetPrice,
        string memory comparisonOperator,
        string memory category
    ) external returns (address) {
        require(expiryTime > block.timestamp, "Expiry must be in the future");
        require(
            bytes(comparisonOperator).length > 0,
            "Comparison operator required"
        );

        // Create new market
        PredictionMarket market = new PredictionMarket(
            question,
            expiryTime,
            resolutionSource,
            protocolFeeBps,
            feeReceiver,
            msg.sender,
            targetPrice,
            comparisonOperator,
            category
        );

        // Store and emit event
        markets.push(market);
        emit MarketCreated(address(market), msg.sender, question);

        return address(market);
    }

    /**
     * @dev Returns the number of markets created
     */
    function getMarketCount() external view returns (uint256) {
        return markets.length;
    }

    /**
     * @dev Updates the protocol fee
     * @param newFeeBps New fee in basis points (100 = 1%)
     */
    function setProtocolFee(uint16 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee too high"); // Max 10%
        protocolFeeBps = newFeeBps;
        emit ProtocolFeeUpdated(newFeeBps);
    }

    /**
     * @dev Updates the fee receiver address
     * @param newFeeReceiver Address to receive protocol fees
     */
    function setFeeReceiver(address newFeeReceiver) external onlyOwner {
        require(newFeeReceiver != address(0), "Zero address");
        feeReceiver = newFeeReceiver;
        emit FeeReceiverUpdated(newFeeReceiver);
    }
}
