import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, Check, Terminal, ShieldCheck, CheckCircle } from '@phosphor-icons/react'

export const FinalCTA: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const installCmd = 'npx cook init --runtime=enterprise'

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="terminal" className="relative py-24 md:py-36 border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[450px] w-[700px] rounded-full bg-gradient-to-t from-zinc-800/20 to-transparent blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="double-bezel shadow-2xl">
          <div className="double-bezel-inner p-8 sm:p-12 text-center flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>DEPLOY KERNEL</span>
            </div>

            <h2 className="mt-6 text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
              Bring deterministic synthesis to your monorepo.
            </h2>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
              Eliminate code drift and hallucinations. Boot the COOK runtime in your existing CI/CD workflow and let autonomous agent pods build verifiable software.
            </p>

            {/* Quick-Install Command Box */}
            <div className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-black/80 p-3 font-mono text-xs flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2 overflow-x-auto text-zinc-300">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-white select-all">{installCmd}</span>
              </div>
              <button
                onClick={handleCopy}
                aria-label="Copy installation command"
                className="flex items-center gap-1.5 shrink-0 rounded-lg border border-white/10 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-700 transition-colors active:scale-95"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleCopy}
                className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white text-zinc-950 px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] shadow-lg shadow-white/5"
              >
                <span>{copied ? 'Command Copied to Clipboard' : 'Initialize Monorepo Node'}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} weight="bold" className="text-zinc-900" />
                </span>
              </button>

              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-6 py-3.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>Back to Overview</span>
              </a>
            </div>

            {/* Minimal Guarantee Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-zinc-500 pt-6 border-t border-white/5 w-full">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <CheckCircle size={13} weight="fill" className="text-emerald-400" />
                Open-Core Apache 2.0 / MIT
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck size={13} weight="fill" className="text-emerald-400" />
                Air-Gapped WASM Isolation
              </span>
              <span>&bull;</span>
              <span className="text-zinc-400">Bit-Reproducible Multi-Arch</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
