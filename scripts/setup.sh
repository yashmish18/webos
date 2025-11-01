#!/bin/bash

# Setup script for AptOS Ecosystem

set -e

echo "🔧 Setting up AptOS Ecosystem..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Aptos CLI if not present
if ! command -v aptos &> /dev/null; then
    echo "📥 Installing Aptos CLI..."
    curl -fsSL https://aptos.dev/scripts/install_cli.py | python3
else
    echo "✅ Aptos CLI already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
VITE_APTOS_NETWORK=devnet
VITE_APTOS_OS_ADDRESS=0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Run './scripts/deploy.sh' to deploy Move contracts"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Connect your Aptos wallet and start using AptOS!"

