import React from 'react'
import { cn } from '@/lib/utils'

export interface AuroraBackgroundProps {
  children?: React.ReactNode
  speed?: 'slow' | 'normal' | 'fast'
  intensity?: 'subtle' | 'medium' | 'high'
  className?: string
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  speed = 'normal',
  intensity = 'medium',
  className,
}) => {
  const speedDurations = {
    slow: '20s',
    normal: '12s',
    fast: '6s',
  }

  const opacityMap = {
    subtle: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-70',
  }

  return (
    <div className={cn('relative min-h-[300px] w-full overflow-hidden rounded-3xl bg-[#050505] p-6', className)}>
      {/* Aurora Atmospheric Waves */}
      <div
        style={{ animationDuration: speedDurations[speed] }}
        className={cn(
          'pointer-events-none absolute -inset-[100%] animate-[spin_16s_linear_infinite] blur-3xl',
          opacityMap[intensity]
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-600/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        {children || (
          <div className="my-auto text-center font-mono">
            <span className="text-xs uppercase tracking-widest text-emerald-400">ATMOSPHERIC RUNTIME</span>
            <h3 className="mt-2 text-xl font-bold text-white">Aurora Fluid Plasma</h3>
            <p className="mt-1 text-xs text-zinc-400">Slow-moving ambient background gradient with GPU transform isolation.</p>
          </div>
        )}
      </div>
    </div>
  )
}
