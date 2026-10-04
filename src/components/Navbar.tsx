import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cpu, ArrowUpRight, List, X, GitBranch, ShieldCheck } from '@phosphor-icons/react'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Runtime Canvas', href: '#runtime' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Differentiators', href: '#specs' },
    { label: 'Terminal', href: '#terminal' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:pt-6 pointer-events-none">
        <nav 
          aria-label="Main Navigation"
          className="mx-auto max-w-5xl pointer-events-auto flex items-center justify-between rounded-full border border-white/10 bg-zinc-950/85 px-4 py-2.5 backdrop-blur-xl shadow-2xl shadow-black/60 transition-all duration-300"
        >
          {/* Brand Logo & Telemetry */}
          <a 
            href="#overview" 
            className="group flex items-center gap-3 pr-2 text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner">
              <Cpu size={18} weight="bold" className="text-zinc-100 transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-white">
                <span>COOK</span>
                <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] font-medium text-zinc-400">RUNTIME</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Button-in-Button Nested CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#terminal"
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white text-zinc-950 px-4 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Deploy Kernel</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={11} weight="bold" className="text-zinc-900" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 md:hidden hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {mobileMenuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/15 bg-zinc-950/95 p-6 backdrop-blur-3xl shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-zinc-400 font-mono">
                <span>SYSTEM NAVIGATION</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  v2.4 ONLINE
                </span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#terminal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950"
                >
                  <span>Deploy Runtime Kernel</span>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
