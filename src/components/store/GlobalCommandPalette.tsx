import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlass,
  X,
  Browsers,
  Cursor,
  Rows,
  Sliders,
  Database,
  Waveform,
  PaintBrush,
  Code,
  Heart,
  Sun,
  Moon,
  ArrowRight,
  Terminal,
  Check,
  Command
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'
import { RegistryItem, ComponentCategory } from '../../types/component'
import { scrollToCatalogue } from '../../utils/scroll'

export const GlobalCommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    components,
    setSelectedComponent,
    setSelectedCategory,
    setShowFavoritesOnly,
    favorites,
  } = useStore()

  const { isDark, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedCmd, setCopiedCmd] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus input and lock background scroll when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)

      const prevBody = document.body.style.overflow
      const prevHtml = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      if (typeof (window as any).__lenis?.stop === 'function') {
        ;(window as any).__lenis.stop()
      }

      return () => {
        document.body.style.overflow = prevBody
        document.documentElement.style.overflow = prevHtml
        if (typeof (window as any).__lenis?.start === 'function') {
          ;(window as any).__lenis.start()
        }
      }
    }
  }, [commandPaletteOpen])

  // Filter components
  const filteredComponents = React.useMemo(() => {
    if (!query.trim()) {
      // Default to featured and popular
      return components.slice(0, 12)
    }
    const q = query.toLowerCase().trim()
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.subcategory.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    ).slice(0, 20)
  }, [components, query])

  // Category quick links
  const categoryShortcuts: { id: ComponentCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'components', label: 'UI Components', icon: <Browsers size={14} /> },
    { id: 'buttons', label: 'Buttons', icon: <Cursor size={14} /> },
    { id: 'forms', label: 'Forms & Inputs', icon: <Sliders size={14} /> },
    { id: 'data', label: 'Data & Telemetry', icon: <Database size={14} /> },
    { id: 'animations', label: 'Motion & 3D', icon: <Waveform size={14} /> },
    { id: 'backgrounds', label: 'Backgrounds & Shaders', icon: <PaintBrush size={14} /> },
    { id: 'sections', label: 'UI Sections', icon: <Code size={14} /> },
  ]

  // Keyboard navigation
  useEffect(() => {
    if (!commandPaletteOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setCommandPaletteOpen(false)
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredComponents.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredComponents.length - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredComponents[selectedIndex]) {
          const comp = filteredComponents[selectedIndex]
          setSelectedComponent(comp)
          setCommandPaletteOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, filteredComponents, selectedIndex, setSelectedComponent, setCommandPaletteOpen])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  const handleSelectComponent = (comp: RegistryItem) => {
    setSelectedComponent(comp)
    setCommandPaletteOpen(false)
  }

  const handleSelectCategory = (cat: ComponentCategory) => {
    setSelectedCategory(cat)
    setShowFavoritesOnly(false)
    setCommandPaletteOpen(false)
    scrollToCatalogue(-90)
  }

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx cooki-ui init')
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 2000)
  }

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[60] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-white/15 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-2xl text-zinc-900 dark:text-zinc-100 z-10"
          >
            {/* Top Search Bar */}
            <div className="flex items-center gap-3 border-b border-zinc-200/80 dark:border-white/10 px-4 py-3.5">
              <MagnifyingGlass size={20} weight="bold" className="text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Search all 121 artifacts, categories, or actions..."
                className="w-full bg-transparent text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X size={16} />
                </button>
              )}
              <span className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                ESC
              </span>
            </div>

            {/* Quick Actions & Category Chips (when query is empty) */}
            {!query && (
              <div className="border-b border-zinc-100 dark:border-white/5 bg-zinc-50/60 dark:bg-zinc-900/40 px-4 py-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Jump to Category
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {categoryShortcuts.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-white transition-all cursor-pointer"
                    >
                      <span className="text-zinc-400">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Component Results List */}
            <div 
              ref={listRef} 
              data-lenis-prevent="true"
              className="max-h-[360px] overflow-y-auto modal-scroll p-2 space-y-1"
            >
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>{query ? `Results (${filteredComponents.length})` : 'Featured Components'}</span>
                <span>Select to Preview</span>
              </div>

              {filteredComponents.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-500">
                  <p>No components found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-zinc-400 mt-1">Try searching &ldquo;button&rdquo;, &ldquo;dock&rdquo;, &ldquo;card&rdquo;, or &ldquo;marquee&rdquo;</p>
                </div>
              ) : (
                filteredComponents.map((comp, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={comp.id}
                      data-index={idx}
                      onClick={() => handleSelectComponent(comp)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                            isSelected
                              ? 'border-white/20 bg-white/10 text-white'
                              : 'border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-500'
                          }`}
                        >
                          <Command size={16} />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold truncate">{comp.name}</span>
                            <span
                              className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-zinc-100 dark:bg-white/10 text-zinc-400'
                              }`}
                            >
                              {comp.category}
                            </span>
                          </div>
                          <p
                            className={`text-xs truncate mt-0.5 ${
                              isSelected ? 'text-white/80' : 'text-zinc-400 dark:text-zinc-500'
                            }`}
                          >
                            {comp.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-3 shrink-0">
                        <ArrowRight
                          size={14}
                          className={`transition-transform ${
                            isSelected ? 'translate-x-0.5 text-white' : 'text-zinc-400 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Quick Utility Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/60 px-4 py-2.5 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyCli}
                  className="flex items-center gap-1.5 rounded border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800 px-2 py-1 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCmd ? <Check size={12} className="text-emerald-500" /> : <Terminal size={12} />}
                  <span>{copiedCmd ? 'Copied CLI Command' : 'npx cooki-ui init'}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 rounded border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800 px-2 py-1 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {isDark ? <Sun size={12} /> : <Moon size={12} />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400">
                <span>&uarr;&darr; Navigate</span>
                <span>&bull;</span>
                <span>&crarr; Select</span>
                <span>&bull;</span>
                <span>ESC to Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
