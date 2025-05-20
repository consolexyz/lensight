#!/bin/zsh
# filepath: /Users/moses/Desktop/lensight/hardhat/deploy-to-lens-mainnet.sh

# Print a header
echo "====================================================="
echo "  Deploying Lensight contracts to Lens Chain Mainnet"
echo "====================================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create it with your PRIVATE_KEY."
  exit 1
fi

# Check if PRIVATE_KEY is set
if ! grep -q "PRIVATE_KEY" .env; then
  echo "Error: PRIVATE_KEY not found in .env file."
  exit 1
fi

# Install dependencies if needed
echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  bun install
fi

# Compile contracts
echo "Compiling contracts..."
bun hardhat compile

# Deploy to Lens Chain Mainnet
echo "Deploying to Lens Chain Mainnet..."
bun hardhat deploy-zksync --script deploy-lens-mainnet.ts --network lensMainnet

# Check if deployment was successful
if [ -f "./deployments-zk/lensMainnet-deployment.json" ]; then
  echo "Deployment successful!"
  
  # Extract contract address
  CONTRACT_ADDRESS=$(cat ./deployments-zk/lensMainnet-deployment.json | grep -o '"factoryAddress": "[^"]*' | cut -d'"' -f4)
  
  echo "Contract deployed to: $CONTRACT_ADDRESS"
  echo "Explorer URL: https://explorer.lens.xyz/address/$CONTRACT_ADDRESS"
  
  # Ask if user wants to verify the contract
  echo ""
  echo "Do you want to verify the contract on Lens Chain Explorer? (y/n)"
  read answer
  
  if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    echo "Verifying contract..."
    bun run scripts/verify-lens-mainnet.ts
  fi
  
  # Reminder for frontend integration
  echo ""
  echo "Don't forget to update your frontend with the new contract address:"
  echo "NEXT_PUBLIC_MAINNET_FACTORY_ADDRESS=$CONTRACT_ADDRESS"
  
else
  echo "Deployment might have failed. Check the logs above for errors."
  exit 1
fi

echo ""
echo "====================================================="
echo "        Deployment process completed                 "
echo "====================================================="
