import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code, ShieldCheck, Terminal } from '@phosphor-icons/react'
import { SynthesisTerminal } from './SynthesisTerminal'

export const Hero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background Ambience: Subtle Radial Depth, Never distracting blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[600px] w-[800px] max-w-full rounded-full bg-gradient-to-b from-zinc-800/20 via-zinc-900/10 to-transparent blur-3xl"></div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-lines opacity-20"></div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Eyebrow Micro-Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-300 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>AUTONOMOUS SOFTWARE RUNTIME &bull; KERNEL v2.4</span>
          </div>
        </motion.div>

        {/* Display Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="mt-6 text-center"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            Compile intent into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              production systems.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / Product Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="mx-auto mt-6 max-w-2xl text-center"
        >
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed">
            COOK orchestrates multi-agent engineering teams with deterministic verification loops. Turn formal specs into audited, high-throughput codebases with bit-reproducible precision.
          </p>
        </motion.div>

        {/* Primary and Secondary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Button-in-Button Primary Action */}
          <a
            href="#terminal"
            className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white text-zinc-950 px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 hover:bg-zinc-100 hover:shadow-xl hover:shadow-white/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Initialize Kernel</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowUpRight size={13} weight="bold" className="text-zinc-900" />
            </span>
          </a>

          {/* Secondary Action */}
          <a
            href="#runtime"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-6 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-[0.98] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          >
            <Terminal size={16} />
            <span>Open Runtime Canvas</span>
          </a>
        </motion.div>

        {/* Live Architecture Verification Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-zinc-400" />
            <span>Formal Invariant Verification</span>
          </div>
          <div className="h-3 w-px bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>Deterministic AST Resolution</span>
          </div>
          <div className="h-3 w-px bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Code size={14} className="text-zinc-400" />
            <span>Multi-Language Bit-Emission</span>
          </div>
        </motion.div>

        {/* Hero Interactive Visualization: Synthesis Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="mt-14"
        >
          <SynthesisTerminal />
        </motion.div>

      </div>
    </section>
  )
}
