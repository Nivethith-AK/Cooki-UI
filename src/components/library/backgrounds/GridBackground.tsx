import React from 'react'
import { cn } from '@/lib/utils'

export interface GridBackgroundProps {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  withBeam?: boolean
  className?: string
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  children,
  size = 'md',
  withBeam = true,
  className,
}) => {
  const gridSizeMap = {
    sm: '24px 24px',
    md: '40px 40px',
    lg: '64px 64px',
  }

  return (
    <div className={cn('relative min-h-[300px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070709] p-6', className)}>
      {/* Grid Pattern */}
      <div
        style={{
          backgroundSize: gridSizeMap[size],
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Radial fade mask */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#070709]/50 to-[#070709]" />

      {/* Scanning Beam */}
      {withBeam && (
        <div className="pointer-events-none absolute inset-x-0 h-24 -top-24 animate-[moveDown_8s_linear_infinite] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      )}

      <div className="relative z-10 flex h-full flex-col justify-between">
        {children || (
          <div className="my-auto text-center font-mono">
            <span className="text-xs uppercase tracking-widest text-cyan-400">ENGINEERING GRAPH</span>
            <h3 className="mt-2 text-xl font-bold text-white">Technical Coordinate Grid</h3>
            <p className="mt-1 text-xs text-zinc-400">Fine-lined hardware blueprint grid with scanning telemetry beam.</p>
          </div>
        )}
      </div>
    </div>
  )
}
