import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlass, Terminal, ArrowRight, Code, ShieldCheck, Lightning } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface CommandPaletteProps {
  className?: string
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ className }) => {
  const [query, setQuery] = useState('')

  const commands = [
    { label: 'Generate Raft State Machine', cat: 'Synthesis', icon: <Terminal size={14} /> },
    { label: 'Run Z3 Formal Verification', cat: 'Audit', icon: <ShieldCheck size={14} /> },
    { label: 'Build Hermetic WASM Container', cat: 'Compiler', icon: <Code size={14} /> },
    { label: 'Profile SIMD Execution Matrix', cat: 'Hardware', icon: <Lightning size={14} /> },
  ]

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className={cn('w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 p-3 shadow-2xl text-white font-sans', className)}>
      <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-zinc-900/80 px-3.5 py-2.5">
        <MagnifyingGlass size={16} className="text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search AST..."
          className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
        />
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">ESC</span>
      </div>

      <div className="mt-2 space-y-1">
        {filtered.map((cmd) => (
          <button
            key={cmd.label}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors group text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors">{cmd.icon}</span>
              <span>{cmd.label}</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 group-hover:text-zinc-300">{cmd.cat}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
