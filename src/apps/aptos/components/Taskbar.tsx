import type { Window } from '../AptOSDesktop'

interface TaskbarProps {
  windows: Window[]
  selectedWindow: string | null
  onSelectWindow: (id: string) => void
}

export function Taskbar({ windows, selectedWindow, onSelectWindow }: TaskbarProps) {
  return (
    <div className="glass-strong border-t border-cyan-500/20 p-2 flex items-center space-x-2">
      {windows.map(window => (
        <button
          key={window.id}
          onClick={() => onSelectWindow(window.id)}
          className={`glass rounded-lg px-4 py-2 flex items-center space-x-2 transition-all ${
            selectedWindow === window.id
              ? 'glow-cyan ring-2 ring-neon-cyan'
              : 'hover:glow-cyan'
          }`}
        >
          {window.icon}
          <span className="text-sm text-neon-cyan">{window.title}</span>
        </button>
      ))}
    </div>
  )
}

