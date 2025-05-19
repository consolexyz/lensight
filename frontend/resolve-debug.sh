#!/usr/bin/env zsh
# Run the resolver script with environment variables from .env.oracle

# Load environment variables
if [ -f .env.oracle ]; then
  export $(cat .env.oracle | sed 's/#.*//g' | xargs)
fi

# Run the script
npx tsx src/scripts/resolve-prediction.ts
