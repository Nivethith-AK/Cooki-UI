import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GradientShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

export const GradientShimmerButton: React.FC<GradientShimmerButtonProps> = ({
  children = 'Shimmer Action',
  size = 'md',
  speed = 'normal',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base font-semibold',
  }

  const duration = speed === 'slow' ? 6 : speed === 'fast' ? 2 : 4

  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] font-medium transition-all active:scale-95 focus:outline-none',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Animated Rotating Gradient Border */}
      <span
        style={{ animationDuration: `${duration}s` }}
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a855f7_50%,#3b82f6_100%)] opacity-70 group-hover:opacity-100 transition-opacity"
      />

      {/* Button Interior */}
      <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-zinc-950 px-6 py-2 text-white backdrop-blur-3xl transition-colors group-hover:bg-zinc-900/90 gap-2">
        {children}
      </span>
    </button>
  )
}
