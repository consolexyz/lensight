# LenSight Prediction Market

This project implements a decentralized prediction market for the LenSight platform, built on zkSync and integrated with Lens Protocol.

## Table of Contents <!-- omit in toc -->

- [Smart Contract Overview](#smart-contract-overview)
- [How It Works](#how-it-works) 
- [Requirements](#requirements)
- [Initial Setup](#initial-setup)
- [Usage](#usage)
- [Networks](#networks)
- [License](#license)

## Smart Contract Overview

### PredictionMarketFactory

The factory contract that creates and manages prediction markets. Features include:

- Create new prediction markets with custom questions and expiry times
- Support for multiple ERC20 tokens as betting currencies
- Protocol fees with configurable rates
- Market registry for easy discovery

### PredictionMarket

The implementation contract for each prediction market. Features include:

- Binary (YES/NO) outcome betting
- Automated reward distribution based on stake proportions
- Protocol fees
- Market resolution by trusted oracle or manual resolver
- Market cancellation in case of disputes or invalid questions

## How It Works

### Creating a Market

1. Call `createMarket` on the factory with:
   - Question (e.g., "Will ETH price exceed $5,000 by end of month?")
   - ERC20 token address for betting
   - Expiry timestamp
   - Resolution source indicator

### Placing Bets

1. Approve the PredictionMarket contract to spend your tokens
2. Call `placeBet` with:
   - Amount to bet
   - Position (true for YES, false for NO)

### Market Resolution

1. After expiry, anyone can call `closeMarket`
2. The designated resolver calls `resolveMarket` with the final outcome
3. Winners can then call `claimReward` to receive their winnings

### Reward Formula

If you bet on the winning side, your reward is calculated as:
```
(yourBet / totalBetsOnWinningSide) * totalPool
```

For example:
- Total YES bets: 100 USDC
- Total NO bets: 300 USDC
- Total pool: 400 USDC
- You bet: 50 USDC on YES

If YES wins, you get: (50/100) * 400 = 200 USDC

## Requirements

- Node.js: >= v20
- Yarn: v3.2.4

### Node.js <!-- omit in toc -->

If you use [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions, you can run:

```bash
nvm use
```

to switch to the correct Node.js version.

See the [installation guide](https://nodejs.org/en/download/package-manager) for other ways to install Node.js.

### Yarn <!-- omit in toc -->

Enable [Corepack](https://www.totaltypescript.com/how-to-use-corepack), if it isn't already; this will add the Yarn binary to your `PATH`:

```bash
corepack enable
```

See the [installation guide](https://yarnpkg.com/getting-started/install) for other ways to install Yarn.

## Initial Setup

Install dependencies:

```bash
yarn install
```

Create a `.env` file copying the `.env.example` file:

```bash
cp .env.example .env
```

Update the `.env` file with the correct values.

## Usage

### Compile <!-- omit in toc -->

```bash
yarn compile
```

### Clean <!-- omit in toc -->

```bash
yarn clean
```

### Lint <!-- omit in toc -->

```bash
yarn lint
```

### Test <!-- omit in toc -->

Run tests on the Hardhat Network powered by a [ZKsync In-memory Node]((https://docs.zksync.io/build/test-and-debug/in-memory-node).

```bash
yarn test
```

To run tests on a specific network:

```
yarn test [--network <network-name>]
```

For example, to run tests on the `lensTestnet` network:

```bash
yarn test --network lensTestnet
```

> [!TIP]
> zkSync In-memory Node currently supports only the L2 node. If contracts also need L1, use another testing environment like [Dockerized Node](https://docs.zksync.io/build/test-and-debug/dockerized-l1-l2-nodes).

### Deploy <!-- omit in toc -->

```bash
yarn deploy --script <deploy-script.ts> --network <network-name>
```

For example:

```bash
yarn deploy --script deploy-token.ts --network lensTestnet
```

## Networks

- `lensTestnet`: Lens Development Network (37111).
- `hardhat`: runs on a ZKsync [In-Memory Node](https://docs.zksync.io/build/test-and-debug/in-memory-node) for testing.

## License

Lens Network Hardhat Boilerplate [MIT licensed](./LICENSE)
