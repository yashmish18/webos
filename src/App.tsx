import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { WalletProvider } from './contexts/WalletContext'
import AptOSDesktop from './apps/aptos/AptOSDesktop'
import SentienceNetwork from './apps/sentience/SentienceNetwork'
import Home from './components/Home'
import './App.css'

function App() {
  const [, setActiveApp] = useState<'aptos' | 'sentience' | null>(null)

  return (
      <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        // pass raw string; provider expects a Network-like value — cast to any to satisfy TS here
        network: (import.meta.env.VITE_APTOS_NETWORK?.toLowerCase() as any) || 'devnet',
      }}
    >
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-dark-bg overflow-hidden">
            <Routes>
              <Route path="/" element={<Home onLaunchApp={setActiveApp} />} />
              <Route path="/aptos/*" element={<AptOSDesktop />} />
              <Route path="/sentience/*" element={<SentienceNetwork />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </AptosWalletAdapterProvider>
  )
}

export default App

