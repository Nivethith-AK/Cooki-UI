import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SquaresFour, 
  Waveform, 
  PaintBrush, 
  Browsers, 
  Heart, 
  X, 
  ArrowClockwise,
  Sparkle, 
  Cursor, 
  Rows, 
  Sliders, 
  Database, 
  Code
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { ComponentCategory, Framework } from '../../types/component'
import { scrollToCatalogue } from '../../utils/scroll'

export const SidebarFilters: React.FC = () => {
  const {
    components,
    selectedCategory,
    setSelectedCategory,
    selectedFramework,
    setSelectedFramework,
    showFavoritesOnly,
    setShowFavoritesOnly,
    favorites,
    mobileFilterOpen,
    setMobileFilterOpen,
    resetFilters,
  } = useStore()

  // Lock body scroll and pause Lenis when mobile drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
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
  }, [mobileFilterOpen])

  const categories: { id: ComponentCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Artifacts', countOverride: components.length, icon: <SquaresFour size={15} /> },
    { id: 'components', label: 'UI Components', icon: <Browsers size={15} /> },
    { id: 'ai', label: 'AI & LLM Tools', icon: <Sparkle size={15} /> },
    { id: 'cursors', label: 'Cursors & Pointer FX', icon: <Cursor size={15} /> },
    { id: 'layout', label: 'Layout & Elements', icon: <Rows size={15} /> },
    { id: 'forms', label: 'Forms & Inputs', icon: <Sliders size={15} /> },
    { id: 'data', label: 'Data & Dashboards', icon: <Database size={15} /> },
    { id: 'animations', label: 'Motion & 3D', icon: <Waveform size={15} /> },
    { id: 'backgrounds', label: 'Shaders & Backgrounds', icon: <PaintBrush size={15} /> },
    { id: 'sections', label: 'UI Sections', icon: <Code size={15} /> },
  ]

  const frameworks: (Framework | 'all')[] = [
    'all',
    'React',
    'Next.js',
    'Vite',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'Motion',
  ]

  const getCategoryCount = (cat: ComponentCategory | 'all') => {
    if (cat === 'all') return components.length
    return components.filter((c) => c.category === cat).length
  }

  const handleSelectCategory = (catId: ComponentCategory | 'all') => {
    setShowFavoritesOnly(false)
    setSelectedCategory(catId)
    setMobileFilterOpen(false)
    scrollToCatalogue(-90)
  }

  const handleToggleFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly)
    setMobileFilterOpen(false)
    scrollToCatalogue(-90)
  }

  const handleSelectFramework = (fw: Framework | 'all') => {
    setSelectedFramework(fw)
    setMobileFilterOpen(false)
    scrollToCatalogue(-90)
  }

  const handleReset = () => {
    resetFilters()
    setMobileFilterOpen(false)
    scrollToCatalogue(-90)
  }

  const sidebarContent = (
    <div className="space-y-6 text-xs font-sans">
      
      {/* Category Navigation */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">
          Categories
        </div>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id && !showFavoritesOnly
            const count = getCategoryCount(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </div>
                <span className={`font-mono text-[10px] ${isActive ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-600'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bookmarks Filter */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">
          Collections
        </div>
        <button
          onClick={handleToggleFavorites}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 transition-all cursor-pointer ${
            showFavoritesOnly
              ? 'bg-rose-500 text-white font-semibold shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <Heart size={16} weight={showFavoritesOnly ? 'fill' : 'regular'} />
            <span>Saved Bookmarks</span>
          </div>
          <span className="font-mono text-[10px]">
            {favorites.length}
          </span>
        </button>
      </div>

      {/* Framework Filter */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">
          Framework / Tech
        </div>
        <div className="flex flex-wrap gap-1.5">
          {frameworks.map((fw) => {
            const isActive = selectedFramework === fw
            return (
              <button
                key={fw}
                onClick={() => handleSelectFramework(fw)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium'
                    : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {fw === 'all' ? 'All Frameworks' : fw}
              </button>
            )
          })}
        </div>
      </div>

      {/* Reset Filter Button */}
      <div className="pt-4 border-t border-zinc-200 dark:border-white/5">
        <button
          onClick={handleReset}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-3 py-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowClockwise size={13} />
          <span>Reset All Filters</span>
        </button>
      </div>

    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 pr-4">
        <div className="sticky top-28 rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/80 dark:bg-zinc-950/70 p-5 backdrop-blur-xl shadow-sm dark:shadow-xl transition-colors">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div 
            data-lenis-prevent="true"
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              data-lenis-prevent="true"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85%] border-r border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-950 p-6 text-zinc-900 dark:text-white shadow-2xl overflow-y-auto modal-scroll"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Filter Artifacts</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-full p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
