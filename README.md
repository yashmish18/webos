# AptOS Ecosystem

> **Contract Address:** `0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317`  
> **Network:** Aptos Devnet

<img width="1716" height="921" alt="image" src="https://github.com/user-attachments/assets/9cd50603-2b2f-43f3-93b7-bb9de0699747" />

<img width="1861" height="919" alt="image" src="https://github.com/user-attachments/assets/1aea3e60-db65-4f87-8997-3f40672fe784" />
<img width="1889" height="951" alt="image" src="https://github.com/user-attachments/assets/6f9f9bb7-6a1d-4bd5-b835-0718252fbdd6" />
<img width="1893" height="961" alt="image" src="https://github.com/user-attachments/assets/798c7c39-44e9-4d88-90ee-30a3047da7be" />



A decentralized ecosystem built on Aptos blockchain featuring a fully on-chain operating system and smart contracts that evolve through usage and participate autonomously in governance.

---

## Overview

**AptOS** - A blockchain operating system where every user action is an on-chain transaction. Features include on-chain filesystem, file NFTs, decentralized access control, and a desktop UI.

**Sentience Protocol** - Smart contracts that gain experience points, evolve through usage, and participate autonomously in governance decisions.

---

## Key Features

- **On-Chain Filesystem** - Personal Drive implemented as Move resources with complete version history
- **File NFTs** - Immutable files with cryptographic access control
- **Decentralized App Store** - Deploy and launch on-chain applications
- **Sentience Scoring** - Contracts gain XP and levels based on usage metrics
- **Autonomous Governance** - Contracts vote on proposals automatically based on sentience scores
- **Neural Network Visualization** - Interactive 3D graph of contract relationships
- **Desktop Environment** - Glassmorphic cyber-UI with draggable windows

---

## Quick Start

```bash
# Install dependencies
npm install

# Deploy contracts (optional - uses devnet)
chmod +x scripts/setup.sh scripts/deploy.sh
./scripts/setup.sh
./scripts/deploy.sh

# Start application
npm run dev
```

Access the application at `http://localhost:5173`

---

## Prerequisites

- Node.js 18+
- Aptos CLI ([Installation Guide](https://aptos.dev/tools/install-cli/))
- Aptos Wallet (Petra, Martian, or Pontem)

---

## Project Structure

```
webos/
├── move/
│   ├── aptos/              # AptOS core contracts
│   │   └── sources/        # drive, file_nft, acl, apps
│   └── sentience/          # Sentience Protocol contracts
│       └── sources/        # sentience_core, governance, contract_dao
├── src/
│   ├── apps/               # Frontend applications
│   ├── components/         # React components
│   ├── contexts/           # State management
│   └── services/           # Blockchain integration
└── scripts/                # Deployment automation
```

---

## Smart Contract Modules

### AptOS
- **drive** - On-chain filesystem operations
- **file_nft** - NFT-based file representation with versioning
- **acl** - Access Control List system
- **apps** - Decentralized app registry

### Sentience Protocol
- **sentience_core** - XP and sentience score calculation
- **governance** - Autonomous proposal voting system
- **contract_dao** - DAO formation for high-sentience contracts

---

## Configuration

Create `.env` file:

```env
VITE_APTOS_NETWORK=devnet
VITE_APTOS_OS_ADDRESS=0xe23271845ae90b84415dc51d813ce44ec5ce3665120869416bfef1b425dd0317
```

After deploying your own contracts, update the address in `src/services/aptos-client.ts` and `.env`

---

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

### Testing Contracts

```bash
cd move/aptos
aptos move test
aptos move compile --verbose
```

---

## Deployment

### Deploy to Mainnet

```bash
# Switch to mainnet
aptos config set-global-config --config-type mainnet

# Deploy contracts
cd move/aptos
aptos move publish --assume-yes

# Update environment
VITE_APTOS_NETWORK=mainnet
```

**⚠️ Warning:** Thoroughly test on devnet before mainnet deployment.

---

## Security

- All operations are on-chain and immutable
- Access control enforced through Move's type system
- Permissions cryptographically verified
- No centralized control or admin keys
- Contract upgrades require governance approval

---

## Storage Integration

- **IPFS** - Primary content storage (hash stored on-chain)
- **Arweave** - Optional permanent storage
- **Filecoin** - Optional distributed storage

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Aptos Labs for the Aptos blockchain
- Move programming language team
- React and Vite communities

---

