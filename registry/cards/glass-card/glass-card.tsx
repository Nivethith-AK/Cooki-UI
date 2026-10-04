import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlassCardProps {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  title = 'Hermetic WASM Isolate',
  subtitle = 'MEMORY PROTECTION RING-0',
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/20',
        className
      )}
    >
      <div className="relative rounded-[calc(2rem-0.375rem)] border border-white/5 bg-zinc-950/70 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <span className="font-mono text-[10px] tracking-wider text-zinc-600 dark:text-zinc-400">{subtitle}</span>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
        </div>

        <h4 className="mt-3 text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{title}</h4>
        
        <div className="mt-2 text-xs text-zinc-300">
          {children || 'Air-gapped execution blocks outbound socket leaks while monitoring CPU allocation quotas.'}
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px] text-zinc-500">
          <span>Glass Filter: blur(24px)</span>
          <span className="text-emerald-400">Isolated</span>
        </div>
      </div>
    </div>
  )
}
