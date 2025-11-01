#!/bin/bash

# AptOS & Sentience Protocol Deployment Script
# This script deploys Move contracts to Aptos devnet

set -e

echo "🚀 Starting deployment process..."

# Check if aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "❌ Aptos CLI not found. Please install it first:"
    echo "   curl -fsSL https://aptos.dev/scripts/install_cli.py | python3"
    exit 1
fi

# Configure Aptos CLI for devnet
echo "📝 Configuring Aptos CLI for devnet..."
aptos config set-global-config --config-type devnet

# Fund account (if needed)
echo "💰 Checking account balance..."
aptos account fund-with-faucet --account default

# Deploy AptOS contracts
echo "📦 Deploying AptOS contracts..."
cd move/aptos
aptos move compile
aptos move publish --assume-yes

# Deploy Sentience Protocol contracts
echo "📦 Deploying Sentience Protocol contracts..."
cd ../sentience
aptos move compile
aptos move publish --assume-yes

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update APTOS_OS_ADDRESS in src/services/aptos-client.ts with your deployed address"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start the frontend"

