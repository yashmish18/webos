import { useState, useEffect } from 'react'
import { Folder, Upload, FileText, Image as ImageIcon, Code } from 'lucide-react'

interface FileItem {
  id: string
  name: string
  type: string
  path: string
  size: number
  createdAt: number
  isDirectory: boolean
}

interface FileExplorerProps {
  account: string
}

export function FileExplorer({ account }: FileExplorerProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState('/')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadFiles()
  }, [account, currentPath])

  const loadFiles = async () => {
    setLoading(true)
    try {
      // Simulate loading files from blockchain
      // In production, this would query the Move contracts
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock data - replace with actual blockchain queries
      setFiles([
        {
          id: '1',
          name: 'documents',
          type: 'directory',
          path: '/documents',
          size: 0,
          createdAt: Date.now(),
          isDirectory: true,
        },
        {
          id: '2',
          name: 'notes.txt',
          type: 'text/plain',
          path: '/notes.txt',
          size: 1024,
          createdAt: Date.now() - 86400000,
          isDirectory: false,
        },
        {
          id: '3',
          name: 'code.move',
          type: 'text/x-move',
          path: '/code.move',
          size: 2048,
          createdAt: Date.now() - 172800000,
          isDirectory: false,
        },
      ])
    } catch (error) {
      console.error('Error loading files:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFileIcon = (file: FileItem) => {
    if (file.isDirectory) {
      return <Folder className="w-5 h-5 text-neon-cyan" />
    }
    if (file.type.includes('image')) {
      return <ImageIcon className="w-5 h-5 text-neon-purple" />
    }
    if (file.type.includes('move') || file.type.includes('code')) {
      return <Code className="w-5 h-5 text-neon-cyan" />
    }
    return <FileText className="w-5 h-5 text-gray-400" />
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center space-x-2">
          <button className="glass rounded-lg p-2 hover:glow-cyan transition-all">
            <Upload className="w-5 h-5 text-neon-cyan" />
          </button>
          <span className="text-sm text-gray-400">Upload File</span>
        </div>
        <div className="glass rounded-lg px-3 py-1">
          <span className="text-xs text-neon-cyan">{currentPath}</span>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-neon-cyan animate-pulse">Loading files...</div>
          </div>
        ) : (
          <div className="space-y-1">
            {files.map(file => (
              <div
                key={file.id}
                className="glass rounded-lg p-3 flex items-center space-x-3 hover:glow-cyan cursor-pointer transition-all"
                onClick={() => {
                  if (file.isDirectory) {
                    setCurrentPath(file.path)
                  }
                }}
              >
                {getFileIcon(file)}
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{file.name}</div>
                  <div className="text-xs text-gray-400">
                    {formatSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-cyan-500/20 glass rounded-lg px-3 py-2">
        <span className="text-xs text-gray-400">
          {files.length} item{files.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

