import { type Abi } from 'viem';

// Contract addresses
export const PREDICTION_MARKET_FACTORY_ADDRESS = "0xe052043ebb03C30EE33a5190705d8393C715c93F";

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
