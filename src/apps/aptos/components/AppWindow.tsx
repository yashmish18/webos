import { motion } from 'framer-motion'
import { X, Minimize2, Maximize2 } from 'lucide-react'
import type { Window } from '../AptOSDesktop'

interface AppWindowProps {
  window: Window
  isSelected: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
}

export function AppWindow({
  window,
  isSelected,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: AppWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{ zIndex: window.zIndex }}
      className={`absolute top-20 left-20 w-[800px] h-[600px] glass-strong rounded-lg overflow-hidden ${
        isSelected ? 'ring-2 ring-neon-cyan' : ''
      }`}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div className="glass border-b border-cyan-500/20 p-3 flex items-center justify-between cursor-move">
        <div className="flex items-center space-x-2">
          {window.icon}
          <span className="text-sm font-semibold text-neon-cyan">{window.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-neon-cyan" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-neon-cyan" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-48px)] overflow-auto p-4">
        {window.component}
      </div>
    </motion.div>
  )
}

