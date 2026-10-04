import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface DotBackgroundProps {
  children?: React.ReactNode
  spacing?: number
  className?: string
}

export const DotBackground: React.FC<DotBackgroundProps> = ({
  children,
  spacing = 24,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn('relative min-h-[300px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#060608] p-6', className)}
    >
      {/* Base Dot Grid */}
      <div
        style={{
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Interactive Cursor Proximity Highlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-150"
        style={{
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.2), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {children || (
          <div className="my-auto text-center font-mono">
            <span className="text-xs uppercase tracking-widest text-emerald-400">PARTICLE MATRIX</span>
            <h3 className="mt-2 text-xl font-bold text-white">Interactive Dot Grid</h3>
            <p className="mt-1 text-xs text-zinc-400">Move cursor to illuminate local coordinate field.</p>
          </div>
        )}
      </div>
    </div>
  )
}
