import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface SlideToConfirmProps {
  label?: string
  confirmedLabel?: string
  onConfirm?: () => void
  className?: string
}

export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({
  label = 'Slide to Deploy Kernel',
  confirmedLabel = 'Kernel Deployed',
  onConfirm,
  className,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxDrag, setMaxDrag] = useState(240)
  const x = useMotionValue(0)

  useEffect(() => {
    const updateBounds = () => {
      if (trackRef.current) {
        setMaxDrag(Math.max(60, trackRef.current.offsetWidth - 56))
      }
    }
    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  const handleDragEnd = () => {
    if (!trackRef.current) return
    if (x.get() >= maxDrag * 0.8) {
      setIsConfirmed(true)
      onConfirm?.()
    } else {
      x.set(0)
    }
  }

  const handleReset = () => {
    setIsConfirmed(false)
    x.set(0)
  }

  return (
    <div className={cn('w-full max-w-sm', className)}>
      <div
        ref={trackRef}
        className={`relative flex h-14 w-full items-center justify-between rounded-full border p-1.5 transition-colors select-none ${
          isConfirmed
            ? 'border-emerald-500/40 bg-emerald-950/40'
            : 'border-white/15 bg-zinc-950 shadow-inner'
        }`}
      >
        {/* Track Label */}
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold text-zinc-400 pointer-events-none">
          {isConfirmed ? (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Check size={16} weight="bold" />
              <span>{confirmedLabel}</span>
            </span>
          ) : (
            <span className="animate-pulse">{label}</span>
          )}
        </div>

        {/* Draggable Thumb */}
        {!isConfirmed ? (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0.05}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="relative z-10 flex h-11 w-11 cursor-grab active:cursor-grabbing items-center justify-center rounded-full bg-white text-zinc-950 shadow-xl transition-shadow hover:shadow-cyan-500/20"
          >
            <ArrowRight size={18} weight="bold" />
          </motion.div>
        ) : (
          <button
            onClick={handleReset}
            className="relative z-10 ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            title="Click to reset"
          >
            <Check size={18} weight="bold" />
          </button>
        )}
      </div>
    </div>
  )
}
