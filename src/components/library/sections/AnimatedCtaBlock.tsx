import React, { useState } from 'react'
import { ArrowUpRight, Copy, Check, Terminal } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface AnimatedCtaBlockProps {
  className?: string
}

export const AnimatedCtaBlock: React.FC<AnimatedCtaBlockProps> = ({ className }) => {
  const [copied, setCopied] = useState(false)
  const cmd = 'npx cook init --runtime=enterprise'

  const copy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('w-full max-w-2xl rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-center text-white shadow-2xl', className)}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
        <span>RUNTIME v2.4 DEPLOYMENT</span>
      </div>

      <h3 className="mt-4 text-2xl font-bold tracking-tight">Deploy Deterministic Engineering</h3>
      <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto">
        Integrate the COOK compiler into your existing GitHub Actions pipeline and automate verified pull requests.
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/80 px-4 py-2.5 font-mono text-xs max-w-md mx-auto">
        <div className="flex items-center gap-2 text-zinc-300 truncate">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="truncate">{cmd}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 hover:bg-zinc-700 transition-colors shrink-0"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  )
}
