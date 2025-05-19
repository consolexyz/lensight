import { defineChain } from 'viem';

/**
 * Lens Chain testnet configuration for Viem
 */
export const lensChainTestnet = defineChain({
    id: 37_111,
    name: 'Lens Chain Testnet',
    network: 'lenschain-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'GRASS',
        symbol: 'GRASS',
    },
    rpcUrls: {
        default: {
            http: ['https://api.staging.lens.zksync.dev'],
        },
        public: {
            http: ['https://api.staging.lens.zksync.dev'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Lens Chain Explorer',
            url: 'https://sepolia.explorer.staging.lens.zksync.dev',
        },
    },
    testnet: true,
});
