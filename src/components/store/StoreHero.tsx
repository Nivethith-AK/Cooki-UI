import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlass, 
  X, 
  Browsers, 
  PaintBrush, 
  Waveform, 
  Code, 
  SquaresFour, 
  Sparkle, 
  Cursor, 
  Rows, 
  Sliders, 
  Database,
  Terminal,
  Check,
  Eye,
  Command
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { ComponentCategory } from '../../types/component'
import { ALL_REGISTRY_ITEMS } from '../../registry'
import { BorderBeam } from '../library/effects/BorderBeam'
import { ShinyText } from '../library/text/ShinyText'
import { MagneticButton } from '../library/buttons/MagneticButton'
import { SlidingLogoMarquee } from '../library/navigation/SlidingLogoMarquee'
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@/components/ui/combobox'
import { scrollToCatalogue } from '../../utils/scroll'

export const StoreHero: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setSelectedComponent,
    setCommandPaletteOpen,
    setInstallGuideOpen,
    setShowFavoritesOnly,
    showFavoritesOnly
  } = useStore()

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedQuickName, setSelectedQuickName] = useState('Magnetic Dock')
  const [copiedCli, setCopiedCli] = useState(false)

  const componentNames = React.useMemo(() => ALL_REGISTRY_ITEMS.map((c) => c.name), [])
  const selectedQuickItem = React.useMemo(
    () => ALL_REGISTRY_ITEMS.find((c) => c.name === selectedQuickName) || ALL_REGISTRY_ITEMS[0],
    [selectedQuickName]
  )

  const handleCopyCli = () => {
    const slug = selectedQuickItem?.id || 'magnetic-dock'
    navigator.clipboard.writeText(`npx cooki-ui add ${slug}`)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  const handleOpenSelectedModal = () => {
    if (selectedQuickItem) {
      setSelectedComponent(selectedQuickItem)
    }
  }

  const handleScrollToCatalogue = () => {
    scrollToCatalogue(-90)
  }

  const categories: { id: ComponentCategory | 'all'; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Artifacts', count: ALL_REGISTRY_ITEMS.length, icon: <SquaresFour size={13} /> },
    { id: 'components', label: 'Components', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'components').length, icon: <Browsers size={13} /> },
    { id: 'ai', label: 'AI & LLM Tools', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'ai').length, icon: <Sparkle size={13} /> },
    { id: 'cursors', label: 'Cursors', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'cursors').length, icon: <Cursor size={13} /> },
    { id: 'layout', label: 'Layout', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'layout').length, icon: <Rows size={13} /> },
    { id: 'forms', label: 'Forms', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'forms').length, icon: <Sliders size={13} /> },
    { id: 'data', label: 'Data', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'data').length, icon: <Database size={13} /> },
    { id: 'animations', label: 'Motion & 3D', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'animations').length, icon: <Waveform size={13} /> },
    { id: 'backgrounds', label: 'Backgrounds', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'backgrounds').length, icon: <PaintBrush size={13} /> },
    { id: 'sections', label: 'UI Sections', count: ALL_REGISTRY_ITEMS.filter(c => c.category === 'sections').length, icon: <Code size={13} /> },
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
    <section className="relative overflow-hidden pt-10 pb-8 border-b border-zinc-200/80 dark:border-white/5 bg-gradient-to-b from-transparent via-zinc-100/40 dark:via-white/[0.01] to-transparent">
      {/* Background Ambience & Lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-lines opacity-15" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[700px] rounded-full bg-indigo-500/10 blur-[100px] -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        
        {/* Iridescent Eyebrow Pill with ShinyText */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 backdrop-blur-md mb-5 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <ShinyText 
            text="✦ COOKI UI &bull; PRODUCTION-GRADE REACT & TAILWIND ARTIFACTS" 
            className="text-[11px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold" 
          />
        </div>

        {/* Flagship Headline & Copy */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          The Autonomous UI Registry for Modern React & Tailwind
        </h1>
        <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
          {ALL_REGISTRY_ITEMS.length} handcrafted interactive components with spring physics, 3D WebGL, and source ownership. Zero runtime lock-in.
        </p>

        {/* Featured Showcase Stage with BorderBeam */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl shadow-2xl dark:shadow-black/70 p-5 sm:p-7 my-8 max-w-3xl mx-auto text-left">
          <BorderBeam size={280} duration={8} borderWidth={1.5} colorFrom="#6366f1" colorTo="#a855f7" />

          <div className="relative z-10 flex flex-col gap-5">
            {/* Stage Header & Fast Copy Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
                    Interactive Component Selector
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Live Registry
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Pick any canonical component to preview or copy its install command
                </p>
              </div>

              {/* Quick CLI Copy Pill */}
              <button
                onClick={handleCopyCli}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/90 dark:bg-zinc-900/90 px-3 py-1.5 font-mono text-xs text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
              >
                {copiedCli ? <Check size={14} className="text-emerald-500" /> : <Terminal size={14} />}
                <span>{copiedCli ? 'Copied to Clipboard!' : `npx cooki-ui add ${selectedQuickItem?.id || 'magnetic-dock'}`}</span>
              </button>
            </div>

            {/* Quick Jumper Selector Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:flex-1">
                <Combobox
                  items={componentNames}
                  value={selectedQuickName}
                  onValueChange={(val) => {
                    if (val) setSelectedQuickName(val)
                  }}
                  className="w-full"
                >
                  <ComboboxInput placeholder="Search component to preview (e.g. Magnetic Dock)..." />
                  <ComboboxContent>
                    <ComboboxEmpty>No matching component found.</ComboboxEmpty>
                    <ComboboxList>
                      {(name) => (
                        <ComboboxItem key={name} value={name}>
                          {name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <button
                onClick={handleOpenSelectedModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all cursor-pointer shrink-0"
              >
                <Eye size={15} weight="bold" />
                <span>Preview Component</span>
              </button>
            </div>

            {/* Action CTAs powered by MagneticButton */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <MagneticButton
                  variant="default"
                  size="sm"
                  onClick={handleScrollToCatalogue}
                >
                  Explore 121 Components &darr;
                </MagneticButton>

                <MagneticButton
                  variant="minimal"
                  size="sm"
                  onClick={() => setCommandPaletteOpen(true)}
                >
                  Command Palette (⌘K)
                </MagneticButton>

                <MagneticButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setInstallGuideOpen(true)}
                  className="hidden sm:inline-flex border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10"
                >
                  Terminal & MCP Guide ✦
                </MagneticButton>
              </div>

              <div className="text-[11px] font-mono text-zinc-400 hidden md:flex items-center gap-2">
                <span>Zero Runtime Lock-In</span>
                <span>&bull;</span>
                <span>shadcn Compatible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Framework Compatibility Sliding Marquee */}
        <div className="my-6">
          <SlidingLogoMarquee className="mx-auto" />
        </div>

        {/* Central Search Bar */}
        <div className="relative group max-w-3xl mx-auto mt-6">
          <div className="relative flex items-center rounded-2xl border border-zinc-300 dark:border-white/15 bg-white/95 dark:bg-zinc-900/90 shadow-md dark:shadow-xl dark:shadow-black/50 backdrop-blur-xl transition-all focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <div className="pl-4 pr-2 text-zinc-400 flex items-center justify-center">
              <MagnifyingGlass size={18} weight="bold" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${ALL_REGISTRY_ITEMS.length}+ components, backgrounds, shaders, or tags (e.g. 'dock', '3d', 'pricing', 'card')...`}
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
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1 rounded-md border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 shadow-2xs hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Command size={10} />
                  <span>K</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Chips directly attached under the search bar */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id && !showFavoritesOnly
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setShowFavoritesOnly(false)
                  setSelectedCategory(cat.id)
                  scrollToCatalogue(-90)
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
