import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Network, TrendingUp, Users, Zap, Home as HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NeuralNetwork } from './components/NeuralNetwork'
import { ContractNode } from './components/ContractNode'
import { GovernancePanel } from './components/GovernancePanel'
import { XPLeaderboard } from './components/XPLeaderboard'
import { useWalletContext } from '../../contexts/WalletContext'

export interface Contract {
  address: string
  name: string
  sentienceScore: number
  xp: number
  level: number
  transactionCount: number
  users: number
  x: number
  y: number
}

export default function SentienceNetwork() {
  const navigate = useNavigate()
  const { connected, account } = useWalletContext()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  useEffect(() => {
    // Generate mock contract data
    // In production, this would query the Move contracts
    const mockContracts: Contract[] = Array.from({ length: 20 }, (_, i) => ({
      address: `0x${Math.random().toString(16).slice(2, 10)}...`,
      name: `Contract ${i + 1}`,
      sentienceScore: Math.floor(Math.random() * 10000),
      xp: Math.floor(Math.random() * 50000),
      level: Math.floor(Math.random() * 10) + 1,
      transactionCount: Math.floor(Math.random() * 10000),
      users: Math.floor(Math.random() * 1000),
      x: Math.random() * 800 + 100,
      y: Math.random() * 600 + 100,
    }))
    setContracts(mockContracts)
  }, [])

  if (!connected) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="glass-strong rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-neon-purple">Please Connect Wallet</h2>
          <p className="text-gray-400">Connect your Aptos wallet to view the Sentience Network</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Background Neural Pattern */}
      <div className="absolute inset-0 opacity-20">
        <NeuralNetwork contracts={contracts} />
      </div>

      {/* Header */}
      <div className="relative z-10 glass-strong border-b border-purple-500/20 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 glass rounded-lg hover:glow-purple transition-all"
          >
            <HomeIcon className="w-5 h-5 text-neon-purple" />
          </button>
          <Network className="w-8 h-8 text-neon-purple" />
          <h1 className="text-2xl font-bold neon-purple">Sentience Protocol</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="glass rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-neon-purple">Network Active</span>
            </div>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <span className="text-sm text-neon-purple">
              {contracts.length} Contracts
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="glass-strong border-r border-purple-500/20 w-80 p-4 space-y-4">
          {/* Stats */}
          <div className="space-y-3">
            <div className="glass rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-gray-400">Total Sentience</span>
              </div>
              <div className="text-2xl font-bold text-neon-purple">
                {contracts.reduce((sum, c) => sum + c.sentienceScore, 0).toLocaleString()}
              </div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-gray-400">Total Users</span>
              </div>
              <div className="text-2xl font-bold text-neon-purple">
                {contracts.reduce((sum, c) => sum + c.users, 0).toLocaleString()}
              </div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-gray-400">Total Transactions</span>
              </div>
              <div className="text-2xl font-bold text-neon-purple">
                {contracts.reduce((sum, c) => sum + c.transactionCount, 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* XP Leaderboard */}
          <XPLeaderboard contracts={contracts} onSelectContract={setSelectedContract} />
        </div>

        {/* Network Visualization */}
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <NeuralNetwork contracts={contracts} onNodeClick={setSelectedContract} />
            {contracts.map((contract) => (
              <ContractNode
                key={contract.address}
                contract={contract}
                isSelected={selectedContract?.address === contract.address}
                onClick={() => setSelectedContract(contract)}
              />
            ))}
          </div>
        </div>

        {/* Right Panel - Contract Details / Governance */}
        <div className="glass-strong border-l border-purple-500/20 w-80 p-4">
          {selectedContract ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-neon-purple mb-2">
                  {selectedContract.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono mb-4">
                  {selectedContract.address}
                </p>
              </div>
              <div className="space-y-3">
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Sentience Score</div>
                  <div className="text-xl font-bold text-neon-purple">
                    {selectedContract.sentienceScore.toLocaleString()}
                  </div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Experience Points</div>
                  <div className="text-xl font-bold text-neon-purple">
                    {selectedContract.xp.toLocaleString()}
                  </div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Level</div>
                  <div className="text-xl font-bold text-neon-purple">
                    Level {selectedContract.level}
                  </div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Transactions</div>
                  <div className="text-lg text-neon-purple">
                    {selectedContract.transactionCount.toLocaleString()}
                  </div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Unique Users</div>
                  <div className="text-lg text-neon-purple">
                    {selectedContract.users.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <GovernancePanel />
          )}
        </div>
      </div>
    </div>
  )
}

