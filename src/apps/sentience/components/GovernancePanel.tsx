import { useState } from 'react'
import { Vote, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Proposal {
  id: string
  title: string
  description: string
  status: 'active' | 'passed' | 'rejected'
  yesVotes: number
  noVotes: number
  expiresAt: number
}

export function GovernancePanel() {
  const [proposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Upgrade Protocol Version',
      description: 'Proposal to upgrade to v2.0 with enhanced XP system',
      status: 'active',
      yesVotes: 4500,
      noVotes: 1200,
      expiresAt: Date.now() + 86400000,
    },
    {
      id: '2',
      title: 'Adjust Sentience Threshold',
      description: 'Change minimum sentience score for DAO formation',
      status: 'passed',
      yesVotes: 3200,
      noVotes: 800,
      expiresAt: Date.now() - 86400000,
    },
  ])

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Vote className="w-5 h-5 text-neon-purple" />
        <h3 className="font-semibold text-neon-purple">Governance</h3>
      </div>
      <div className="space-y-3">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="glass rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white text-sm">{proposal.title}</h4>
              {getStatusIcon(proposal.status)}
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">{proposal.description}</p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-green-400">{proposal.yesVotes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <XCircle className="w-3 h-3 text-red-400" />
                <span className="text-red-400">{proposal.noVotes}</span>
              </div>
            </div>
            {proposal.status === 'active' && (
              <button className="w-full glass rounded-lg py-2 text-xs text-neon-purple hover:glow-purple transition-all">
                Vote
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

