import React from 'react'
import { Cpu, Terminal, ShieldCheck, Database, GitBranch, Code, Lightning, Globe } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface SlidingLogoMarqueeProps {
  className?: string
}

export const SlidingLogoMarquee: React.FC<SlidingLogoMarqueeProps> = ({ className }) => {
  const items = [
    { name: 'Next.js 15', icon: <Cpu size={15} /> },
    { name: 'React 19', icon: <Code size={15} /> },
    { name: 'Tailwind CSS v4', icon: <Lightning size={15} /> },
    { name: 'TypeScript 5.7', icon: <ShieldCheck size={15} /> },
    { name: 'Framer Motion', icon: <Globe size={15} /> },
    { name: 'Vite 6', icon: <GitBranch size={15} /> },
    { name: 'Astro', icon: <Terminal size={15} /> },
    { name: 'Remix', icon: <Database size={15} /> },
  ]

  return (
    <div className={cn('relative w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md py-2.5', className)}>
      {/* Gradient edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max gap-3 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-white/25 transition-colors cursor-pointer select-none"
          >
            <span className="text-indigo-500 dark:text-emerald-400">{item.icon}</span>
            <span className="font-semibold">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
