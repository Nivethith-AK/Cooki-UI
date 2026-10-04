import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant?: 'default' | 'glow' | 'minimal' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  distance?: number
  className?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children = 'Magnetic Action',
  variant = 'default',
  size = 'md',
  distance = 60,
  className,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.4
    const deltaY = (e.clientY - centerY) * 0.4
    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-full gap-1.5',
    md: 'px-6 py-3 text-sm rounded-full gap-2',
    lg: 'px-8 py-4 text-base rounded-full gap-3 font-semibold',
  }

  const variantStyles = {
    default: 'bg-zinc-900 text-white border border-white/15 hover:border-white/30 dark:bg-zinc-100 dark:text-zinc-950 shadow-md',
    glow: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border-0 hover:shadow-cyan-500/40',
    minimal: 'bg-white/10 text-zinc-200 border border-white/10 hover:bg-white/15 dark:bg-black/40',
    ghost: 'bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent',
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...(props as any)}
    >
      <motion.span
        style={{ x: useTransform(springX, (val) => val * 0.3), y: useTransform(springY, (val) => val * 0.3) }}
        className="flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  )
}
