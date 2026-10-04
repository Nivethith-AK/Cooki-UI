import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TextRevealProps {
  text?: string
  delay?: number
  className?: string
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text = 'Deterministic Software Synthesis Engine',
  delay = 0,
  className,
}) => {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i + delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className={cn('flex flex-wrap gap-x-2 gap-y-1 font-bold text-white', className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
