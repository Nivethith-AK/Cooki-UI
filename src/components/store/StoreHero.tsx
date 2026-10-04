import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Code, Sparkle, PaintBrush, Browsers, Terminal, Cpu } from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { ComponentCategory } from '../../types/component'

import { ALL_REGISTRY_ITEMS } from '../../registry'

export const StoreHero: React.FC = () => {
  const { setSelectedCategory, selectedCategory } = useStore()

  const shortcuts: { cat: ComponentCategory; label: string; icon: React.ReactNode }[] = [
    { cat: 'components', label: 'Components (520+)', icon: <Browsers size={15} /> },
    { cat: 'backgrounds', label: 'Backgrounds (500+)', icon: <PaintBrush size={15} /> },
    { cat: 'animations', label: 'Animations', icon: <Sparkle size={15} /> },
    { cat: 'sections', label: 'UI Sections', icon: <Code size={15} /> },
  ]

  const scrollToGrid = () => {
    document.getElementById('component-catalogue')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-14 border-b border-white/5">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-lines opacity-15" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[650px] rounded-full bg-cyan-500/5 blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 dark:border-white/10 border-zinc-200 bg-white/5 dark:bg-white/5 bg-zinc-100 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>520+ COMPONENTS &bull; 500+ BACKGROUNDS &bull; {ALL_REGISTRY_ITEMS.length} LIVE ARTIFACTS</span>
        </div>

        {/* Headline */}
        <h1 className="mt-5 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white dark:text-white text-zinc-900 leading-[1.1]">
          Premium components for <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            modern web interfaces.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-base text-zinc-400 dark:text-zinc-400 text-zinc-600 leading-relaxed">
          Explore real, interactive UI components, physics-driven animations, technical shaders, and production sections. Inspect live previews, customize parameters in the playground, and copy verified code for React, Vite, and Next.js.
        </p>

        {/* Category Shortcuts */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {shortcuts.map((sc) => {
            const isActive = selectedCategory === sc.cat
            return (
              <button
                key={sc.cat}
                onClick={() => {
                  setSelectedCategory(sc.cat)
                  scrollToGrid()
                }}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'border-white bg-white text-zinc-950 font-semibold shadow-md'
                    : 'border-white/10 dark:border-white/10 border-zinc-200 bg-zinc-900/60 dark:bg-zinc-900/60 bg-white text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:border-white/25 hover:bg-white/10'
                }`}
              >
                <span>{sc.icon}</span>
                <span>{sc.label}</span>
              </button>
            )
          })}

          <button
            onClick={scrollToGrid}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>Browse All</span>
            <ArrowDown size={12} />
          </button>
        </div>

      </div>
    </section>
  )
}
