import React, { createContext, useContext, ReactNode } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

interface WalletContextType {
  account: string | null
  connected: boolean
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWalletContext must be used within WalletProvider')
  }
  return context
}

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { account, connected, disconnect: walletDisconnect } = useWallet()

  const disconnect = () => {
    walletDisconnect()
  }

  const accountAddress = account ? String((account as any).address) : null

  return (
    <WalletContext.Provider
      value={{
        account: accountAddress,
        connected: connected || false,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

