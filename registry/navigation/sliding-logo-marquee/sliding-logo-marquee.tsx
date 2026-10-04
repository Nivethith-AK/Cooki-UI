import React from 'react'
import { Cpu, Terminal, ShieldCheck, Database, GitBranch, Code, Lightning, Globe } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface SlidingLogoMarqueeProps {
  className?: string
}

export const SlidingLogoMarquee: React.FC<SlidingLogoMarqueeProps> = ({ className }) => {
  const items = [
    { name: 'WASM Isolate', icon: <Cpu size={16} /> },
    { name: 'Raft Quorum', icon: <Database size={16} /> },
    { name: 'Formal Z3', icon: <ShieldCheck size={16} /> },
    { name: 'Deterministic AST', icon: <Code size={16} /> },
    { name: 'Zero-IPC Ring', icon: <Lightning size={16} /> },
    { name: 'Git Trunk Merge', icon: <GitBranch size={16} /> },
    { name: 'Edge Mesh', icon: <Globe size={16} /> },
    { name: 'CLI Runtime', icon: <Terminal size={16} /> },
  ]

  return (
    <div className={cn('relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 py-3', className)}>
      {/* Gradient edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max gap-4 animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer select-none"
          >
            <span className="text-emerald-400">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
