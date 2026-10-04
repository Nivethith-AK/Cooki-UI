import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface TypingTextProps {
  words?: string[]
  speed?: number
  delay?: number
  className?: string
}

export const TypingText: React.FC<TypingTextProps> = ({
  words = ['Synthesizing Raft Cluster...', 'Proving Invariant Logic...', 'Emitting WASM Bytecode...', 'Zero Hallucinations.'],
  speed = 80,
  delay = 1500,
  className,
}) => {
  const [wordIndex, setWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullWord = words[wordIndex % words.length]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullWord.substring(0, currentText.length + 1))
          if (currentText === fullWord) {
            setTimeout(() => setIsDeleting(true), delay)
          }
        } else {
          setCurrentText(fullWord.substring(0, currentText.length - 1))
          if (currentText === '') {
            setIsDeleting(false)
            setWordIndex((prev) => prev + 1)
          }
        }
      },
      isDeleting ? speed / 2 : speed
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, wordIndex, words, speed, delay])

  return (
    <div className={cn('inline-flex items-center font-mono text-zinc-900 dark:text-white', className)}>
      <span>{currentText}</span>
      <span className="ml-1 inline-block h-4 w-2 bg-emerald-400 animate-[pulse_0.8s_ease-in-out_infinite]" />
    </div>
  )
}
