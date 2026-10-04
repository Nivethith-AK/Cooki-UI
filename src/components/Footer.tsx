import React from 'react'
import { Cpu, GitBranch, Terminal } from '@phosphor-icons/react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050505] pb-28 pt-16 text-xs text-zinc-500 font-mono">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold font-sans text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/20 bg-zinc-800">
                <Cpu size={14} weight="bold" />
              </div>
              <span>COOK RUNTIME</span>
            </div>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed max-w-xs">
              Autonomous software synthesis & deterministic multi-agent compiler runtime.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Kernel v2.4.2 &bull; All Systems Nominal</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#runtime" className="hover:text-white transition-colors">Runtime Canvas</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Core Architecture</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Differentiators</a></li>
              <li><a href="#terminal" className="hover:text-white transition-colors">Deploy Terminal</a></li>
            </ul>
          </div>

          {/* Architecture Pillars */}
          <div>
            <div className="font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Specifications
            </div>
            <ul className="space-y-2">
              <li><span className="text-zinc-400">Formal SMT Solver (Z3)</span></li>
              <li><span className="text-zinc-400">Hermetic WASM Isolate</span></li>
              <li><span className="text-zinc-400">Raft Quorum Consensus</span></li>
              <li><span className="text-zinc-400">Context DAG Cache</span></li>
              <li><span className="text-zinc-400">Bit-Reproducible SHA256</span></li>
            </ul>
          </div>

          {/* Runtime Info */}
          <div>
            <div className="font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Environment
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li>Architecture: x86_64 / aarch64</li>
              <li>Security: Air-Gapped Sandbox</li>
              <li>License: Apache 2.0 / MIT</li>
              <li>Source: cook-runtime-core</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} COOK Engineering Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Deterministic Software Synthesis</span>
            <span>&bull;</span>
            <span>Kernel Build #8942-rel</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
