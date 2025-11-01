import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileExplorer } from './components/FileExplorer'
import { Terminal } from './components/Terminal'
import { ActivityBar } from './components/ActivityBar'
import { AppWindow } from './components/AppWindow'
import { Taskbar } from './components/Taskbar'
import { useWalletContext } from '../../contexts/WalletContext'
import { HardDrive, Terminal as TerminalIcon, Activity, Home as HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export interface Window {
  id: string
  title: string
  component: React.ReactNode
  icon: React.ReactNode
  minimized: boolean
  zIndex: number
}

export default function AptOSDesktop() {
  const { connected, account } = useWalletContext()
  const navigate = useNavigate()
  const [windows, setWindows] = useState<Window[]>([])
  const [nextZIndex, setNextZIndex] = useState(100)
  const [selectedWindow, setSelectedWindow] = useState<string | null>(null)

  const openWindow = (title: string, component: React.ReactNode, icon: React.ReactNode) => {
    const id = `${title}-${Date.now()}`
    const newWindow: Window = {
      id,
      title,
      component,
      icon,
      minimized: false,
      zIndex: nextZIndex,
    }
    setWindows([...windows, newWindow])
    setNextZIndex(nextZIndex + 1)
    setSelectedWindow(id)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
    if (selectedWindow === id) {
      setSelectedWindow(null)
    }
  }

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ))
    if (selectedWindow === id) {
      setSelectedWindow(null)
    }
  }

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
    ))
    setNextZIndex(nextZIndex + 1)
    setSelectedWindow(id)
  }

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : { ...w }
    ))
    setNextZIndex(nextZIndex + 1)
    setSelectedWindow(id)
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="glass-strong rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-neon-cyan">Please Connect Wallet</h2>
          <p className="text-gray-400">Connect your Aptos wallet to use AptOS</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg relative overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Desktop Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Top Bar */}
        <div className="glass-strong border-b border-cyan-500/20 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 glass rounded-lg hover:glow-cyan transition-all"
            >
              <HomeIcon className="w-5 h-5 text-neon-cyan" />
            </button>
            <h1 className="text-xl font-bold neon-cyan">AptOS</h1>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <p className="text-sm text-neon-cyan">
              {account?.slice(0, 8)}...{account?.slice(-6)}
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex relative">
          {/* Sidebar */}
          <div className="glass-strong border-r border-cyan-500/20 w-64 p-4 space-y-2">
              <button
                onClick={() => openWindow(
                  'File Explorer',
                  <FileExplorer account={account!} />,
                  <HardDrive className="w-5 h-5" />
                )}
                className="w-full glass rounded-lg p-3 flex items-center space-x-3 hover:glow-cyan transition-all"
              >
                <HardDrive className="w-5 h-5 text-neon-cyan" />
                <span className="text-neon-cyan">File Explorer</span>
              </button>
              <button
                onClick={() => openWindow(
                  'Terminal',
                  <Terminal account={account!} />,
                  <TerminalIcon className="w-5 h-5" />
                )}
                className="w-full glass rounded-lg p-3 flex items-center space-x-3 hover:glow-cyan transition-all"
              >
                <TerminalIcon className="w-5 h-5 text-neon-cyan" />
                <span className="text-neon-cyan">Terminal</span>
              </button>
              <button
                onClick={() => openWindow(
                  'Activity',
                  <ActivityBar account={account!} />,
                  <Activity className="w-5 h-5" />
                )}
                className="w-full glass rounded-lg p-3 flex items-center space-x-3 hover:glow-cyan transition-all"
              >
                <Activity className="w-5 h-5 text-neon-cyan" />
                <span className="text-neon-cyan">Activity</span>
              </button>
          </div>

          {/* Windows Container */}
          <div className="flex-1 relative">
            <AnimatePresence>
              {windows.map(window => !window.minimized && (
                <AppWindow
                  key={window.id}
                  window={window}
                  isSelected={selectedWindow === window.id}
                  onClose={() => closeWindow(window.id)}
                  onMinimize={() => minimizeWindow(window.id)}
                  onMaximize={() => maximizeWindow(window.id)}
                  onFocus={() => bringToFront(window.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Taskbar */}
        <Taskbar
          windows={windows}
          selectedWindow={selectedWindow}
          onSelectWindow={(id) => {
            const window = windows.find(w => w.id === id)
            if (window?.minimized) {
              maximizeWindow(id)
            } else {
              bringToFront(id)
            }
          }}
        />
      </div>
    </div>
  )
}

