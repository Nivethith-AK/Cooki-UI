import React from 'react'
import { cn } from '@/lib/utils'

export interface AnimatedMeshBackgroundProps {
  children?: React.ReactNode
  variant?: 'cyber' | 'sunset' | 'deep'
  className?: string
}

export const AnimatedMeshBackground: React.FC<AnimatedMeshBackgroundProps> = ({
  children,
  variant = 'deep',
  className,
}) => {
  const gradientPresets = {
    cyber: 'from-cyan-900/40 via-purple-900/30 to-blue-900/40',
    sunset: 'from-amber-900/40 via-rose-900/30 to-purple-900/40',
    deep: 'from-emerald-950/40 via-zinc-900/50 to-blue-950/40',
  }

  return (
    <div className={cn('relative min-h-[300px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-6', className)}>
      {/* Multilayer Mesh Orbs */}
      <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-tr blur-3xl opacity-60', gradientPresets[variant])} />
      
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {children || (
          <div className="my-auto text-center font-mono">
            <span className="text-xs uppercase tracking-widest text-purple-400">ORGANIC SHADERS</span>
            <h3 className="mt-2 text-xl font-bold text-white">Animated Mesh Canvas</h3>
            <p className="mt-1 text-xs text-zinc-400">Layered radial diffusion mesh with organic frequency modulation.</p>
          </div>
        )}
      </div>
    </div>
  )
}
