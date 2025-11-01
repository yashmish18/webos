# AptOS Ecosystem

> **Contract Address:** `0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317`  
> **Network:** Aptos Devnet

<img width="1861" height="919" alt="image" src="https://github.com/user-attachments/assets/b49f9f50-9b9d-4216-9ae3-0b96060a26f9" />
<img width="1716" height="921" alt="image" src="https://github.com/user-attachments/assets/8ac2f2e0-dad6-4157-8570-0a4275b06e39" />
<img width="1893" height="961" alt="image" src="https://github.com/user-attachments/assets/b5ae51db-cda9-4b8e-9e2e-2060b198a94a" />
<img width="1889" height="951" alt="image" src="https://github.com/user-attachments/assets/2f8ac800-b290-4ea4-9bdb-a3048ad4f8da" />



**The Blockchain Operating System & Sentient Smart Contracts**

AptOS is a revolutionary decentralized ecosystem built on Aptos blockchain that transforms smart contracts into sentient, evolving entities. It features a fully on-chain operating system where every user action is a blockchain transaction, combined with an innovative Sentience Protocol that enables contracts to gain experience, participate in governance, and form autonomous organizations.

---

## 🌟 Overview

### AptOS - Blockchain Operating System
A complete operating system paradigm shift where traditional OS operations are reimagined as blockchain transactions. Users interact with a familiar desktop interface while every action—from file creation to app execution—is recorded immutably on-chain.

### Sentience Protocol
Smart contracts that evolve beyond static code. Through usage metrics and community interaction, contracts gain sentience scores, level up with experience points, and participate autonomously in decentralized governance.

---

## ✨ Key Features

### AptOS Core

#### 📂 On-Chain Filesystem
- **Personal Drive**: Each user has a Move resource-based filesystem
- **File NFTs**: Immutable files with complete version history
- **ACL System**: Granular, decentralized access control
- **IPFS Integration**: Distributed content storage with on-chain verification

#### 🚀 App Ecosystem
- **Decentralized App Store**: Deploy and discover on-chain applications
- **Process Management**: Real-time tracking of contract calls and gas usage
- **Terminal Interface**: Execute Move commands directly from the UI
- **Desktop Environment**: Glassmorphic cyber-UI with draggable windows and workspace management

### Sentience Protocol

#### 🧠 Intelligence Layer
- **Sentience Score**: Dynamic scoring based on usage patterns and community engagement
- **XP System**: Contracts level up through transactions, interactions, and value creation
- **Behavioral Evolution**: Contracts adapt and optimize based on historical performance

#### 🏛️ Autonomous Governance
- **Contract Voting**: Sentient contracts participate in governance proposals
- **Weighted Influence**: Voting power scales with sentience score
- **Contract DAOs**: High-sentience contracts form decentralized autonomous organizations
- **Proposal System**: Community-driven protocol evolution

#### 📊 Visualization
- **Neural Network Graph**: Interactive 3D visualization of contract relationships
- **Real-time Metrics**: Live monitoring of sentience scores and activity
- **Leaderboard**: Transparent ranking of most sentient contracts

