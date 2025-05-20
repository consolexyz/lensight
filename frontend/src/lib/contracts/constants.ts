import { type Abi } from 'viem';

// Contract addresses
export const PREDICTION_MARKET_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_PREDICTION_FACTORY_ADDRESS;
if (!PREDICTION_MARKET_FACTORY_ADDRESS) {
    throw new Error("NEXT_PUBLIC_PREDICTION_FACTORY_ADDRESS is not set in environment variables");
}

// ABI for the specific functions we need
export const PREDICTION_MARKET_FACTORY_ABI = [
    {
        name: 'createMarket',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'question', type: 'string' },
            { name: 'expiryTime', type: 'uint256' },
            { name: 'resolutionSource', type: 'string' },
            { name: 'targetPrice', type: 'uint256' },
            { name: 'comparisonOperator', type: 'string' },
            { name: 'category', type: 'string' }
        ],
        outputs: [{ name: '', type: 'address' }]
    },
    {
        name: 'MarketCreated',
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'market', type: 'address', indexed: true },
            { name: 'creator', type: 'address', indexed: true },
            { name: 'question', type: 'string', indexed: false }
        ]
    }
] as const;
