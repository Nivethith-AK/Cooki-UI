import React from 'react'
import { ShieldCheck, Cpu, Database, Check } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface FeatureBentoBlockProps {
  className?: string
}

export const FeatureBentoBlock: React.FC<FeatureBentoBlockProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-zinc-900 dark:text-white font-sans', className)}>
      <div className="md:col-span-2 rounded-3xl border border-white/10 bg-zinc-950 p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
            <Cpu size={20} weight="bold" />
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white">Hermetic WASM Isolate Sandbox</h4>
            <span className="font-mono text-[10px] text-zinc-500">RING-0 MEMORY CONFINEMENT</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
          Executes every generated function in a fresh, bit-reproducible WebAssembly container. Pre-allocates heap limits and blocks network socket leaks.
        </p>
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-500">
          <span>Memory: 64MB Fixed</span>
          <span className="text-emerald-400">Bytecode Verified</span>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 flex flex-col justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-emerald-400">
          <ShieldCheck size={20} weight="bold" />
        </div>
        <div>
          <h4 className="mt-3 font-bold text-zinc-900 dark:text-white">SMT Proofs</h4>
          <p className="mt-1 text-xs text-zinc-400">Mathematical invariant assertions powered by Z3.</p>
        </div>
        <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
          <Check size={14} weight="bold" />
          <span>Zero Deadlocks</span>
        </div>
      </div>
    </div>
  )
}
