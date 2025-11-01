# Quick Start Guide

Get AptOS Ecosystem running in 5 minutes!

## 🚀 Fast Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup Aptos CLI (if not already installed)
curl -fsSL https://aptos.dev/scripts/install_cli.py | python3
aptos config set-global-config --config-type devnet

# 3. Fund your account
aptos account fund-with-faucet --account default

# 4. Start the frontend
npm run dev
```

## 🎯 What You'll See

1. **Home Screen** - Choose between AptOS or Sentience Protocol
2. **AptOS Desktop** - Blockchain operating system interface
3. **Sentience Network** - Interactive contract visualization

## 📱 Connect Wallet

1. Click "Connect Wallet" (if available)
2. Select your Aptos wallet (Petra, Martian, etc.)
3. Approve the connection
4. Start using the apps!

## 🎨 Features to Try

### AptOS
- Open File Explorer to see your on-chain files
- Launch Terminal to run Move commands
- Check Activity Bar for transaction history
- Create files and manage permissions

### Sentience Protocol
- View the neural network of contracts
- Click on contract nodes to see details
- Check XP leaderboard
- View governance proposals

## 🔧 Customization

### Update Contract Address

After deploying your contracts, update:
- `src/services/aptos-client.ts`
- `.env` file

### Change Network (Optional)

The project defaults to **devnet** which is recommended for development. To change:

Edit `.env`:
```env
VITE_APTOS_NETWORK=devnet  # or testnet/mainnet
```

**Important**: Make sure your wallet is connected to the same network!

## 📚 Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- Explore the Move contracts in `move/` directory
- Customize the UI in `src/apps/` directory

## 🐛 Troubleshooting

**Wallet won't connect?**
- Make sure you have a compatible wallet installed
- Check that wallet is on the correct network (devnet/testnet/mainnet)

**Contracts not working?**
- Verify contracts are deployed
- Check contract addresses in configuration files
- Ensure wallet is connected

**Build errors?**
- Run `npm install` again
- Clear `node_modules` and reinstall
- Check Node.js version (18+ required)

---

**Need Help?** Check the main [README.md](./README.md) for more details!

