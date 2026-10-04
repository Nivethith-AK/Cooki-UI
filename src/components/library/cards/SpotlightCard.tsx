import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SpotlightCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  spotlightColor?: string
  className?: string
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title = 'SMT Formal Invariant Engine',
  description = 'Solves symbolic execution constraints and proves deadlock freedom with mathematical certainty before emission.',
  icon,
  spotlightColor = 'rgba(56, 189, 248, 0.15)',
  className,
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white transition-colors hover:border-white/20',
        className
      )}
    >
      {/* Radial Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        {icon && <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white">{icon}</div>}
        <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
        <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>Interactive Cursor Glow</span>
        </div>
      </div>
    </div>
  )
}
