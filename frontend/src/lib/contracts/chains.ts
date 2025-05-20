import { defineChain } from 'viem';

/**
 * Lens Chain configuration for Viem (Mainnet only)
 */
export const lensChainMainnet = defineChain({
    id: 232,
    name: 'Lens Chain',
    network: 'lenschain-mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'GHO',
        symbol: 'GHO',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.lens.xyz'],
        },
        public: {
            http: ['https://rpc.lens.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Lens Chain Explorer',
            url: 'https://explorer.lens.xyz',
        },
    },
    testnet: false,
});
