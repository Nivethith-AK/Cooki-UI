import React from 'react'
import { MagnifyingGlass, Sun, Moon, Funnel, Heart, Cpu, Sparkle } from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'

export const StoreHeader: React.FC = () => {
  const { searchQuery, setSearchQuery, favorites, setMobileFilterOpen, showFavoritesOnly, setShowFavoritesOnly } = useStore()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 dark:border-white/10 border-zinc-200 bg-zinc-950/85 dark:bg-zinc-950/85 bg-white/85 backdrop-blur-2xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner">
              <Cpu size={18} weight="bold" className="text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-white dark:text-white text-zinc-900">
                <span>COOK</span>
                <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-medium text-emerald-400 border border-emerald-500/30">
                  STORE
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Real-time Global Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <MagnifyingGlass size={15} className="absolute left-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 22+ components, animations, backgrounds..."
              className="w-full rounded-full border border-white/10 dark:border-white/10 border-zinc-200 bg-zinc-900/70 dark:bg-zinc-900/70 bg-zinc-100 py-1.5 pl-9 pr-8 text-xs text-zinc-100 dark:text-zinc-100 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/30 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[10px] font-mono text-zinc-400 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-2">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-zinc-300 lg:hidden hover:bg-white/10"
          >
            <Funnel size={14} />
            <span>Filters</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-mono transition-colors ${
              showFavoritesOnly
                ? 'border-rose-500/50 bg-rose-500/20 text-rose-300'
                : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart size={14} weight={favorites.length > 0 ? 'fill' : 'regular'} className={favorites.length > 0 ? 'text-rose-400' : ''} />
            <span>{favorites.length}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative flex items-center">
          <MagnifyingGlass size={15} className="absolute left-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components, tags, frameworks..."
            className="w-full rounded-full border border-white/10 bg-zinc-900 py-1.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>
    </header>
  )
}
