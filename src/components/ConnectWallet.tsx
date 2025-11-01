import { useWallet } from '@aptos-labs/wallet-adapter-react'

export default function ConnectWallet() {
  const { connected, account, wallets, notDetectedWallets, connect, disconnect } = useWallet()

  const addressStr = account ? String((account as any).address) : undefined

  return (
    <div className="flex items-center justify-center space-x-4">
      {connected && addressStr ? (
        <div className="flex items-center space-x-3">
          <div className="glass px-3 py-1 rounded-md text-sm text-neon-cyan">
            {addressStr.slice(0, 6)}...{addressStr.slice(-4)}
          </div>
          <button
            onClick={() => disconnect()}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm text-white"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {wallets && wallets.length > 0 ? (
            wallets.map((w) => (
              <button
                key={w.name}
                onClick={() => connect(w.name)}
                className="px-3 py-1 bg-neon-cyan hover:opacity-90 rounded-md text-sm text-black"
              >
                Connect {w.name}
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-400">No wallets detected</div>
          )}

          {notDetectedWallets && notDetectedWallets.length > 0 && (
            <div className="text-xs text-gray-400 ml-2">
              {notDetectedWallets.map((w) => (
                <div key={w.name}>
                  {w.name} not installed
                  {w.url && (
                    <a href={w.url} target="_blank" rel="noreferrer" className="ml-1 text-neon-cyan">
                      Install
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
