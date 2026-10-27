import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Terminal, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CodeHoverCardData {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  tag?: string
}

export interface CodeHoverCardsProps {
  cards?: CodeHoverCardData[]
  className?: string
  maskRadius?: number
  characterCount?: number
  characterSet?: string
  columns?: 1 | 2 | 3
}

const DEFAULT_CARDS: CodeHoverCardData[] = [
  {
    id: 'runtime',
    icon: Terminal,
    title: 'CLI Orchestrator',
    description: 'Dynamic terminal code generator with instant AST dependency resolving.',
    tag: 'SYSTEM',
  },
  {
    id: 'shaders',
    icon: Cpu,
    title: 'GLSL Quantum Shader',
    description: 'Hardware-accelerated fragment pipelines compiling at 60 FPS in browser.',
    tag: 'WEBGL',
  },
  {
    id: 'crypto',
    icon: ShieldCheck,
    title: 'Zero-Lockin Core',
    description: 'Isolated copy-paste TSX tree with zero proprietary runtime telemetry.',
    tag: 'SECURE',
  },
]

export const CodeHoverCards: React.FC<CodeHoverCardsProps> = ({
  cards = DEFAULT_CARDS,
  className,
  maskRadius = 260,
  characterCount = 1400,
  characterSet = '01010101abcdefABCDEF$#@{}[]()<>/*+=~',
  columns = 3,
}) => {
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({})
  const [randomTexts, setRandomTexts] = useState<{ [key: string]: string }>({})
  const [activeCards, setActiveCards] = useState<{ [key: string]: boolean }>({})
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const generateRandomString = (length: number): string => {
    return Array.from({ length }, () => characterSet[Math.floor(Math.random() * characterSet.length)]).join('')
  }

  const handleMouseMove = (e: React.MouseEvent, cardId: string) => {
    const card = cardRefs.current[cardId]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePositions((prev) => ({ ...prev, [cardId]: { x, y } }))
    setActiveCards((prev) => ({ ...prev, [cardId]: true }))
    setRandomTexts((prev) => ({ ...prev, [cardId]: generateRandomString(characterCount) }))
  }

  const handleMouseLeave = (cardId: string) => {
    setActiveCards((prev) => ({ ...prev, [cardId]: false }))
  }

  return (
    <div
      className={cn(
        'w-full grid gap-4 items-stretch',
        columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3',
        className
      )}
    >
      {cards.map((card) => {
        const IconComponent = card.icon
        const pos = mousePositions[card.id] || { x: 0, y: 0 }
        const isActive = activeCards[card.id]
        const text = randomTexts[card.id] || generateRandomString(characterCount)

        return (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[card.id] = el
            }}
            onMouseMove={(e) => handleMouseMove(e, card.id)}
            onMouseLeave={() => handleMouseLeave(card.id)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-zinc-950 p-5 shadow-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/25 hover:shadow-xl cursor-pointer"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden font-mono text-[9px] leading-[11px] tracking-widest text-indigo-500/80 dark:text-cyan-400/90 transition-opacity duration-200 break-all"
              style={{
                opacity: isActive ? 1 : 0,
                WebkitMaskImage: `radial-gradient(${maskRadius}px circle at ${pos.x}px ${pos.y}px, black 30%, transparent 80%)`,
                maskImage: `radial-gradient(${maskRadius}px circle at ${pos.x}px ${pos.y}px, black 30%, transparent 80%)`,
              }}
            >
              {text}
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                opacity: isActive ? 0.35 : 0,
                background: `radial-gradient(${maskRadius * 0.75}px circle at ${pos.x}px ${pos.y}px, rgba(99, 102, 241, 0.25), transparent 70%)`,
              }}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 text-zinc-900 dark:text-white group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <IconComponent className="h-5 w-5" />
              </div>
              {card.tag && (
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
                  {card.tag}
                </span>
              )}
            </div>

            <div className="relative z-10 mt-6 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                  {card.title}
                </h4>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CodeHoverCards
