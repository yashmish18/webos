Write-Host "🚀 Starting deployment process..."

# Check if aptos CLI is installed
if (-not (Get-Command aptos -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Aptos CLI not found. Please install it first:`n  curl -fsSL https://aptos.dev/scripts/install_cli.py | python3" -ForegroundColor Red
    exit 1
}

Write-Host "📝 Configuring Aptos CLI for devnet..."
aptos config set-global-config --config-type devnet

Write-Host "💰 Checking account balance..."
aptos account fund-with-faucet --account default

# Deploy AptOS contracts
Write-Host "📦 Deploying AptOS contracts..."
Push-Location "$(Join-Path $PSScriptRoot '..\move\aptos')"
aptos move compile
aptos move publish --assume-yes
Pop-Location

# Deploy Sentience Protocol contracts
Write-Host "📦 Deploying Sentience Protocol contracts..."
Push-Location "$(Join-Path $PSScriptRoot '..\move\sentience')"
aptos move compile
aptos move publish --assume-yes
Pop-Location

Write-Host "✅ Deployment complete!"
Write-Host "\n📋 Next steps:"
Write-Host "1. Update APTOS_OS_ADDRESS in src/services/aptos-client.ts with your deployed address"
Write-Host "2. Run 'npm install' to install dependencies"
Write-Host "3. Run 'npm run dev' to start the frontend"
