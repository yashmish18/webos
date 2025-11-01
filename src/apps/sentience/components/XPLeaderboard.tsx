import { Contract } from '../SentienceNetwork'
import { Trophy, TrendingUp } from 'lucide-react'

interface XPLeaderboardProps {
  contracts: Contract[]
  onSelectContract: (contract: Contract) => void
}

export function XPLeaderboard({ contracts, onSelectContract }: XPLeaderboardProps) {
  const sortedContracts = [...contracts]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10)

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-5 h-5 text-neon-purple" />
        <h3 className="font-semibold text-neon-purple">XP Leaderboard</h3>
      </div>
      <div className="space-y-2">
        {sortedContracts.map((contract, index) => (
          <div
            key={contract.address}
            onClick={() => onSelectContract(contract)}
            className="glass rounded-lg p-2 flex items-center justify-between cursor-pointer hover:glow-purple transition-all"
          >
            <div className="flex items-center space-x-2 flex-1">
              <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs font-bold text-neon-purple">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {contract.name}
                </div>
                <div className="text-xs text-gray-400">
                  Level {contract.level}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs text-neon-purple">
              <TrendingUp className="w-3 h-3" />
              <span>{contract.xp.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

