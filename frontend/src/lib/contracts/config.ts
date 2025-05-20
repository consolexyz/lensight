/**
 * Contract configuration for different networks
 */

export const contractConfig = {
    // Lens Chain Mainnet Only
    mainnet: {
        factoryAddress: process.env.NEXT_PUBLIC_MAINNET_FACTORY_ADDRESS || '',
        chainId: 232,
        rpcUrl: 'https://rpc.lens.xyz',
        explorerUrl: 'https://explorer.lens.xyz',
        networkName: 'Lens Chain',
        currencySymbol: 'GHO',
    },
};

/**
 * Get the contract configuration for the current network
 */
export function getCurrentNetworkConfig() {
    // Always use mainnet
    return contractConfig.mainnet;
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
