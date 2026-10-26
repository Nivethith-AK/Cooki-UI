import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface BlurRevealProps {
  children?: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children = 'Hermetic Bit-Reproducible Kernel Verification',
  delay = 0,
  duration = 0.8,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn('text-zinc-900 dark:text-zinc-100 font-bold', className)}
    >
      {children}
    </motion.div>
  )
}
