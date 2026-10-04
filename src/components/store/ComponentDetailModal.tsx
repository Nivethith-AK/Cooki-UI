import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Terminal, Heart, Sliders, Code, ShieldCheck, ArrowSquareOut } from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'
import { CodeViewer } from './CodeViewer'

export const ComponentDetailModal: React.FC = () => {
  const { selectedComponent, setSelectedComponent, favorites, toggleFavorite } = useStore()
  const { isDark } = useTheme()

  const [controlValues, setControlValues] = useState<Record<string, any>>({})
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'install'>('preview')

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
  }, [selectedComponent])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedComponent(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSelectedComponent])

  if (!selectedComponent) return null

  const isFav = favorites.includes(selectedComponent.id)

  const copyInstall = () => {
    navigator.clipboard.writeText(selectedComponent.installCommand)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const handleControlChange = (name: string, val: any) => {
    setControlValues((prev) => ({ ...prev, [name]: val }))
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedComponent(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative z-10 w-full max-w-5xl rounded-[2.5rem] border border-white/15 bg-zinc-950 dark:bg-zinc-950 bg-white text-zinc-100 dark:text-zinc-100 text-zinc-900 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 border-zinc-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/30">
                {selectedComponent.category.toUpperCase()}
              </span>
              <h2 className="text-lg font-bold text-white dark:text-white text-zinc-900">{selectedComponent.name}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(selectedComponent.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                aria-label="Bookmark"
              >
                <Heart size={18} weight={isFav ? 'fill' : 'regular'} className={isFav ? 'text-rose-500' : ''} />
              </button>
              <button
                onClick={() => setSelectedComponent(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Subheader / Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-3 bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'preview'
                    ? 'bg-white text-zinc-950 font-semibold shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Interactive Playground
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-white text-zinc-950 font-semibold shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Source Code
              </button>
              <button
                onClick={() => setActiveTab('install')}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'install'
                    ? 'bg-white text-zinc-950 font-semibold shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Installation & Docs
              </button>
            </div>

            {/* Quick Install Copy */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] text-zinc-300">
              <span className="text-emerald-400">$</span>
              <span className="truncate max-w-[240px]">{selectedComponent.installCommand}</span>
              <button
                onClick={copyInstall}
                className="ml-1 text-zinc-400 hover:text-white transition-colors"
              >
                {copiedInstall ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* TAB 1: PLAYGROUND & PREVIEW */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                
                {/* Live Sandbox Area */}
                <div className="relative min-h-[340px] flex items-center justify-center rounded-3xl border border-white/10 bg-[#060608] p-8 overflow-hidden shadow-inner">
                  <div className="pointer-events-none absolute inset-0 opacity-20 bg-grid-dots" />
                  <div className="relative z-10 w-full flex items-center justify-center">
                    {selectedComponent.renderPreview(controlValues, isDark)}
                  </div>
                </div>

                {/* Customization Controls (If available) */}
                {selectedComponent.controls && selectedComponent.controls.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4 pb-2 border-b border-white/5">
                      <Sliders size={14} />
                      <span>PLAYGROUND PARAMETERS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedComponent.controls.map((ctrl) => (
                        <div key={ctrl.name} className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono text-zinc-400">{ctrl.label}</label>

                          {ctrl.type === 'select' && (
                            <select
                              value={controlValues[ctrl.name] ?? ctrl.defaultValue}
                              onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                              className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:outline-none"
                            >
                              {ctrl.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          )}

                          {ctrl.type === 'number' && (
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min={ctrl.min}
                                max={ctrl.max}
                                step={ctrl.step}
                                value={controlValues[ctrl.name] ?? ctrl.defaultValue}
                                onChange={(e) => handleControlChange(ctrl.name, parseFloat(e.target.value))}
                                className="w-full accent-emerald-400"
                              />
                              <span className="font-mono text-xs text-white w-12 text-right">
                                {controlValues[ctrl.name] ?? ctrl.defaultValue}
                              </span>
                            </div>
                          )}

                          {ctrl.type === 'text' && (
                            <input
                              type="text"
                              value={controlValues[ctrl.name] ?? ctrl.defaultValue}
                              onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                              className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                          )}

                          {ctrl.type === 'boolean' && (
                            <button
                              onClick={() => handleControlChange(ctrl.name, !(controlValues[ctrl.name] ?? ctrl.defaultValue))}
                              className={`rounded-xl px-3 py-1.5 text-xs font-mono transition-colors text-left ${
                                (controlValues[ctrl.name] ?? ctrl.defaultValue)
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-zinc-800 text-zinc-400 border border-white/10'
                              }`}
                            >
                              {(controlValues[ctrl.name] ?? ctrl.defaultValue) ? 'ENABLED' : 'DISABLED'}
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
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 font-mono">1. INSTALL COMMAND</h4>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/80 p-3 font-mono text-xs text-zinc-300">
                    <span className="text-emerald-400">$ {selectedComponent.installCommand}</span>
                    <button
                      onClick={copyInstall}
                      className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700"
                    >
                      {copiedInstall ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedInstall ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2 font-mono">2. DEPENDENCIES</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponent.dependencies.map((dep) => (
                      <span key={dep} className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1 text-xs font-mono text-zinc-300">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2 font-mono">3. COMPONENT METADATA</h4>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500">Frameworks:</span>
                      <div className="mt-1 text-zinc-200">{selectedComponent.frameworks.join(', ')}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Category:</span>
                      <div className="mt-1 text-zinc-200">{selectedComponent.subcategory}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Added:</span>
                      <div className="mt-1 text-zinc-200">{selectedComponent.dateAdded}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Status:</span>
                      <div className="mt-1 text-emerald-400">Production Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer info */}
          <div className="border-t border-white/10 px-6 py-3 bg-zinc-950/80 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
            <span>COOK Component Registry v2.4</span>
            <div className="flex gap-2">
              {selectedComponent.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
