import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  Cpu, 
  Code, 
  ArrowRight,
  BookOpen,
  ArrowSquareOut,
  ShieldCheck,
  Lightning,
  Package
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'

export const InstallGuideModal: React.FC = () => {
  const { installGuideOpen, setInstallGuideOpen } = useStore()
  const [activeTab, setActiveTab] = useState<'terminal' | 'mcp'>('terminal')
  const [pmTab, setPmTab] = useState<'pnpm' | 'npm' | 'bun' | 'yarn'>('npm')
  const [mcpIdeTab, setMcpIdeTab] = useState<'cursor' | 'claude' | 'windsurf' | 'antigravity'>('cursor')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Lock background scroll and halt Lenis virtual scroll when modal is open
  useEffect(() => {
    if (installGuideOpen) {
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
  }, [installGuideOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInstallGuideOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setInstallGuideOpen])

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const mcpConfigJson = JSON.stringify(
    {
      mcpServers: {
        'cooki-ui': {
          command: 'npx',
          args: ['-y', 'cooki-ui@latest', 'mcp'],
        },
      },
    },
    null,
    2
  )

  const shadcnCommand = {
    npm: 'npx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json',
    pnpm: 'pnpm dlx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json',
    bun: 'bunx --bun shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json',
    yarn: 'npx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json',
  }[pmTab]

  const installDepsCommand = {
    npm: 'npm install framer-motion clsx tailwind-merge @phosphor-icons/react',
    pnpm: 'pnpm add framer-motion clsx tailwind-merge @phosphor-icons/react',
    bun: 'bun add framer-motion clsx tailwind-merge @phosphor-icons/react',
    yarn: 'yarn add framer-motion clsx tailwind-merge @phosphor-icons/react',
  }[pmTab]

  return (
    <AnimatePresence>
      {installGuideOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-5 md:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInstallGuideOpen(false)}
            className="absolute inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-4xl h-[88vh] max-h-[900px] rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-2xl flex flex-col overflow-hidden transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 px-6 py-4 shrink-0 bg-white/95 dark:bg-zinc-950/95">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Terminal size={18} weight="bold" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white truncate">
                    Terminal Installation & MCP Connection
                  </h2>
                  <p className="text-xs text-zinc-500 hidden sm:block">
                    Install components into your project or connect to AI coding agents via Model Context Protocol
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInstallGuideOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                aria-label="Close guide"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-200/80 dark:border-white/5 px-6 py-3 bg-zinc-50/90 dark:bg-zinc-900/60 shrink-0">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'terminal'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                }`}
              >
                <Terminal size={14} weight="bold" />
                <span>1. Terminal & CLI Installation</span>
              </button>

              <button
                onClick={() => setActiveTab('mcp')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'mcp'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/5'
                }`}
              >
                <Cpu size={14} weight="bold" />
                <span>2. AI Agent MCP Connection (Cursor, Claude, Windsurf)</span>
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] uppercase tracking-wider text-indigo-300">
                  New
                </span>
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 min-h-0 overflow-y-auto modal-scroll p-6 space-y-6"
            >
              {/* TAB 1: TERMINAL & CLI INSTALLATION */}
              {activeTab === 'terminal' && (
                <div className="space-y-6">
                  {/* Step 1: Utility Requirements */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">1</span>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                          PRE-REQUISITES & UTILITY HELPER
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">React 18/19 & Tailwind CSS</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                      Cooki UI components use the standard <code className="text-indigo-600 dark:text-indigo-400">cn()</code> helper for merging Tailwind classes. Make sure you have it at <code className="text-zinc-800 dark:text-zinc-200 font-mono">@/lib/utils.ts</code>:
                    </p>

                    {/* Dependencies Package Manager Tabs */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
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

                      <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-3 font-mono text-xs text-zinc-200">
                        <span className="truncate mr-2">$ {installDepsCommand}</span>
                        <button
                          onClick={() => copyToClipboard(installDepsCommand, 'deps')}
                          className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 shrink-0 cursor-pointer"
                        >
                          {copiedKey === 'deps' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedKey === 'deps' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/80 p-3 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                      <pre className="text-zinc-300 dark:text-zinc-400">{`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}</pre>
                    </div>
                  </div>

                  {/* Step 2: shadcn CLI Add */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">2</span>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                          INSTALL COMPONENT VIA TERMINAL (RECOMMENDED)
                        </h3>
                      </div>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        100% SHADCN COMPATIBLE
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                      Run this command inside your project root. It will automatically download the raw TypeScript/React component directly into your local <code className="text-zinc-800 dark:text-zinc-200 font-mono">components/ui/</code> folder and resolve dependencies:
                    </p>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-3 font-mono text-xs text-emerald-400">
                      <span className="truncate mr-2">$ {shadcnCommand}</span>
                      <button
                        onClick={() => copyToClipboard(shadcnCommand, 'shadcn')}
                        className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'shadcn' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedKey === 'shadcn' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mt-2">
                      <Package size={14} />
                      <span>Works with any of the 121 components: replace <code className="text-zinc-700 dark:text-zinc-300 font-bold">magnetic-button</code> with any component slug!</span>
                    </div>
                  </div>

                  {/* Step 3: Cooki UI CLI Preview */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">3</span>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                          COOKI UI STANDALONE CLI (FASTEST)
                        </h3>
                      </div>
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        DIRECT CLI
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-3 font-mono text-xs text-zinc-200">
                        <span className="text-indigo-400">$ npx cooki-ui add magnetic-button</span>
                        <button
                          onClick={() => copyToClipboard('npx cooki-ui add magnetic-button', 'cooki-add')}
                          className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 shrink-0 cursor-pointer"
                        >
                          {copiedKey === 'cooki-add' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedKey === 'cooki-add' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-3 font-mono text-xs text-zinc-200">
                        <span className="text-zinc-400">$ npx cooki-ui init</span>
                        <button
                          onClick={() => copyToClipboard('npx cooki-ui init', 'cooki-init')}
                          className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-zinc-700 shrink-0 cursor-pointer"
                        >
                          {copiedKey === 'cooki-init' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedKey === 'cooki-init' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Import & Usage */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold font-mono">4</span>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                        IMPORT & USE IN YOUR REACT / NEXT.JS CODE
                      </h3>
                    </div>

                    <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-900 dark:bg-black/80 p-3 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                      <pre className="text-zinc-300 dark:text-zinc-400">{`// Component code is located in your project directory
import { MagneticButton } from "@/components/ui/magnetic-button"

export default function MyPage() {
  return (
    <div className="p-8">
      <MagneticButton variant="glow" onClick={() => alert("Clicked!")}>
        Get Started 🚀
      </MagneticButton>
    </div>
  )
}`}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AI CODING AGENT & MCP CONNECTION */}
              {activeTab === 'mcp' && (
                <div className="space-y-6">
                  {/* MCP Banner */}
                  <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Model Context Protocol (MCP) Integration
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white font-sans">
                      Connect Cooki UI to your AI Coding Agent
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans max-w-2xl">
                      The Cooki UI MCP Server allows AI coding assistants (like <strong>Cursor</strong>, <strong>Claude Code</strong>, <strong>Windsurf</strong>, and <strong>Antigravity</strong>) to autonomously search, fetch, and install components into your repository on demand.
                    </p>
                  </div>

                  {/* MCP Config JSON Block */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-900 dark:bg-black/90 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code size={16} className="text-indigo-400" />
                        <span className="font-mono text-xs font-bold text-zinc-200 uppercase tracking-wider">
                          Universal MCP Server Configuration
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(mcpConfigJson, 'mcp-json')}
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-mono font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
                      >
                        {copiedKey === 'mcp-json' ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedKey === 'mcp-json' ? 'Copied Configuration!' : 'Copy MCP Config JSON'}</span>
                      </button>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-indigo-300 overflow-x-auto">
                      <pre>{mcpConfigJson}</pre>
                    </div>
                  </div>

                  {/* IDE-Specific Quick Setup Guides */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/5 pb-3">
                      <h4 className="text-xs font-bold font-mono text-zinc-900 dark:text-white uppercase tracking-wider">
                        IDE-Specific Setup Instructions
                      </h4>
                      <div className="flex gap-1">
                        {(['cursor', 'claude', 'windsurf', 'antigravity'] as const).map((ide) => (
                          <button
                            key={ide}
                            onClick={() => setMcpIdeTab(ide)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-mono capitalize transition-all cursor-pointer ${
                              mcpIdeTab === ide
                                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold'
                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                            }`}
                          >
                            {ide}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cursor instructions */}
                    {mcpIdeTab === 'cursor' && (
                      <div className="space-y-2 text-xs font-sans text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <p className="font-semibold text-zinc-900 dark:text-white">To install in Cursor:</p>
                        <ol className="list-decimal list-inside space-y-1.5 font-mono text-[11px]">
                          <li>Open Cursor Settings (<kbd className="rounded bg-zinc-200 dark:bg-zinc-800 px-1 py-0.2">Ctrl+,</kbd> or <kbd className="rounded bg-zinc-200 dark:bg-zinc-800 px-1 py-0.2">Cmd+,</kbd>)</li>
                          <li>Navigate to <strong>Features</strong> &rarr; <strong>MCP</strong></li>
                          <li>Click <strong>+ Add New MCP Server</strong></li>
                          <li>Set <strong>Name</strong>: <code className="text-indigo-500">cooki-ui</code></li>
                          <li>Set <strong>Type</strong>: <code className="text-indigo-500">command</code></li>
                          <li>Set <strong>Command</strong>: <code className="text-indigo-500">npx -y cooki-ui@latest mcp</code></li>
                          <li>Save. The green indicator status will confirm connection!</li>
                        </ol>
                      </div>
                    )}

                    {/* Claude instructions */}
                    {mcpIdeTab === 'claude' && (
                      <div className="space-y-2 text-xs font-sans text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <p className="font-semibold text-zinc-900 dark:text-white">To install in Claude Desktop / Claude Code:</p>
                        <ol className="list-decimal list-inside space-y-1.5 font-mono text-[11px]">
                          <li>Open <code className="text-zinc-800 dark:text-zinc-200 font-bold">claude_desktop_config.json</code>:
                            <div className="pl-4 text-[10px] text-zinc-500 mt-0.5">
                              Windows: <code className="text-zinc-400">%APPDATA%\Claude\claude_desktop_config.json</code><br/>
                              macOS: <code className="text-zinc-400">~/Library/Application Support/Claude/claude_desktop_config.json</code>
                            </div>
                          </li>
                          <li>Add the <code className="text-indigo-500">"cooki-ui"</code> block inside <code className="text-indigo-500">"mcpServers"</code>.</li>
                          <li>Restart Claude Desktop. The hammer tool icon will now list Cooki UI tools!</li>
                        </ol>
                      </div>
                    )}

                    {/* Windsurf instructions */}
                    {mcpIdeTab === 'windsurf' && (
                      <div className="space-y-2 text-xs font-sans text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <p className="font-semibold text-zinc-900 dark:text-white">To install in Windsurf (Codeium):</p>
                        <ol className="list-decimal list-inside space-y-1.5 font-mono text-[11px]">
                          <li>Open <code className="text-zinc-800 dark:text-zinc-200 font-bold">~/.codeium/windsurf/mcp_config.json</code></li>
                          <li>Paste the <code className="text-indigo-500">cooki-ui</code> server definition into the <code className="text-indigo-500">mcpServers</code> object.</li>
                          <li>Save the file. Cascade will instantly recognize and use Cooki UI components!</li>
                        </ol>
                      </div>
                    )}

                    {/* Antigravity instructions */}
                    {mcpIdeTab === 'antigravity' && (
                      <div className="space-y-2 text-xs font-sans text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <p className="font-semibold text-zinc-900 dark:text-white">To install in Antigravity / Google Stitch:</p>
                        <ol className="list-decimal list-inside space-y-1.5 font-mono text-[11px]">
                          <li>Open or create <code className="text-zinc-800 dark:text-zinc-200 font-bold">.gemini/antigravity/mcp_config.json</code> or project <code className="text-zinc-800 dark:text-zinc-200 font-bold">.mcp.json</code></li>
                          <li>Add the <code className="text-indigo-500">cooki-ui</code> configuration.</li>
                          <li>Antigravity can now autonomously discover, inspect, and install any Cooki UI component!</li>
                        </ol>
                      </div>
                    )}
                  </div>

                  {/* Autonomous Capabilities & Prompt Examples */}
                  <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-3">
                    <h4 className="text-xs font-bold font-mono text-zinc-900 dark:text-white uppercase tracking-wider">
                      What can your AI agent do with Cooki UI MCP?
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-3 space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-indigo-500">
                          <Lightning size={14} />
                          <span>list_components</span>
                        </div>
                        <p className="text-[11px] text-zinc-500">
                          Discovers all 121 artifacts with descriptions, categories, and frameworks.
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-3 space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-500">
                          <Code size={14} />
                          <span>get_component_source</span>
                        </div>
                        <p className="text-[11px] text-zinc-500">
                          Retrieves the pure, full TypeScript code for any component.
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-3 space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-500">
                          <Package size={14} />
                          <span>install_component</span>
                        </div>
                        <p className="text-[11px] text-zinc-500">
                          Writes component directly to your project and installs dependencies.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-[11px] font-mono text-zinc-500">
                        Try asking your agent: <span className="text-zinc-800 dark:text-zinc-200 italic">&ldquo;Find a modern interactive button in Cooki UI with spring physics and add it to my project&rdquo;</span>
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-200/80 dark:border-white/10 px-6 py-3 bg-zinc-50/90 dark:bg-zinc-950/90 shrink-0 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
              <span>Cooki UI CLI & MCP v1.0</span>
              <div className="flex items-center gap-3">
                <a
                  href="/r/index.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-500 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>Registry API</span>
                  <ArrowSquareOut size={12} />
                </a>
                <span>&bull;</span>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-500 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>llms.txt</span>
                  <ArrowSquareOut size={12} />
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
