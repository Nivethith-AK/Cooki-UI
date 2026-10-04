import React from 'react'
import { Check, X, ShieldCheck, Cpu, Code } from '@phosphor-icons/react'

export const TechSpecs: React.FC = () => {
  const comparisons = [
    {
      dimension: 'Verification Mechanism',
      standard: 'Stochastic prompt generation with unverified post-hoc hope',
      cook: 'Formal SMT Invariant Solver (Z3 mathematical proofs)',
    },
    {
      dimension: 'Repository Context Engine',
      standard: 'Lossy, truncated token window buffer with token sliding',
      cook: 'Persistent Directed Acyclic Graph (DAG) of complete AST symbols',
    },
    {
      dimension: 'Compilation Environment',
      standard: 'Unsafe execution directly on local workstation environment',
      cook: 'Hermetic, sandboxed WASM runtime with memory boundary quotas',
    },
    {
      dimension: 'Transaction Scope',
      standard: 'Fragmented single-file code block snippets',
      cook: 'Atomic cross-package monorepo commits with rollback safety',
    },
    {
      dimension: 'Agent Coordination',
      standard: 'Single sequential prompt loop with drifting memory',
      cook: 'Multi-agent Raft quorum arbitration and cryptographic consensus',
    },
    {
      dimension: 'Build Reproducibility',
      standard: 'Non-deterministic outputs that vary across runs',
      cook: 'Bit-reproducible, byte-exact SHA256 verified artifact seals',
    },
  ]

  return (
    <section id="specs" className="relative py-24 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
            <span>ENGINEERING DIFFERENTIATION</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Beyond stochastic code generation.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-zinc-400">
            A precise architectural comparison between standard AI chat completions and the deterministic COOK kernel.
          </p>
        </div>

        {/* Comparison Table with Double-Bezel */}
        <div className="mt-14 double-bezel">
          <div className="double-bezel-inner p-4 sm:p-8 overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider">
                  <th className="pb-4 font-medium">Architectural Dimension</th>
                  <th className="pb-4 font-medium text-zinc-500">Standard AI Assistants</th>
                  <th className="pb-4 font-medium text-emerald-400">COOK Autonomous Runtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisons.map((row) => (
                  <tr key={row.dimension} className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-4 font-mono font-medium text-white pr-4">
                      {row.dimension}
                    </td>
                    <td className="py-4 text-zinc-400 pr-4">
                      <div className="flex items-start gap-2">
                        <X size={15} weight="bold" className="text-zinc-600 shrink-0 mt-0.5" />
                        <span>{row.standard}</span>
                      </div>
                    </td>
                    <td className="py-4 text-zinc-200">
                      <div className="flex items-start gap-2">
                        <Check size={16} weight="bold" className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-zinc-100">{row.cook}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
