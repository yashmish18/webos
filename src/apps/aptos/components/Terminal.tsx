import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

interface TerminalProps {
  account: string
}

export function Terminal({ account }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'AptOS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = async (command: string) => {
    const parts = command.trim().split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    setHistory(prev => [...prev, { type: 'input', text: `$ ${command}` }])

    switch (cmd) {
      case 'help':
        setHistory(prev => [...prev, {
          type: 'output',
          text: `Available commands:
  help              - Show this help message
  ls                - List files
  pwd               - Print working directory
  cat <file>        - Display file contents
  create <file>     - Create a new file
  deploy            - Deploy Move module
  account           - Show current account
  clear             - Clear terminal
  `
        }])
        break

      case 'ls':
        setHistory(prev => [...prev, {
          type: 'output',
          text: 'documents/  notes.txt  code.move'
        }])
        break

      case 'pwd':
        setHistory(prev => [...prev, {
          type: 'output',
          text: '/'
        }])
        break

      case 'cat':
        if (args.length === 0) {
          setHistory(prev => [...prev, {
            type: 'output',
            text: 'Error: Please specify a file name'
          }])
        } else {
          setHistory(prev => [...prev, {
            type: 'output',
            text: `Contents of ${args[0]}:\n[File content would be loaded from IPFS/Arweave]`
          }])
        }
        break

      case 'create':
        if (args.length === 0) {
          setHistory(prev => [...prev, {
            type: 'output',
            text: 'Error: Please specify a file name'
          }])
        } else {
          setHistory(prev => [...prev, {
            type: 'output',
            text: `Creating file ${args[0]}...\n[Would create file NFT on-chain]`
          }])
        }
        break

      case 'deploy':
        setHistory(prev => [...prev, {
          type: 'output',
          text: 'Deploying Move module...\n[Would compile and deploy Move contract]'
        }])
        break

      case 'account':
        setHistory(prev => [...prev, {
          type: 'output',
          text: `Account: ${account}`
        }])
        break

      case 'clear':
        setHistory([{ type: 'output', text: '' }])
        break

      case '':
        // Empty command, do nothing
        break

      default:
        setHistory(prev => [...prev, {
          type: 'output',
          text: `Command not found: ${cmd}. Type "help" for available commands.`
        }])
    }

    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    }
  }

  return (
    <div className="h-full flex flex-col bg-black/50 rounded-lg p-4 font-mono">
      <div className="flex-1 overflow-auto mb-4 space-y-1" ref={terminalRef}>
        {history.map((item, index) => (
          <div
            key={index}
            className={item.type === 'input' ? 'text-neon-cyan' : 'text-gray-300'}
          >
            {item.text.split('\n').map((line, lineIndex) => (
              <div key={lineIndex}>{line || '\u00A0'}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 border-t border-cyan-500/20 pt-2">
        <TerminalIcon className="w-4 h-4 text-neon-cyan" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-neon-cyan"
          placeholder="Enter command..."
          autoFocus
        />
      </div>
    </div>
  )
}

