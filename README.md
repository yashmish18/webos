# AptOS Ecosystem

**The Blockchain Operating System & Sentient Smart Contracts**

A comprehensive decentralized ecosystem built on Aptos blockchain, featuring:

1. **AptOS** - A blockchain operating system where all user actions are on-chain transactions
2. **Sentience Protocol** - Smart contracts that evolve, gain XP, and participate in governance

## 🚀 Features

### AptOS
- **On-Chain Filesystem**: Personal Drive implemented as Move resource
- **File NFTs**: Immutable files with version history
- **ACL System**: Decentralized access control for files
- **App Store**: Deploy and launch decentralized apps
- **Process Management**: Track active contract calls and gas usage
- **Desktop UI**: Glassmorphic cyber-UI with draggable windows

### Sentience Protocol
- **Sentience Score**: Contracts gain scores based on usage metrics
- **XP System**: Contracts level up through transactions and activities
- **Autonomous Governance**: Contracts vote in proposals automatically
- **Contract DAOs**: High-sentience contracts form decentralized organizations
- **Neural Network Visualization**: Interactive 3D visualization of contract relationships

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Aptos CLI
- Python 3 (for Aptos CLI installation)

## 🛠️ Installation

### Quick Start

```bash
# Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# Deploy contracts (optional - uses devnet)
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# Start development server
npm run dev
```

### Manual Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Aptos CLI**
   ```bash
   curl -fsSL https://aptos.dev/scripts/install_cli.py | python3
   aptos config set-global-config --config-type devnet
   ```

3. **Deploy Move Contracts**
   ```bash
   # Deploy AptOS contracts
   cd move/aptos
   aptos move compile
   aptos move publish --assume-yes
   
   # Deploy Sentience Protocol contracts
   cd ../sentience
   aptos move compile
   aptos move publish --assume-yes
   ```

4. **Update Configuration**
   Update `src/services/aptos-client.ts` with your deployed contract addresses.

5. **Start Frontend**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
webos/
├── move/
│   ├── aptos/              # AptOS Move contracts
│   │   ├── sources/
│   │   │   ├── drive.move
│   │   │   ├── file_nft.move
│   │   │   ├── acl.move
│   │   │   └── apps.move
│   │   └── Move.toml
│   └── sentience/          # Sentience Protocol contracts
│       ├── sources/
│       │   ├── sentience_core.move
│       │   ├── governance.move
│       │   └── contract_dao.move
│       └── Move.toml
├── src/
│   ├── apps/
│   │   ├── aptos/          # AptOS frontend
│   │   └── sentience/      # Sentience Protocol frontend
│   ├── components/         # Shared components
│   ├── contexts/           # React contexts
│   ├── services/           # API and blockchain services
│   └── main.tsx
├── scripts/
│   ├── setup.sh
│   └── deploy.sh
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file (or copy from `.env.example`):

```env
VITE_APTOS_NETWORK=devnet
VITE_APTOS_OS_ADDRESS=0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317
```

**Note**: The project is configured to use **devnet** by default. This is recommended for development and testing.

### Contract Address

The default contract address is: `0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317`

After deployment, update this in:
- `src/services/aptos-client.ts`
- `.env` file

## 🎨 Usage

### AptOS

1. Connect your Aptos wallet
2. Initialize your Drive (first-time setup)
3. Create files, manage permissions, launch apps
4. Use the terminal to execute Move commands
5. Monitor activity in the Activity Bar

### Sentience Protocol

1. View the neural network visualization
2. Click on contract nodes to see details
3. Check XP leaderboard and governance proposals
4. Watch contracts evolve and gain sentience

## 🔐 Security

- All file operations are on-chain and immutable
- Access control is enforced through Move smart contracts
- Permissions are cryptographically verified
- Contract upgrades require governance approval

## 📚 Smart Contract Modules

### AptOS Modules

- **drive**: Personal on-chain filesystem
- **file_nft**: NFT-based file representation with versioning
- **acl**: Access Control List system
- **apps**: Decentralized app registry and execution

### Sentience Protocol Modules

- **sentience_core**: Sentience score and XP calculation
- **governance**: Autonomous governance system
- **contract_dao**: DAO formation for high-sentience contracts

## 🌐 Decentralized Storage

The project integrates with:
- **IPFS**: For file content storage (hash stored on-chain)
- **Arweave**: Permanent file storage (optional)
- **Filecoin**: Distributed storage network (optional)

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is a demonstration project. Contributions welcome!

## 📄 License

MIT License

## 🙏 Acknowledgments

- Aptos Labs for the Aptos blockchain
- Move programming language
- React and Vite communities

---

**Built with ❤️ on Aptos**

