import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlass, 
  X, 
  Browsers, 
  PaintBrush, 
  Waveform, 
  Code, 
  SquaresFour,
  Sparkle
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { ComponentCategory } from '../../types/component'
import { ALL_REGISTRY_ITEMS } from '../../registry'

export const StoreHero: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    filteredComponents,
    setShowFavoritesOnly,
    showFavoritesOnly
  } = useStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const categories: { id: ComponentCategory | 'all'; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Artifacts', count: ALL_REGISTRY_ITEMS.length, icon: <SquaresFour size={14} /> },
    { id: 'components', label: 'Components', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'components').length, icon: <Browsers size={14} /> },
    { id: 'animations', label: 'Motion & 3D', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'animations').length, icon: <Waveform size={14} /> },
    { id: 'backgrounds', label: 'Backgrounds', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'backgrounds').length, icon: <PaintBrush size={14} /> },
    { id: 'sections', label: 'UI Sections', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'sections').length, icon: <Code size={14} /> },
  ]

  // Listen for '/' key to quickly focus the search bar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section className="relative overflow-hidden pt-6 pb-6 border-b border-zinc-200/80 dark:border-white/5 bg-gradient-to-b from-transparent via-zinc-100/30 dark:via-white/[0.01] to-transparent">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-lines opacity-10" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[180px] w-[500px] rounded-full bg-indigo-500/5 blur-3xl -z-10" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Compact, Clean Eyebrow Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-zinc-900 dark:text-zinc-200">
              Cooki UI Registry &bull; <span className="text-indigo-600 dark:text-indigo-400 font-bold">{ALL_REGISTRY_ITEMS.length} Verified Artifacts</span>
            </h1>
          </div>
          <div className="text-[11px] font-mono text-zinc-500 hidden sm:flex items-center gap-2">
            <span>Zero-Backend &bull; Source-First &bull; MIT Licensed</span>
          </div>
        </div>

        {/* Central Prominent Command Search Bar */}
        <div className="relative group">
          <div className="relative flex items-center rounded-2xl border border-zinc-300 dark:border-white/15 bg-white/95 dark:bg-zinc-900/90 shadow-md dark:shadow-xl dark:shadow-black/50 backdrop-blur-xl transition-all focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <div className="pl-4 pr-2 text-zinc-400 flex items-center justify-center">
              <MagnifyingGlass size={18} weight="bold" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 70 components, backgrounds, shaders, or tags (e.g. 'dock', '3d', 'pricing', 'otp')..."
              className="w-full bg-transparent py-3 pr-24 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-sans"
            />
            
            {/* Right badges & controls inside search bar */}
            <div className="absolute right-3 flex items-center gap-2">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={12} />
                  <span>Clear</span>
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 shadow-2xs">
                  /
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Chips directly attached under the search bar */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id && !showFavoritesOnly
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setShowFavoritesOnly(false)
                  setSelectedCategory(cat.id)
                }}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs scale-[1.02]'
                    : 'border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                  isActive 
                    ? 'bg-white/20 dark:bg-zinc-900/20 text-white dark:text-zinc-950' 
                    : 'bg-zinc-100 dark:bg-white/5 text-zinc-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
