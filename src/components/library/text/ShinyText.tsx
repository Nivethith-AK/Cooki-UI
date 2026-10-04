import React from 'react'
import { cn } from '@/lib/utils'

export interface ShinyTextProps {
  text?: string
  speed?: number
  className?: string
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text = 'AUTONOMOUS REPRODUCIBILITY VERIFIED',
  speed = 3,
  className,
}) => {
  return (
    <span
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.2) 100%)',
        backgroundSize: '200% 100%',
        animation: `shinyShimmer ${speed}s linear infinite`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      className={cn('inline-block font-mono font-bold tracking-wider', className)}
    >
      {text}
    </span>
  )
}
