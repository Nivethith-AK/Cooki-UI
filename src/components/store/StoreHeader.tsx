import React from 'react'
import { MagnifyingGlass, Sun, Moon, Funnel, Heart, Cpu, GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'

export const StoreHeader: React.FC = () => {
  const { searchQuery, setSearchQuery, favorites, setMobileFilterOpen, showFavoritesOnly, setShowFavoritesOnly } = useStore()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 dark:border-white/10 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-indigo-600 to-violet-600 shadow-inner">
              <Cpu size={18} weight="bold" className="text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-zinc-900 dark:text-white">
                <span>COOKI UI</span>
                <span className="rounded bg-indigo-500/15 dark:bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-medium text-indigo-600 dark:text-indigo-300 border border-indigo-500/25 dark:border-indigo-500/30">
                  REGISTRY
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
              placeholder="Search components, animations, backgrounds..."
              className="w-full rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/70 py-1.5 pl-9 pr-8 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 font-sans transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
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
            className="flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-3 text-xs text-zinc-700 dark:text-zinc-300 lg:hidden hover:bg-zinc-200 dark:hover:bg-white/10 cursor-pointer transition-colors"
          >
            <Funnel size={14} />
            <span>Filters</span>
          </button>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/Nivethith-AK/Cooki-UI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-3 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <GithubLogo size={14} weight="fill" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Favorites Button */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-mono transition-colors cursor-pointer ${
              showFavoritesOnly
                ? 'border-rose-500/50 bg-rose-500/20 text-rose-500 dark:text-rose-300'
                : 'border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            <Heart size={14} weight={favorites.length > 0 ? 'fill' : 'regular'} className={favorites.length > 0 ? 'text-rose-500' : ''} />
            <span>{favorites.length}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
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
            className="w-full rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 py-1.5 pl-9 pr-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>
    </header>
  )
}
