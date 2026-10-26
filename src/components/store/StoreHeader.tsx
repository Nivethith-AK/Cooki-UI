import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Funnel, Heart, Cpu, GithubLogo, MagnifyingGlass, Terminal } from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'

export const StoreHeader: React.FC = () => {
  const { favorites, setMobileFilterOpen, showFavoritesOnly, setShowFavoritesOnly, setCommandPaletteOpen, setInstallGuideOpen } = useStore()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 dark:border-white/10 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl transition-colors">
      <div className="mx-auto flex max-w-[1780px] w-full items-center justify-between gap-4 px-4 sm:px-8 xl:px-12 py-3">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (typeof (window as any).__lenis?.scrollTo === 'function') {
                ;(window as any).__lenis.scrollTo(0, { duration: 0.9 })
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            aria-label="Cooki UI home"
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-indigo-600 to-violet-600 shadow-inner">
              <Cpu size={18} weight="bold" className="text-white" />
            </div>
            <span className="font-mono text-sm font-bold tracking-wider text-zinc-900 dark:text-white">
              COOKI UI
            </span>
          </button>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-2">
          
          {/* Terminal CLI & AI Agent MCP Guide */}
          <button
            onClick={() => setInstallGuideOpen(true)}
            aria-label="Terminal installation and AI agent MCP connection guide"
            title="Terminal CLI & AI Agent MCP Setup"
            className="flex h-8 items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-500/15 px-3 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal size={13} weight="bold" />
            <span>CLI & MCP</span>
          </button>

          {/* Quick Search ⌘K Button */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Quick search components"
            className="flex h-8 items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-3 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <MagnifyingGlass size={13} weight="bold" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-1 py-0.2 text-[9px] font-mono text-zinc-500">
              ⌘K
            </kbd>
          </button>

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

          {/* Theme Toggle (Dark / Light) with smooth rotating icon & circular ripple trigger */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle dark/light theme"
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer overflow-hidden shadow-2xs"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                {isDark ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

        </div>

      </div>
    </header>
  )
}
