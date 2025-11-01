import { useState, useEffect } from 'react'
import { Activity, Clock, CheckCircle, XCircle, Loader } from 'lucide-react'

interface Transaction {
  hash: string
  type: 'file_create' | 'file_update' | 'permission_grant' | 'app_launch'
  status: 'pending' | 'success' | 'failed'
  timestamp: number
  description: string
}

interface ActivityBarProps {
  account: string
}

export function ActivityBar({ account }: ActivityBarProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Simulate loading transactions
    // In production, this would listen to blockchain events
    const mockTransactions: Transaction[] = [
      {
        hash: '0x123...abc',
        type: 'file_create',
        status: 'success',
        timestamp: Date.now() - 3600000,
        description: 'Created file: notes.txt',
      },
      {
        hash: '0x456...def',
        type: 'app_launch',
        status: 'pending',
        timestamp: Date.now() - 1800000,
        description: 'Launching app: TextEditor',
      },
      {
        hash: '0x789...ghi',
        type: 'permission_grant',
        status: 'success',
        timestamp: Date.now() - 900000,
        description: 'Granted read permission to 0xabc...',
      },
    ]
    setTransactions(mockTransactions)
  }, [account])

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'file_create':
      case 'file_update':
        return 'text-neon-cyan'
      case 'permission_grant':
        return 'text-neon-purple'
      case 'app_launch':
        return 'text-neon-blue'
      default:
        return 'text-gray-400'
    }
  }

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-cyan-500/20">
        <Activity className="w-5 h-5 text-neon-cyan" />
        <h3 className="text-lg font-semibold text-neon-cyan">Activity</h3>
      </div>

      <div className="flex-1 overflow-auto space-y-2">
        {transactions.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            No recent activity
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.hash}
              className="glass rounded-lg p-3 space-y-2 hover:glow-cyan transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(tx.status)}
                  <span className={`text-sm font-medium ${getTypeColor(tx.type)}`}>
                    {tx.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(tx.timestamp)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-300">{tx.description}</div>
              <div className="text-xs text-gray-500 font-mono">{tx.hash}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

