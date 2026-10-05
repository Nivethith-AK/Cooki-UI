import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Copy, 
  Check, 
  Heart, 
  Sliders, 
  ArrowSquareOut,
  ArrowsOutSimple,
  ArrowsInSimple,
  ArrowClockwise,
  Terminal,
  Cpu
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'
import { CodeViewer } from './CodeViewer'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class PreviewErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('Component Preview Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-rose-500 font-mono text-xs max-w-md">
          <span className="font-bold">Preview could not be rendered</span>
          <span className="text-[11px] text-zinc-500 mt-1">{this.state.error?.message}</span>
          <button 
            onClick={() => this.setState({ hasError: false })} 
            className="mt-3 px-3 py-1 bg-zinc-800 text-white rounded-lg text-[11px] hover:bg-zinc-700 cursor-pointer transition-colors"
          >
            Retry Preview
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export const ComponentDetailModal: React.FC = () => {
  const { selectedComponent, setSelectedComponent, favorites, toggleFavorite, setInstallGuideOpen } = useStore()
  const { isDark } = useTheme()

  const [controlValues, setControlValues] = useState<Record<string, any>>({})
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedMcp, setCopiedMcp] = useState(false)
  const [pmTab, setPmTab] = useState<'npm' | 'pnpm' | 'bun' | 'yarn'>('npm')
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'install' | 'registry'>('preview')
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Lock background scroll and halt Lenis virtual scroll when modal is open
  useEffect(() => {
    if (selectedComponent) {
      const prevBodyOverflow = document.body.style.overflow
      const prevHtmlOverflow = document.documentElement.style.overflow
      
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      // Explicitly pause Lenis smooth scroll engine
      if (typeof (window as any).__lenis?.stop === 'function') {
        ;(window as any).__lenis.stop()
      }

      return () => {
        document.body.style.overflow = prevBodyOverflow
        document.documentElement.style.overflow = prevHtmlOverflow

        // Explicitly resume Lenis smooth scroll engine
        if (typeof (window as any).__lenis?.start === 'function') {
          ;(window as any).__lenis.start()
        }
      }
    }
  }, [selectedComponent])

  useEffect(() => {
    if (selectedComponent?.controls) {
      const initial: Record<string, any> = {}
      selectedComponent.controls.forEach((c) => {
        initial[c.name] = c.defaultValue
      })
      setControlValues(initial)
    } else {
      setControlValues({})
    }
    setActiveTab('preview')
    setIsFullscreen(false)
  }, [selectedComponent])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedComponent(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSelectedComponent])

  const isFav = selectedComponent ? favorites.includes(selectedComponent.id) : false

  const copyInstall = () => {
    if (!selectedComponent) return
    navigator.clipboard.writeText(selectedComponent.installCommand)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const handleControlChange = (name: string, val: any) => {
    setControlValues((prev) => ({ ...prev, [name]: val }))
  }

  return (
    <AnimatePresence>
      {selectedComponent && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-5 md:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedComponent(null)}
            className="absolute inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Window */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative z-10 w-full ${
              isFullscreen ? 'max-w-[98vw] h-[96vh]' : 'max-w-5xl h-[88vh] max-h-[920px]'
            } rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-2xl flex flex-col overflow-hidden transition-all duration-200`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 px-5 sm:px-6 py-3.5 sm:py-4 shrink-0 bg-white/95 dark:bg-zinc-950/95">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-3">
                <span className="shrink-0 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {selectedComponent.category.toUpperCase()}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white truncate">
                  {selectedComponent.name}
                </h2>
                <span className="hidden md:inline-block text-xs text-zinc-400 dark:text-zinc-500 font-mono truncate">
                  &bull; {selectedComponent.subcategory}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  title={isFullscreen ? 'Exit fullscreen' : 'Expand full screen'}
                >
                  {isFullscreen ? <ArrowsInSimple size={16} weight="bold" /> : <ArrowsOutSimple size={16} weight="bold" />}
                </button>
                <button
                  onClick={() => toggleFavorite(selectedComponent.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Bookmark component"
                  title="Bookmark"
                >
                  <Heart size={18} weight={isFav ? 'fill' : 'regular'} className={isFav ? 'text-rose-500' : ''} />
                </button>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close modal"
                  title="Close (ESC)"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Subheader / Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-zinc-200/80 dark:border-white/5 px-5 sm:px-6 py-2.5 sm:py-3 bg-zinc-50/90 dark:bg-zinc-900/60 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                  }`}
                >
                  Interactive Playground
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeTab === 'code'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                  }`}
                >
                  Source Code
                </button>
                <button
                  onClick={() => setActiveTab('install')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeTab === 'install'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                  }`}
                >
                  Installation & CLI
                </button>
                <button
                  onClick={() => setActiveTab('registry')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeTab === 'registry'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                  }`}
                >
                  Registry API
                </button>
              </div>

              {/* Quick Install Copy */}
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-black/60 px-3 py-1 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 self-start sm:self-auto shrink-0 max-w-full">
                <span className="text-emerald-500 dark:text-emerald-400 font-bold">$</span>
                <span className="truncate max-w-[200px] sm:max-w-[280px]">{selectedComponent.installCommand}</span>
                <button
                  onClick={copyInstall}
                  aria-label="Copy install command"
                  className="ml-auto text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer p-0.5"
                >
                  {copiedInstall ? <Check size={13} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div 
              className="flex-1 min-h-0 overflow-y-auto modal-scroll p-4 sm:p-6 space-y-6 overscroll-contain"
            >
              
              {/* TAB 1: PLAYGROUND & PREVIEW */}
              {activeTab === 'preview' && (
                <div className="space-y-6">
                  
                  {/* Live Sandbox Area with Auto-Centering and Scrollable Safety */}
                  <div 
                    className={`relative ${
                      isFullscreen 
                        ? 'min-h-[500px]' 
                        : selectedComponent.category === 'sections' 
                        ? 'min-h-[420px]' 
                        : 'min-h-[340px]'
                    } w-full flex ${
                      selectedComponent.category === 'sections' ? 'items-start' : 'items-center'
                    } justify-center rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/70 dark:bg-[#060608] p-4 sm:p-8 overflow-x-auto overflow-y-visible shadow-inner transition-all`}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-20 bg-grid-dots" />
                    <div className={`relative isolate z-10 w-full flex flex-col items-center justify-center text-zinc-900 dark:text-zinc-100 ${
                      selectedComponent.category === 'sections' ? 'my-0' : 'my-auto'
                    }`}>
                      <PreviewErrorBoundary key={selectedComponent.id}>
                        {selectedComponent.renderPreview(controlValues, isDark)}
                      </PreviewErrorBoundary>
                    </div>
                  </div>

                  {/* Customization Controls (If available) */}
                  {selectedComponent.controls && selectedComponent.controls.length > 0 && (
                    <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/50 p-4 sm:p-5 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 mb-4 pb-2.5 border-b border-zinc-200/80 dark:border-white/5">
                        <Sliders size={14} weight="bold" />
                        <span>PLAYGROUND PARAMETERS</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedComponent.controls.map((ctrl) => (
                          <div key={ctrl.name} className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-medium">
                              {ctrl.label}
                            </label>

                            {ctrl.type === 'select' && (
                              <Combobox
                                items={ctrl.options || []}
                                value={controlValues[ctrl.name] ?? ctrl.defaultValue}
                                onValueChange={(val) => handleControlChange(ctrl.name, val)}
                                className="w-full"
                              >
                                <ComboboxInput
                                  placeholder={controlValues[ctrl.name] ?? ctrl.defaultValue ?? `Select ${ctrl.label}...`}
                                  className="py-1 text-xs font-mono"
                                  wrapperClassName="h-9 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-xs hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
                                />
                                <ComboboxContent 
                                  data-lenis-prevent="true"
                                  className="z-50 min-w-full modal-scroll max-h-48"
                                >
                                  <ComboboxEmpty>No options found</ComboboxEmpty>
                                  <ComboboxList>
                                    {(opt) => (
                                      <ComboboxItem
                                        key={opt}
                                        value={opt}
                                        className="text-xs font-mono py-1.5"
                                      >
                                        {opt}
                                      </ComboboxItem>
                                    )}
                                  </ComboboxList>
                                </ComboboxContent>
                              </Combobox>
                            )}

                            {ctrl.type === 'number' && (
                              <div className="flex items-center gap-3 h-9">
                                <input
                                  type="range"
                                  min={ctrl.min}
                                  max={ctrl.max}
                                  step={ctrl.step}
                                  value={controlValues[ctrl.name] ?? ctrl.defaultValue}
                                  onChange={(e) => handleControlChange(ctrl.name, parseFloat(e.target.value))}
                                  className="w-full accent-indigo-600 dark:accent-indigo-400 cursor-pointer"
                                />
                                <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-white w-12 text-right">
                                  {controlValues[ctrl.name] ?? ctrl.defaultValue}
                                </span>
                              </div>
                            )}

                            {ctrl.type === 'text' && (
                              <input
                                type="text"
                                value={controlValues[ctrl.name] ?? ctrl.defaultValue}
                                onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                                className="h-9 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 px-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                            )}

                            {ctrl.type === 'boolean' && (
                              <button
                                onClick={() => handleControlChange(ctrl.name, !(controlValues[ctrl.name] ?? ctrl.defaultValue))}
                                className={`h-9 rounded-xl px-3 text-xs font-mono font-medium transition-colors text-left flex items-center justify-between cursor-pointer border ${
                                  (controlValues[ctrl.name] ?? ctrl.defaultValue)
                                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10'
                                }`}
                              >
                                <span>{(controlValues[ctrl.name] ?? ctrl.defaultValue) ? 'ENABLED' : 'DISABLED'}</span>
                                <span className={`h-2 w-2 rounded-full ${
                                  (controlValues[ctrl.name] ?? ctrl.defaultValue) ? 'bg-emerald-500' : 'bg-zinc-400'
                                }`} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: SOURCE CODE */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  <CodeViewer files={selectedComponent.files} usage={selectedComponent.usage} />
                </div>
              )}

              {/* TAB 3: INSTALLATION & SPECS */}
              {activeTab === 'install' && (
                <div className="space-y-6">
                  {/* 1. Terminal Installation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Terminal size={15} className="text-emerald-500" />
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">1. TERMINAL CLI INSTALLATION</h4>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">RECOMMENDED</span>
                    </div>

                    {/* Package Manager Switcher */}
                    <div className="flex items-center gap-1 mb-2">
                      {(['npm', 'pnpm', 'bun', 'yarn'] as const).map((pm) => (
                        <button
                          key={pm}
                          onClick={() => setPmTab(pm)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                            pmTab === pm
                              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold'
                              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                          }`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/80 p-3 font-mono text-xs text-zinc-200 dark:text-zinc-300">
                      <span className="text-emerald-400 truncate mr-2">
                        $ {
                          pmTab === 'pnpm' 
                            ? `pnpm dlx shadcn@latest add https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`
                            : pmTab === 'bun'
                            ? `bunx --bun shadcn@latest add https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`
                            : `npx shadcn@latest add https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`
                        }
                      </span>
                      <button
                        onClick={() => {
                          const cmd = pmTab === 'pnpm' 
                            ? `pnpm dlx shadcn@latest add https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`
                            : pmTab === 'bun'
                            ? `bunx --bun shadcn@latest add https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`
                            : `npx shadcn@latest add https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`
                          navigator.clipboard.writeText(cmd)
                          setCopiedInstall(true)
                          setTimeout(() => setCopiedInstall(false), 2000)
                        }}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 shrink-0 cursor-pointer"
                      >
                        {copiedInstall ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedInstall ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="mt-1.5 text-[11px] text-zinc-500 font-mono">
                      Directly downloads and installs <code className="text-zinc-700 dark:text-zinc-300">{selectedComponent.slug}.tsx</code> into your <code className="text-zinc-700 dark:text-zinc-300">components/ui/</code> directory.
                    </p>
                  </div>

                  {/* 2. Cooki UI Standalone CLI */}
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 font-mono">2. COOKI UI STANDALONE CLI (PREVIEW)</h4>
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/80 p-3 font-mono text-xs text-zinc-200 dark:text-zinc-300">
                      <span className="text-indigo-400">$ npx cooki-ui add {selectedComponent.slug}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`npx cooki-ui add ${selectedComponent.slug}`)
                          setCopiedInstall(true)
                          setTimeout(() => setCopiedInstall(false), 2000)
                        }}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 shrink-0 cursor-pointer"
                      >
                        {copiedInstall ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedInstall ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. AI Coding Agent MCP Server Connection */}
                  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu size={15} weight="bold" className="text-indigo-500" />
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                          3. AI AGENT MCP SERVER CONNECTION
                        </h4>
                      </div>
                      <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[9px] font-mono text-indigo-400 border border-indigo-500/30">
                        CURSOR &bull; CLAUDE &bull; WINDSURF
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                      Let your AI coding assistant install this component automatically. Add this to your editor&apos;s MCP config file (<code className="text-zinc-800 dark:text-zinc-200 font-mono text-[11px]">mcp.json</code>):
                    </p>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-3 font-mono text-xs text-indigo-300">
                      <span className="truncate mr-2">npx -y cooki-ui@latest mcp</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const mcpSnippet = JSON.stringify(
                              {
                                mcpServers: {
                                  'cooki-ui': {
                                    command: 'npx',
                                    args: ['-y', 'cooki-ui@latest', 'mcp']
                                  }
                                }
                              },
                              null,
                              2
                            )
                            navigator.clipboard.writeText(mcpSnippet)
                            setCopiedMcp(true)
                            setTimeout(() => setCopiedMcp(false), 2000)
                          }}
                          className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 cursor-pointer"
                        >
                          {copiedMcp ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedMcp ? 'Copied JSON' : 'Copy MCP JSON'}</span>
                        </button>
                        <button
                          onClick={() => setInstallGuideOpen(true)}
                          className="flex items-center gap-1 rounded bg-indigo-600 px-2.5 py-1 text-[11px] text-white hover:bg-indigo-500 cursor-pointer font-sans"
                        >
                          <span>Full Guide &rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4. Dependencies */}
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 font-mono">4. DEPENDENCIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.dependencies.length > 0 ? (
                        selectedComponent.dependencies.map((dep) => (
                          <span key={dep} className="rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                            npm i {dep}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">Zero additional dependencies required. Pure React.</span>
                      )}
                    </div>
                  </div>

                  {/* 5. Component Metadata */}
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 font-mono">5. COMPONENT METADATA</h4>
                    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/40 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-zinc-500">Frameworks:</span>
                        <div className="mt-1 text-zinc-800 dark:text-zinc-200">{selectedComponent.frameworks.join(', ')}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500">Category:</span>
                        <div className="mt-1 text-zinc-800 dark:text-zinc-200">{selectedComponent.subcategory}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500">Target Path:</span>
                        <div className="mt-1 text-zinc-700 dark:text-zinc-300 truncate">components/ui/{selectedComponent.slug}.tsx</div>
                      </div>
                      <div>
                        <span className="text-zinc-500">Status:</span>
                        <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-semibold">Production Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: REGISTRY API ENDPOINT */}
              {activeTab === 'registry' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">REGISTRY ENDPOINT</h4>
                      <a
                        href={`/r/${selectedComponent.slug}.json`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        <span>Open Endpoint</span>
                        <ArrowSquareOut size={13} />
                      </a>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/80 p-3 font-mono text-xs text-zinc-200 dark:text-zinc-300">
                      <span className="text-cyan-400">GET /r/{selectedComponent.slug}.json</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`https://cooki-ui.vercel.app/r/${selectedComponent.slug}.json`)
                          setCopiedInstall(true)
                          setTimeout(() => setCopiedInstall(false), 2000)
                        }}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 cursor-pointer"
                      >
                        <Copy size={12} />
                        <span>Copy URL</span>
                      </button>
                    </div>
                    <p className="mt-1.5 text-[11px] text-zinc-500 font-mono">
                      Served statically via Vercel CDN. Owned natively by Cooki UI repository.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 font-mono">REGISTRY SCHEMA PAYLOAD</h4>
                    <div 
                      data-lenis-prevent="true"
                      className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-4 font-mono text-xs text-zinc-200 dark:text-zinc-300 max-h-[260px] overflow-auto modal-scroll"
                    >
                      <pre className="text-zinc-300 dark:text-zinc-400">
{JSON.stringify(
  {
    $schema: 'https://cooki-ui.vercel.app/schema/registry-item.json',
    name: selectedComponent.slug,
    type: 'registry:ui',
    title: selectedComponent.name,
    description: selectedComponent.description,
    dependencies: selectedComponent.dependencies,
    files: [
      {
        path: `registry/${selectedComponent.category}/${selectedComponent.slug}/${selectedComponent.slug}.tsx`,
        type: 'registry:ui',
        target: `components/ui/${selectedComponent.slug}.tsx`
      }
    ]
  },
  null,
  2
)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer info */}
            <div className="border-t border-zinc-200/80 dark:border-white/10 px-5 sm:px-6 py-3 bg-zinc-50/90 dark:bg-zinc-950/90 shrink-0 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 transition-colors">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">COOKI UI Component Registry</span>
              <div className="flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                {selectedComponent.tags.map((t) => (
                  <span key={t} className="rounded bg-zinc-200/60 dark:bg-white/5 px-1.5 py-0.2 text-[10px] text-zinc-600 dark:text-zinc-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
