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

2. Install dependencies:
   ```sh
   bun install
   ```

3. Set up your environment variables:
   ```sh
   cp .env.example .env
   ```

4. Create a Lens app at [https://developer.lens.xyz/apps](https://developer.lens.xyz/apps) and add your App ID to `.env`

5. Start the development servers:
   
   For the frontend:
   ```sh
   cd frontend
   bun run dev
   ```
   
   For the smart contracts (optional, for local development):
   ```sh
   cd hardhat
   bun run node
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Key Features

- **Human-readable Profiles**: View Lens usernames instead of cryptic addresses
- **Real-time Updates**: See predictions, bets, and comments in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Secure Authentication**: Connect securely with your Web3 wallet
- **Categories**: Browse and filter predictions by categories
- **Smart UI**: Modern, intuitive UI with light and dark modes
- **Win Tracking**: Track your wins, losses, and overall performance

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Lens Integration**: 
  - `@lens-protocol/client` 
  - `@lens-protocol/react`
- **Web3**: [ConnectKit](https://docs.family.co/connectkit), [wagmi](https://wagmi.sh/)

### Backend & Blockchain
- **Smart Contracts**: Solidity (deployed on Mainnet)
- **Development**: Hardhat
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API routes

## 💻 Development

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



## 🧠 Decentralized Architecture

Lensight combines on-chain and off-chain components to create an efficient and user-friendly experience:

### On-Chain (Blockchain)
- **Market Creation & Logic**: All core prediction market functionality executes on-chain
- **Betting Mechanism**: Funds are secured and managed by smart contracts
- **Reward Distribution**: Winners claim their rewards directly from contracts

### Off-Chain (Web2)
- **User Interface**: React/Next.js frontend for a smooth user experience
- **Metadata Storage**: Prisma/PostgreSQL for efficient retrieval of market details
- **Social Features**: Comments and reputation tracking
- **Identity Layer**: Integration with Lens Protocol for human-readable names

This hybrid architecture provides the security of blockchain with the usability of modern web applications, making prediction markets accessible to everyone.

## 🔄 Lens Protocol Integration

Lensight uses Lens Protocol V3 to provide a social layer for the prediction platform:

- **Username Resolution**: Converts wallet addresses to human-readable Lens usernames
- **Profile Data**: Displays profile pictures and information from Lens Protocol
- **Social Interactions**: Enables commenting and sharing of predictions

The integration is handled through custom hooks like `useLensAddress` which fetch usernames from the Lens Protocol API and display them in components like `LensAddressDisplay`.

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
