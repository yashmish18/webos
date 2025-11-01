# Deployment Guide

This guide provides step-by-step instructions for deploying AptOS and Sentience Protocol to Aptos blockchain.

## Prerequisites

1. **Node.js 18+** and npm
2. **Python 3** (for Aptos CLI)
3. **Aptos CLI** installed
4. **Aptos Wallet** (Petra, Martian, or other compatible wallet)
5. **Testnet APT** (for gas fees - available via faucet)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Install Aptos CLI

```bash
curl -fsSL https://aptos.dev/scripts/install_cli.py | python3
```

Verify installation:
```bash
aptos --version
```

## Step 3: Configure Aptos CLI

### For Devnet (Recommended for testing)

```bash
aptos config set-global-config --config-type devnet
```

### For Testnet

```bash
aptos config set-global-config --config-type testnet
```

### For Mainnet

```bash
aptos config set-global-config --config-type mainnet
```

## Step 4: Create/Import Account

### Create New Account
```bash
aptos init --profile default
```

### Import Existing Account
```bash
aptos init --profile default --private-key <your-private-key>
```

## Step 5: Fund Your Account (Devnet/Testnet)

```bash
aptos account fund-with-faucet --account default
```

For manual faucet:
- Devnet: https://faucet.devnet.aptoslabs.com
- Testnet: https://faucet.testnet.aptoslabs.com

## Step 6: Update Contract Address

Edit `move/aptos/Move.toml` and `move/sentience/Move.toml`:

```toml
[addresses]
aptos_os = "<your-account-address>"
sentience = "<your-account-address>"
```

Replace `<your-account-address>` with your account address from `aptos config show-profiles`.

## Step 7: Compile Move Contracts

### AptOS Contracts

```bash
cd move/aptos
aptos move compile
```

### Sentience Protocol Contracts

```bash
cd move/sentience
aptos move compile
```

## Step 8: Deploy Contracts

### Deploy AptOS

```bash
cd move/aptos
aptos move publish --assume-yes
```

### Deploy Sentience Protocol

```bash
cd move/sentience
aptos move publish --assume-yes
```

## Step 9: Update Frontend Configuration

Update `src/services/aptos-client.ts`:

```typescript
export const APTOS_OS_ADDRESS = '<your-deployed-address>'
```

Update `.env` file:

```env
VITE_APTOS_NETWORK=devnet
VITE_APTOS_OS_ADDRESS=<your-deployed-address>
```

## Step 10: Build Frontend

```bash
npm run build
```

## Step 11: Deploy Frontend

### Option 1: Vercel

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: IPFS

```bash
npm install -g ipfs-deploy
ipfs-deploy dist
```

## Step 12: Verify Deployment

1. Visit your deployed frontend URL
2. Connect your wallet
3. Initialize Drive (for AptOS)
4. Test file creation and management
5. Check Sentience Network visualization

## Troubleshooting

### Contract Compilation Errors

- Ensure all dependencies are correctly specified in `Move.toml`
- Check that address format is correct (0x followed by hex)
- Verify Aptos framework version compatibility

### Deployment Errors

- Ensure account has sufficient APT for gas fees
- Check network configuration matches your target network
- Verify account address in `Move.toml` matches your account

### Frontend Connection Issues

- Verify wallet is connected to the correct network
- Check that contract addresses are correctly configured
- Ensure RPC endpoint is accessible

## Network-Specific Notes

### Devnet
- Resets periodically
- Free APT from faucet
- Fast transaction confirmation
- Best for development and testing

### Testnet
- More stable than devnet
- Free APT from faucet
- Good for integration testing

### Mainnet
- Production network
- Real APT required
- Permanent deployments
- Requires careful testing before deployment

## Additional Resources

- [Aptos Documentation](https://aptos.dev)
- [Move Language Guide](https://aptos.dev/move/move-on-aptos)
- [Aptos SDK](https://aptos-labs.github.io/ts-sdk-doc/)
- [Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)

## Support

For issues or questions:
1. Check the [README.md](./README.md)
2. Review Aptos documentation
3. Open an issue on GitHub

---

**Happy Deploying! 🚀**

