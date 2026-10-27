import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, Cpu } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface InteractiveLensProps {
  children?: React.ReactNode
  zoomFactor?: number
  lensSize?: number
  isStatic?: boolean
  className?: string
}

export const InteractiveLens: React.FC<InteractiveLensProps> = ({
  children,
  zoomFactor = 1.6,
  lensSize = 160,
  isStatic = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 140, y: 120 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const defaultChild = (
    <div className="relative p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 select-none overflow-hidden max-w-[340px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-500">
              <Cpu size={18} weight="bold" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-mono">
                QUANTUM_CORE_V4
              </h4>
              <p className="text-[10px] text-zinc-500 font-mono">ADDR: 0x7FFD382A</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            OPTIMIZED
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200/80 dark:border-white/5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400 space-y-1">
          <div className="flex justify-between">
            <span>PIPELINE_STATUS:</span>
            <span className="text-indigo-500 dark:text-cyan-400 font-bold">READY</span>
          </div>
          <div className="flex justify-between">
            <span>INSTRUCTION_CACHE:</span>
            <span className="text-zinc-900 dark:text-zinc-200">512 KB L1</span>
          </div>
          <div className="flex justify-between">
            <span>EXECUTION_CYCLE:</span>
            <span className="text-zinc-900 dark:text-zinc-200">0.24 ns</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Hover to inspect silicon substrate</span>
          <MagnifyingGlass size={12} className="text-zinc-400" />
        </div>
      </div>
    </div>
  )

  const content = children || defaultChild

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className={cn('relative inline-block isolate cursor-crosshair overflow-hidden rounded-2xl', className)}
    >
      <div className="relative z-0">{content}</div>

      <AnimatePresence>
        {(isHovering || isStatic) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: mousePos.x - lensSize / 2,
              top: mousePos.y - lensSize / 2,
              width: lensSize,
              height: lensSize,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 30,
            }}
            className="overflow-hidden border-2 border-indigo-500/80 shadow-[0_0_24px_rgba(99,102,241,0.4)] backdrop-blur-xs"
          >
            <div
              style={{
                position: 'absolute',
                left: -(mousePos.x * zoomFactor - lensSize / 2),
                top: -(mousePos.y * zoomFactor - lensSize / 2),
                transform: `scale(${zoomFactor})`,
                transformOrigin: 'top left',
                width: containerRef.current?.offsetWidth || 'auto',
                height: containerRef.current?.offsetHeight || 'auto',
              }}
            >
              {content}
            </div>

            <div className="absolute inset-0 pointer-events-none rounded-full ring-1 ring-inset ring-white/20 bg-gradient-to-tr from-indigo-500/10 via-transparent to-white/20" />
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-indigo-500/30 -translate-y-1/2 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-indigo-500/30 -translate-x-1/2 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InteractiveLens
