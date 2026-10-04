import React, { useState } from 'react'
import { Terminal, Copy, Check, Play, CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface InteractiveTerminalBlockProps {
  className?: string
}

export const InteractiveTerminalBlock: React.FC<InteractiveTerminalBlockProps> = ({ className }) => {
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [outputLines, setOutputLines] = useState<string[]>([
    'Initializing COOK Runtime v2.4...',
    'Verified memory bounds in isolate #0',
    'Compilation successful in 42ms.',
  ])

  const runCode = () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutputLines((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Emitted 14 verified WASM blocks.`,
      ])
      setIsRunning(false)
    }, 600)
  }

  const copy = () => {
    navigator.clipboard.writeText('cook synthesize --spec=cluster.spec')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('w-full max-w-xl rounded-3xl border border-white/15 bg-black/90 p-5 font-mono text-xs text-white shadow-2xl', className)}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-zinc-700" />
          <span className="h-3 w-3 rounded-full bg-zinc-700" />
          <span className="h-3 w-3 rounded-full bg-zinc-700" />
          <span className="ml-2 text-zinc-400">cook-terminal</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={copy} className="text-zinc-400 hover:text-white transition-colors">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
          >
            <Play size={11} weight="fill" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 text-zinc-300">
        <div className="flex gap-2 text-emerald-400">
          <span>$</span>
          <span className="text-white">cook synthesize --spec=cluster.spec</span>
        </div>
        {outputLines.map((line, idx) => (
          <div key={idx} className="text-zinc-400 pl-4 border-l border-white/10">
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
