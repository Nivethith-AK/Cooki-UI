import React from 'react'
import { Cpu, GitBranch, Terminal } from '@phosphor-icons/react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/5 bg-zinc-100/60 dark:bg-[#050505] pb-28 pt-16 text-xs text-zinc-500 dark:text-zinc-500 font-mono transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-200 dark:border-white/5">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold font-sans text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/20 bg-white dark:bg-zinc-800 text-indigo-600 dark:text-white">
                <Cpu size={14} weight="bold" />
              </div>
              <span>COOKI UI</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs leading-relaxed max-w-xs">
              Source-first React & Tailwind component ecosystem with interactive previews, zero-runtime lock-in, and instant copy/paste.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span>Registry v2.4 &bull; All Endpoints Operational</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider mb-3">
              Catalogue
            </div>
            <ul className="space-y-2">
              <li><a href="#component-catalogue" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">UI Components</a></li>
              <li><a href="#component-catalogue" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Interactive Motion</a></li>
              <li><a href="#component-catalogue" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Backgrounds & Shaders</a></li>
              <li><a href="#component-catalogue" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Production Sections</a></li>
              <li><a href="https://github.com/Nivethith-AK/Cooki-UI" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          {/* Architecture Pillars */}
          <div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider mb-3">
              Ecosystem
            </div>
            <ul className="space-y-2">
              <li><a href="/r/index.json" target="_blank" className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-500">Public Registry API</a></li>
              <li><a href="/llms.txt" target="_blank" className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-500">AI Documentation (llms.txt)</a></li>
              <li><span className="text-zinc-500 dark:text-zinc-400">shadcn/ui Compatible</span></li>
              <li><span className="text-zinc-500 dark:text-zinc-400">Zero Runtime Dependency</span></li>
              <li><span className="text-zinc-500 dark:text-zinc-400">100% Free & Open Source</span></li>
            </ul>
          </div>

          {/* Runtime Info */}
          <div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider mb-3">
              Compatibility
            </div>
            <ul className="space-y-2 text-zinc-500 dark:text-zinc-400">
              <li>Frameworks: React, Next.js, Vite</li>
              <li>Styling: Tailwind CSS v4 & v3</li>
              <li>Motion: Framer Motion / Motion</li>
              <li>License: MIT License</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 dark:text-zinc-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Cooki UI. Open Source Software under MIT License.
          </div>
          <div className="flex items-center gap-4">
            <span>Source-First Component Store</span>
            <span>&bull;</span>
            <span>Deployed on Vercel Edge</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
