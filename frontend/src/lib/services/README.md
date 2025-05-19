# Lensight Automated Oracle System

This system automatically resolves prediction markets in the Lensight application based on cryptocurrency price data from external sources.

## Overview

The automated oracle system consists of the following components:

1. **Price Oracle Service** (`priceOracle.ts`)
   - Fetches real-time price data from external APIs like CoinGecko
   - Evaluates price predictions by comparing actual prices with target prices

2. **Contract Service** (`contractService.ts`)
   - Interacts with the PredictionMarket smart contracts on the blockchain
   - Resolves markets by calling the `resolveMarket` function with the correct outcome

3. **Prediction Resolver Service** (`predictionResolver.ts`)
   - Combines price data and contract interactions to automatically settle predictions
   - Updates both the blockchain and the database

4. **API Endpoint** (`/api/predictions/resolve`)
   - HTTP endpoint for triggering resolution manually or via scheduled jobs
   - Returns information about pending and resolved predictions

5. **Scripts and Scheduling**
   - Vercel cron job scheduling (`vercel.json`)
   - Manual testing script (`manual-resolver.ts`)
   - Local cron job setup script (`cron-resolver.sh`)

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```
# Oracle Configuration
ORACLE_PRIVATE_KEY=your_private_key_here
LENS_TESTNET_RPC_URL=https://rpc.testnet.lens.dev
ALPHAVANTAGE_API_KEY=your_alphavantage_api_key
```

The `ORACLE_PRIVATE_KEY` should be the private key of the owner of the PredictionMarketFactory contract. This is the account that will be automatically set as the resolver for predictions with the "AUTO" resolution source.

### 2. Deploy with Vercel

When deploying to Vercel, the cron job defined in `vercel.json` will automatically run every 6 hours to resolve eligible predictions.

### 3. Local Testing and Scheduling

To test the oracle locally:

```bash
# Run the resolver manually
npm run oracle:resolve

# Setup a local cron job (runs every 6 hours)
npm run oracle:setup-cron
```

You can also use options with the manual resolver:

```bash
# Dry run (doesn't update blockchain or database)
npm run oracle:resolve -- --dry-run

# Resolve a specific prediction
npm run oracle:resolve -- --id=your_prediction_id

# Skip blockchain updates
npm run oracle:resolve -- --no-blockchain
```

## How It Works

1. **Finding Predictions to Resolve**
   - The system identifies expired predictions with crypto price targets
   - Only predictions in the OPEN or CLOSED state are eligible

2. **Price Evaluation**
   - Fetches the current price from CoinGecko API
   - Applies the comparison operator (>, <, >=, <=, ==) to determine outcome

3. **On-Chain Resolution**
   - First calls `closeMarket()` if needed
   - Then calls `resolveMarket()` with the outcome (1 for YES, 2 for NO)

4. **Database Update**
   - Updates the prediction status in the database
   - Records the resolution timestamp

## Extending the Oracle

### Adding More Price Sources

To add support for more asset types:

1. Add a new method to `PriceOracleService` (e.g., `getNFTFloorPrice`)
2. Update the `getPrice` method to handle the new asset type
3. Add support in `PredictionResolverService` to evaluate the new type

### Supporting More Complex Predictions

For prediction types beyond simple price comparisons:

1. Create a new evaluation service
2. Update the resolver to use the appropriate evaluation method based on prediction metadata

## Troubleshooting

### Common Issues

1. **Resolution Fails for a Specific Prediction**
   - Check if the target price is correctly formatted
   - Verify the contract address is valid
   - Ensure the oracle account has resolver permissions

2. **API Errors**
   - Rate limiting from CoinGecko - consider adding API key or caching
   - Blockchain RPC issues - check the RPC URL and connection

3. **Cron Job Not Running**
   - For Vercel: Check the Functions log in the Vercel dashboard
   - For local cron: Check permissions and system logs

### Monitoring

The oracle logs details about its operations:

- Execution start/end
- Predictions found for resolution
- Price data fetched
- Resolution outcomes
- Any errors encountered

Check these logs to diagnose issues.
