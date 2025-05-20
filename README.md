# Lensight ✨

Lensight is a decentralized prediction market platform integrated with Lens Protocol. Users can create predictions, place bets, and earn rewards while engaging with a social layer that displays human-readable Lens usernames instead of complex wallet addresses.



## 🔮 What It Does

**Lensight combines prediction markets with social identity:**

- **Create Predictions**: Users can create predictions about future events across various categories
- **Place Bets**: Bet on outcomes with your tokens (GHO)
- **Social Integration**: Full Lens Protocol integration showing usernames instead of addresses
- **Win Rewards**: Claim rewards when predictions resolve in your favor
- **Discover Trends**: Explore popular predictions and successful forecasters

## 🛠️ How It Works

Lensight is built as a hybrid Web3 application:

1. **Smart Contracts** (Hardhat): Handle prediction creation, betting, and reward distribution
2. **Frontend** (Next.js): Provides the user interface with Lens Protocol integration
3. **Database** (Prisma): Stores prediction metadata, comments, and user profiles

The platform leverages Lens Protocol V3 to associate wallet addresses with human-readable usernames, making the user experience more intuitive and friendly. When users connect their wallets, we fetch and display their Lens usernames using the Lens Protocol API.

### Prediction Market Smart Contracts

The core of Lensight is powered by Solidity smart contracts that implement a decentralized prediction market protocol:

1. **PredictionMarketFactory**: Enables anyone to create new prediction markets with customizable parameters
   - Sets protocol fees (currently 1%)
   - Deploys and tracks individual market contracts
   - Ensures fair market creation and resolution

2. **PredictionMarket**: Individual markets that function as liquidity pools
   - Users bet on binary outcomes (YES/NO)
   - Implements a constant product market maker formula
   - Handles reward distribution based on outcome resolution
   - Protects users with reentrancy guards and pause mechanisms

### How Markets Work

Each prediction market operates as an independent liquidity pool:

- **Market Creation**: Any user can create a market by defining:
  - The prediction question
  - Expiry time
  - Resolution source
  - Optional target price and comparison (e.g., "BTC > $100,000")
  - Category (e.g., crypto, sports, politics)

- **Betting Mechanism**:
  - Users place bets on YES or NO outcomes
  - Funds go into respective liquidity pools
  - Odds are determined by the ratio of YES/NO liquidity
  - Earlier bettors get better odds if their position gains popularity

- **Resolution & Rewards**:
  - After expiry, designated resolvers determine the outcome
  - Winners can claim rewards proportional to their bet size
  - Protocol fee (1%) is taken from the total pool before distribution

## 🚀 Getting Started

Ready to predict the future? Here's how to run Lensight locally:

### Prerequisites

- Node.js 16+
- Bun (recommended) or npm
- A modern browser
- Metamask or another Web3 wallet
- Lens Protocol account (optional but recommended)

### Setup and Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/lensight.git
   cd lensight
   ```

2. Deploy Smart Contracts:
   ```sh
   # First, install Hardhat dependencies
   cd hardhat
   npm install

   # Set up your environment variables
   cp .env.example .env
   ```
   
   Edit `hardhat/.env` and add your deployer wallet's private key:
   ```sh
   PRIVATE_KEY=your_wallet_private_key
   ALCHEMY_API_KEY=your_alchemy_api_key
   ```

   Deploy the contracts:
   ```sh
   # The deployment script will output the contract address
   # You can find it in hardhat/deploy/deploy-lens-mainnet.ts
   ```

   After deployment, save the PredictionMarketFactory contract address from the console output or deployment file. You'll need it for the frontend configuration.

3. Set up Frontend:
   ```sh
   # Navigate to frontend directory
   cd ../frontend
   
   # Install dependencies
   bun install

   # Set up environment variables
   cp .env.example .env
   ```

   Edit `frontend/.env` with your configuration:
 

4. Create a Lens app at [https://developer.lens.xyz/apps](https://developer.lens.xyz/apps) and add your App ID to `frontend/.env`

5. Start the Frontend:
   ```sh
   # Make sure you're in the frontend directory
   cd frontend
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser



 **Manual Resolution**:

   - Use the resolution API endpoint:
   ```sh
   curl -X POST http://localhost:3000/api/predictions/resolve \
     -H "Content-Type: application/json" \
     -d '{"outcome": true, "resolverAddress": "0x...", "signature": "0x..."}'
   ```

   This service will:
   - Find all expired predictions
   - Resolve price-based predictions automatically
   - Update prediction statuses
   - Trigger reward distribution



- **Script Commands**:
  - `bun run dev` - Start development server
  - `bun run build` - Build for production
  - `bun run start` - Start production server
  - `bun run format` - Format code with Biome
  - `bun run lint` - Lint code with Biome

## 🌱 Project Structure

```
lensight/
├── README.md               # Project documentation
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # React components
│   │   │   ├── lens/       # Lens Protocol UI components
│   │   │   └── prediction/ # Prediction market components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and services
│   └── prisma/             # Database schema and migrations
└── hardhat/                # Smart contract development
    ├── contracts/          # Solidity smart contracts
    │   ├── PredictionMarket.sol        # Individual market contract
    │   └── PredictionMarketFactory.sol # Factory for creating markets
    ├── deploy/             # Deployment scripts
    └── test/               # Contract test files
```


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with 💙 by xyz
