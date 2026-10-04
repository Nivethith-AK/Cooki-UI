import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface AsciiWaveProps {
  className?: string
  rows?: number
  cols?: number
}

export const AsciiWave: React.FC<AsciiWaveProps> = ({
  className,
  rows = 14,
  cols = 38,
}) => {
  const [output, setOutput] = useState<string[]>([])
  const frameRef = useRef(0)
  const mousePos = useRef({ x: 19, y: 7 })

  const chars = ' .:-=+*#%@'

  useEffect(() => {
    let animId: number

    const render = () => {
      frameRef.current += 0.05
      const lines: string[] = []

      for (let y = 0; y < rows; y++) {
        let line = ''
        for (let x = 0; x < cols; x++) {
          const dx = x - mousePos.current.x
          const dy = y - mousePos.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          // Wave equation
          const wave1 = Math.sin(x * 0.2 + frameRef.current)
          const wave2 = Math.cos(y * 0.3 + frameRef.current * 0.8)
          const ripple = Math.sin(dist * 0.5 - frameRef.current * 2) * 0.4
          
          const val = (wave1 + wave2 + ripple + 2) / 4
          const charIdx = Math.floor(Math.max(0, Math.min(1, val)) * (chars.length - 1))
          line += chars[charIdx]
        }
        lines.push(line)
      }

      setOutput(lines)
      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [rows, cols])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * cols)
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * rows)
    mousePos.current = { x, y }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-[#060608] p-6 font-mono text-[10px] leading-[11px] text-emerald-400 select-none shadow-2xl flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[9px] text-zinc-500 uppercase tracking-widest">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>ASCII WAVE GENERATOR</span>
      </div>

      <pre className="tracking-widest whitespace-pre overflow-hidden text-emerald-400/90 font-mono">
        {output.join('\n')}
      </pre>

      <div className="mt-3 text-[10px] text-zinc-500 font-mono">
        Interactive fluid simulation &bull; Hover to disturb
      </div>
    </div>
  )
}
