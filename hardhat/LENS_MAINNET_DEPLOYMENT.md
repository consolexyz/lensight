# Lens Chain Mainnet Deployment Guide

This guide walks through the process of deploying the Lensight Prediction Market contracts to Lens Chain Mainnet.

## Network Information

- **Network Name**: Lens Chain Mainnet
- **Chain ID**: 232
- **RPC URL**: https://rpc.lens.xyz
- **WebSocket URL**: wss://rpc.lens.xyz/ws
- **Currency Symbol**: GHO
- **Block Explorer URL**: https://explorer.lens.xyz

## Prerequisites

1. Make sure you have GHO tokens on Lens Chain Mainnet for gas fees
2. Set up your private key in an `.env` file:

```
PRIVATE_KEY=your_private_key_here
```

## Deployment Steps

### 1. Install dependencies

```bash
cd /Users/moses/Desktop/lensight/hardhat
bun install
```

### 2. Compile the contracts

```bash
cd /Users/moses/Desktop/lensight/hardhat
bun hardhat compile
```

### 3. Deploy to Lens Chain Mainnet

```bash
cd /Users/moses/Desktop/lensight/hardhat
bun hardhat deploy-zksync --script deploy-lens-mainnet.ts --network lensMainnet
```

This script will:
- Deploy the `PredictionMarketFactory` contract
- Save deployment information to `./deployments-zk/lensMainnet-deployment.json`

### 4. Verify the contract (optional)

```bash
cd /Users/moses/Desktop/lensight/hardhat
bun run scripts/verify-lens-mainnet.ts
```

## After Deployment

1. Update the frontend configuration with the new contract address:
   - Update `/Users/moses/Desktop/lensight/frontend/src/lib/contracts/config.ts` with the mainnet contract address
   
2. Update environment variables:
   - Add the new contract address to your `.env` file: `NEXT_PUBLIC_MAINNET_FACTORY_ADDRESS=0x...`

3. Test interactions with the contract using Hardhat console:
   ```bash
   bun hardhat console --network lensMainnet
   ```

## Troubleshooting

- **Transaction failures**: Ensure you have enough GHO for gas
- **Verification issues**: Double-check compiler versions and constructor arguments
- **RPC errors**: Try using a different RPC provider if the default one is having issues

For more information, refer to:
- [Lens Chain Documentation](https://docs.lens.xyz/docs/lens-chain-overview)
- [ZkSync Documentation](https://docs.zksync.io/build/quick-start/deploying-a-smart-contract)
