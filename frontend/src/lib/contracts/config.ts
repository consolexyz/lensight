/**
 * Contract configuration for different networks
 */

export const contractConfig = {
    // Lens Chain Testnet
    testnet: {
        factoryAddress: process.env.NEXT_PUBLIC_TESTNET_FACTORY_ADDRESS || '',
        chainId: 37111,
        rpcUrl: 'https://api.staging.lens.zksync.dev',
        explorerUrl: 'https://api-explorer-verify.staging.lens.zksync.dev',
        networkName: 'Lens Chain Testnet',
        currencySymbol: 'GHO',
    },

    // Lens Chain Mainnet
    mainnet: {
        factoryAddress: process.env.NEXT_PUBLIC_MAINNET_FACTORY_ADDRESS || '',
        chainId: 232,
        rpcUrl: 'https://rpc.lens.xyz',
        explorerUrl: 'https://explorer.lens.xyz',
        networkName: 'Lens Chain Mainnet',
        currencySymbol: 'GHO',
    },
};

/**
 * Get the contract configuration for the current network
 */
export function getCurrentNetworkConfig() {
    // Default to mainnet in production, testnet in development
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? contractConfig.mainnet : contractConfig.testnet;
}

/**
 * Get the factory contract address for the current network
 */
export function getFactoryAddress(): string {
    const config = getCurrentNetworkConfig();

    if (!config.factoryAddress) {
        console.warn('Factory contract address not configured for the current network');
        return '';
    }

    return config.factoryAddress;
}
