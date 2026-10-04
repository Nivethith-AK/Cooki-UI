import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  GitBranch, 
  Lightning, 
  GitCommit, 
  CheckCircle, 
  ShieldCheck 
} from '@phosphor-icons/react'

export const WorkflowTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Formal Specification Ingestion',
      subtitle: 'Type Contracts & Intent Declarations',
      desc: 'Engineers supply high-level architectural requirements in typed schema, protobuf, or structured markdown specifications.',
      badge: 'Input Phase',
      icon: <FileText size={20} weight="bold" />,
    },
    {
      num: '02',
      title: 'Architectural DAG Decomposition',
      subtitle: 'Dependency Ordering & Conflict Resolution',
      desc: 'The orchestrator breaks the system into non-overlapping submodules, resolving cyclic dependencies before synthesis starts.',
      badge: 'Planning Phase',
      icon: <GitBranch size={20} weight="bold" />,
    },
    {
      num: '03',
      title: 'Parallel Multi-Agent Synthesis',
      subtitle: 'Isolated Code & Test Generation',
      desc: 'Autonomous agent pods synthesize code, unit suites, and stress tests simultaneously in dedicated memory isolates.',
      badge: 'Execution Phase',
      icon: <Lightning size={20} weight="bold" />,
    },
    {
      num: '04',
      title: 'Formal Verification & Trunk Merge',
      subtitle: 'Hermetic Sandbox Proofs',
      desc: 'Only code that passes Z3 invariant proofs, compiles cleanly in WASM, and achieves 100% test passing is committed to trunk.',
      badge: 'Commit Phase',
      icon: <GitCommit size={20} weight="bold" />,
    },
  ]

  return (
    <section className="relative py-24 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
            <span>THE SYNTHESIS PIPELINE</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-white">
            From specification to verified code.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-zinc-400">
            A linearizable, deterministic compilation loop that replaces stochastic prompt guessing with mechanical guarantees.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="double-bezel group">
              <div className="double-bezel-inner p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-mono text-xl font-bold text-zinc-600 group-hover:text-emerald-400 transition-colors">
                      {st.num}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300">
                      {st.icon}
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    {st.badge}
                  </div>
                  
                  <h3 className="mt-1 text-base font-bold text-white">
                    {st.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                  <CheckCircle size={12} weight="fill" className="text-emerald-400" />
                  <span>Bit-level Determinism Guarded</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
