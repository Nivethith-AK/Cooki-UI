import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

interface Ripple {
  x: number
  y: number
  size: number
  id: number
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children = 'Ripple Feedback',
  className,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple: Ripple = { x, y, size, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    onClick?.(e)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-zinc-900 px-6 py-3 font-mono text-xs font-semibold text-white shadow-lg transition-transform active:scale-95 focus:outline-none',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
          className="pointer-events-none absolute rounded-full bg-cyan-400/30 animate-[ping_0.6s_ease-out_forwards]"
        />
      ))}
    </button>
  )
}