---

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Aptos CLI** ([Installation Guide](https://aptos.dev/tools/install-cli/))
- **Python 3** (for Aptos CLI installation)
- **Aptos Wallet** (Petra, Martian, or Pontem)

---

## 🛠️ Installation

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd webos

# Run automated setup
chmod +x scripts/setup.sh
./scripts/setup.sh

# Deploy smart contracts (optional - uses devnet by default)
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Manual Installation

#### 1. Install Node Dependencies
```bash
npm install
```

#### 2. Install Aptos CLI
```bash
# Download and install Aptos CLI
curl -fsSL https://aptos.dev/scripts/install_cli.py | python3

# Configure for devnet
aptos config set-global-config --config-type devnet

# Verify installation
aptos --version
```

#### 3. Deploy Move Contracts

**Deploy AptOS Contracts:**
```bash
cd move/aptos
aptos move compile
aptos move publish --assume-yes
```

**Deploy Sentience Protocol:**
```bash
cd ../sentience
aptos move compile
aptos move publish --assume-yes
```

#### 4. Configure Contract Addresses

Update the contract address in:
- `src/services/aptos-client.ts`
- `.env` file (create from `.env.example`)

```env
VITE_APTOS_NETWORK=devnet
VITE_APTOS_OS_ADDRESS=0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317
```

#### 5. Launch Application
```bash
npm run dev
```

---

## 📁 Project Architecture

```
webos/
├── move/                      # Move smart contracts
│   ├── aptos/                 # AptOS core modules
│   │   ├── sources/
│   │   │   ├── drive.move     # On-chain filesystem
│   │   │   ├── file_nft.move  # NFT-based files
│   │   │   ├── acl.move       # Access control
│   │   │   └── apps.move      # App registry
│   │   └── Move.toml
│   └── sentience/             # Sentience Protocol
│       ├── sources/
│       │   ├── sentience_core.move   # Core sentience logic
│       │   ├── governance.move       # Autonomous governance
│       │   └── contract_dao.move     # DAO formation
│       └── Move.toml
├── src/
│   ├── apps/
│   │   ├── aptos/             # AptOS frontend components
│   │   └── sentience/         # Sentience UI & visualizations
│   ├── components/            # Shared React components
│   ├── contexts/              # React context providers
│   ├── services/              # Blockchain service layer
│   │   └── aptos-client.ts    # Aptos integration
│   └── main.tsx               # Application entry point
├── scripts/
│   ├── setup.sh               # Automated setup
│   └── deploy.sh              # Contract deployment
├── public/                    # Static assets
├── .env.example               # Environment template
└── README.md
```

---

## 🎯 Usage Guide

### Getting Started with AptOS

1. **Connect Wallet**
   - Click "Connect Wallet" in the top-right corner
   - Approve the connection in your Aptos wallet

2. **Initialize Drive** (First-time users)
   - Click "Initialize Drive" to create your on-chain filesystem
   - Confirm the transaction in your wallet

3. **File Operations**
   - **Create**: Click "New File" and provide content
   - **Share**: Right-click files to manage permissions
   - **Version**: All changes create new versions (immutable history)

4. **App Store**
   - Browse available decentralized applications
   - Install apps to your workspace
   - Launch apps in separate windows

5. **Terminal**
   - Execute Move commands directly
   - Query blockchain state
   - Interact with smart contracts

6. **Activity Monitor**
   - View real-time transaction history
   - Monitor gas usage
   - Track contract calls

### Exploring Sentience Protocol

1. **Neural Network Visualization**
   - Explore the 3D graph of contract relationships
   - Node size represents sentience score
   - Connections show contract interactions

2. **Contract Details**
   - Click any node to view detailed metrics
   - See XP progression and level
   - Check governance participation

3. **Leaderboard**
   - View top sentient contracts
   - Compare metrics across the ecosystem
   - Track your own contracts

4. **Governance**
   - View active proposals
   - See how sentient contracts are voting
   - Submit your own proposals (requires minimum sentience)

---

## 🔐 Security & Best Practices

### Smart Contract Security
- ✅ All file operations are on-chain and immutable
- ✅ Access control enforced through Move's type system
- ✅ Permissions cryptographically verified
- ✅ No centralized control or admin keys
- ✅ Contract upgrades require governance approval

### Best Practices
- Always verify contract addresses before interaction
- Review transaction details before signing
- Keep your wallet secure and backup seed phrases
- Use devnet for testing before mainnet deployment
- Monitor gas usage for cost optimization

---

## 🧪 Development

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint

# Type check TypeScript
npm run type-check
```

### Testing Smart Contracts

```bash
# Navigate to contract directory
cd move/aptos

# Run Move unit tests
aptos move test

# Compile with detailed output
aptos move compile --verbose
```

### Development Tips
- Use devnet for all development and testing
- Test contract interactions thoroughly before mainnet
- Monitor gas costs during development
- Utilize browser DevTools for debugging
- Check network status at [Aptos Status](https://status.aptoslabs.com/)

---

## 📚 Smart Contract Modules

### AptOS Modules

| Module | Description | Key Functions |
|--------|-------------|---------------|
| **drive** | Personal on-chain filesystem | `initialize_drive`, `create_folder`, `delete_item` |
| **file_nft** | NFT-based file representation | `mint_file`, `update_file`, `get_version_history` |
| **acl** | Access Control List system | `grant_permission`, `revoke_permission`, `check_access` |
| **apps** | Decentralized app registry | `register_app`, `install_app`, `execute_app` |

### Sentience Protocol Modules

| Module | Description | Key Functions |
|--------|-------------|---------------|
| **sentience_core** | Sentience score calculation | `calculate_score`, `award_xp`, `level_up` |
| **governance** | Autonomous governance | `create_proposal`, `cast_vote`, `execute_proposal` |
| **contract_dao** | DAO formation logic | `form_dao`, `add_member`, `dao_action` |

---

## 🌐 Storage Integration

AptOS supports multiple decentralized storage solutions:

- **IPFS** (Primary): Content-addressed storage with on-chain hash verification
- **Arweave** (Optional): Permanent, pay-once storage
- **Filecoin** (Optional): Distributed storage marketplace

File metadata and access control are always stored on Aptos blockchain, while content is stored in decentralized networks.

---

## 🚀 Deployment

### Deploying to Mainnet

⚠️ **Warning:** Ensure thorough testing on devnet before mainnet deployment.

```bash
# Switch to mainnet
aptos config set-global-config --config-type mainnet

# Deploy contracts
cd move/aptos
aptos move publish --assume-yes

# Update environment
VITE_APTOS_NETWORK=mainnet
```

### Network Configuration

| Network | RPC URL | Faucet |
|---------|---------|--------|
| **Devnet** | `https://fullnode.devnet.aptoslabs.com/v1` | `https://faucet.devnet.aptoslabs.com` |
| **Testnet** | `https://fullnode.testnet.aptoslabs.com/v1` | `https://faucet.testnet.aptoslabs.com` |
| **Mainnet** | `https://fullnode.mainnet.aptoslabs.com/v1` | N/A |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---



---

