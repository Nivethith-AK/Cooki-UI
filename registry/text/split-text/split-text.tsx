import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SplitTextProps {
  text?: string
  className?: string
}

export const SplitText: React.FC<SplitTextProps> = ({
  text = 'KINETIC INTENT COMPILER',
  className,
}) => {
  const characters = text.split('')

  return (
    <div className={cn('inline-flex flex-wrap overflow-hidden font-mono tracking-widest', className)}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block cursor-default select-none text-zinc-100"
          whileHover={{
            y: -6,
            color: '#38bdf8',
            scale: 1.15,
            transition: { type: 'spring', stiffness: 350, damping: 10 },
          }}
          transition={{ duration: 0.15 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}
