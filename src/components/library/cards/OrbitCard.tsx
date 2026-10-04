import React from 'react'
import { Cpu, Lightning, ShieldCheck, Terminal, Database, Code } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface OrbitCardProps {
  className?: string
}

export const OrbitCard: React.FC<OrbitCardProps> = ({ className }) => {
  return (
    <div className={cn('relative flex h-72 w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl', className)}>
      {/* Concentric Orbit Rings */}
      <div className="absolute h-48 w-48 rounded-full border border-dashed border-white/10" />
      <div className="absolute h-32 w-32 rounded-full border border-white/10" />

      {/* Center Core Node */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-800 to-zinc-950 text-white shadow-2xl">
        <Cpu size={26} weight="bold" className="text-emerald-400" />
      </div>

      {/* Orbiting Satellites (CSS Animation) */}
      <div className="pointer-events-none absolute h-48 w-48 animate-[spin_12s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-cyan-400 shadow-md">
          <Lightning size={16} weight="fill" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-amber-400 shadow-md">
          <ShieldCheck size={16} weight="fill" />
        </div>
      </div>

      <div className="pointer-events-none absolute h-32 w-32 animate-[spin_8s_linear_infinite_reverse]">
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-purple-400 shadow-md">
          <Terminal size={14} weight="bold" />
        </div>
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-blue-400 shadow-md">
          <Database size={14} weight="fill" />
        </div>
      </div>

      <div className="absolute bottom-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
        CONCENTRIC ORBIT NETWORK
      </div>
    </div>
  )
}
