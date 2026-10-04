import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface InteractiveTiltCardProps {
  title?: string
  subtitle?: string
  description?: string
  badge?: string
  className?: string
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  title = 'Autonomous Synthesis Pod',
  subtitle = 'ISOLATE MEMORY #44',
  description = 'Coordinates AST transformations and sandboxed WASM test suites without side effects.',
  badge = 'ACTIVE',
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: '1000px' }} className={cn('w-full max-w-sm', className)}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-white shadow-2xl transition-shadow hover:shadow-cyan-500/10"
      >
        <div style={{ transform: 'translateZ(30px)' }} className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">{subtitle}</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/30">
            {badge}
          </span>
        </div>

        <div style={{ transform: 'translateZ(40px)' }} className="mt-4">
          <h4 className="text-lg font-bold text-white tracking-tight">{title}</h4>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{description}</p>
        </div>

        <div style={{ transform: 'translateZ(25px)' }} className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-zinc-500">
          <span>Latency: 12ms</span>
          <span>Zero-Copy DAG</span>
        </div>

        {/* Specular Glare Reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity hover:opacity-100" />
      </motion.div>
    </div>
  )
}
