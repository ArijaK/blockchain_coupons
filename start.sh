#!/bin/bash
set -e

# Compile contracts
npx hardhat compile

# Start local Hardhat node in background
npx hardhat node --hostname 0.0.0.0 > /app/hardhat.log 2>&1 &

sleep 5

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Print deployed address
echo "Deployed contract address."
cat /app/deployedAddress.txt

# Interact with deployed contract
npx hardhat run scripts/interact.js --network localhost


# Keep container alive
exec bash
