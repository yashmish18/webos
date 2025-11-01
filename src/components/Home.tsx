import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HardDrive, Network, Zap } from 'lucide-react'
import { useWalletContext } from '../contexts/WalletContext'
import ConnectWallet from './ConnectWallet'

interface HomeProps {
  onLaunchApp?: (app: 'aptos' | 'sentience') => void
}

export default function Home({ onLaunchApp }: HomeProps) {
  const navigate = useNavigate()
  const { connected, account } = useWalletContext()

  const launchApp = (app: 'aptos' | 'sentience') => {
    if (onLaunchApp) {
      onLaunchApp(app)
    }
    navigate(`/${app}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            className="text-6xl font-bold neon-cyan"
            animate={{ textShadow: [
              '0 0 10px #00ffff, 0 0 20px #00ffff',
              '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff',
              '0 0 10px #00ffff, 0 0 20px #00ffff',
            ]}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AptOS Ecosystem
          </motion.h1>
          <p className="text-xl text-gray-400">
            Blockchain Operating System & Sentient Smart Contracts
          </p>
          {connected && account && (
            <div className="glass rounded-lg px-4 py-2 inline-block">
              <p className="text-sm text-neon-cyan">
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          )}
          <div className="mt-4">
            <ConnectWallet />
          </div>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AptOS Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => launchApp('aptos')}
            className="glass-strong rounded-2xl p-8 cursor-pointer glow-cyan hover:glow-cyan transition-all"
          >
            <div className="flex items-center space-x-4 mb-4">
              <HardDrive className="w-12 h-12 text-neon-cyan" />
              <h2 className="text-3xl font-bold text-neon-cyan">AptOS</h2>
            </div>
            <p className="text-gray-300 mb-4">
              The Blockchain Operating System where all user actions are on-chain transactions.
              Create files, launch apps, and manage your decentralized filesystem.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-cyan">
                File System
              </span>
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-cyan">
                NFT Files
              </span>
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-cyan">
                App Store
              </span>
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-cyan">
                ACL
              </span>
            </div>
          </motion.div>

          {/* Sentience Protocol Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => launchApp('sentience')}
            className="glass-strong rounded-2xl p-8 cursor-pointer glow-purple hover:glow-purple transition-all"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Network className="w-12 h-12 text-neon-purple" />
              <h2 className="text-3xl font-bold text-neon-purple">Sentience Protocol</h2>
            </div>
            <p className="text-gray-300 mb-4">
              When smart contracts start voting back. Contracts evolve, gain XP, form DAOs,
              and participate in autonomous governance.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-purple">
                Sentience Score
              </span>
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-purple">
                XP System
              </span>
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-purple">
                Governance
              </span>
              <span className="px-3 py-1 glass rounded-full text-xs text-neon-purple">
                Contract DAOs
              </span>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Zap className="w-8 h-8 text-neon-cyan mx-auto" />
              <h4 className="font-semibold">On-Chain Everything</h4>
              <p className="text-sm text-gray-400">
                All actions are blockchain transactions on Aptos
              </p>
            </div>
            <div className="text-center space-y-2">
              <HardDrive className="w-8 h-8 text-neon-cyan mx-auto" />
              <h4 className="font-semibold">Decentralized Storage</h4>
              <p className="text-sm text-gray-400">
                IPFS/Arweave integration for file contents
              </p>
            </div>
            <div className="text-center space-y-2">
              <Network className="w-8 h-8 text-neon-purple mx-auto" />
              <h4 className="font-semibold">Autonomous Contracts</h4>
              <p className="text-sm text-gray-400">
                Smart contracts that evolve and govern
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

