import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  ShieldCheck, 
  Database, 
  GitMerge, 
  LockKey, 
  ArrowsSplit, 
  Terminal, 
  Check, 
  Lightning, 
  ShareNetwork 
} from '@phosphor-icons/react'

export const ArchitectureBento: React.FC = () => {
  const [sandboxStep, setSandboxStep] = useState(2)
  const [isSimulatingVote, setIsSimulatingVote] = useState(false)
  const [quorumVotes, setQuorumVotes] = useState(3)

  const handleSimulateVote = () => {
    setIsSimulatingVote(true)
    setTimeout(() => {
      setQuorumVotes((prev) => (prev >= 4 ? 3 : prev + 1))
      setIsSimulatingVote(false)
    }, 400)
  }

  return (
    <section id="architecture" className="relative py-24 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Eyebrow & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
            <span>CORE SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineered for determinism.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-zinc-400">
            A radical departure from unverified token predictors. COOK is built from the ground up as a hermetic compiler runtime.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 8-Column Hero Bento Card (Compiler Sandbox) */}
          <div className="md:col-span-8 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white">
                      <Cpu size={20} weight="bold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Hermetic Compiler Sandbox</h3>
                      <p className="text-xs font-mono text-zinc-400">ISOLATED WASM MEMORY BOUNDARIES</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-[11px] font-mono text-emerald-300">
                    AIR-GAPPED
                  </span>
                </div>

                <p className="mt-4 text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  Every code change executes inside a clean, deterministic virtual sandbox. The runtime measures memory allocations, verifies zero side-effects, and asserts exact byte-level compiler outputs across multiple OS targets.
                </p>

                {/* Interactive Stepper within Card */}
                <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 text-zinc-400 text-[11px]">
                    <span>SANDBOX PROCESS REEL</span>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((step) => (
                        <button
                          key={step}
                          onClick={() => setSandboxStep(step)}
                          className={`h-5 w-5 rounded text-[10px] flex items-center justify-center transition-all ${
                            sandboxStep === step
                              ? 'bg-white text-zinc-950 font-bold'
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                        >
                          {step + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {sandboxStep === 0 && (
                      <div className="text-zinc-300">
                        <span className="text-emerald-400">&gt; ISOLATE_INIT:</span> Allocated 64MB linear WASM memory block. Environment variables scrubbed.
                      </div>
                    )}
                    {sandboxStep === 1 && (
                      <div className="text-zinc-300">
                        <span className="text-amber-400">&gt; CODEGEN_EXEC:</span> Emitted 14 functions. Bytecode validated against Wasm-Spec v2.
                      </div>
                    )}
                    {sandboxStep === 2 && (
                      <div className="text-zinc-300">
                        <span className="text-emerald-400">&gt; PROOF_SOLVE:</span> All 12 loop invariants proven terminate in &lt; 200us. Zero unbounded recursion.
                      </div>
                    )}
                    {sandboxStep === 3 && (
                      <div className="text-zinc-300">
                        <span className="text-cyan-400">&gt; ARTIFACT_SEAL:</span> Generated commit digest <span className="underline">sha256:8f4c2e...b9a</span>. Ready for trunk merge.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                <span>Deterministic Seed: 0xDEADBEEF</span>
                <span>Bit-Reproducible Multi-Arch Support</span>
              </div>
            </div>
          </div>

          {/* Card 2: 4-Column Card (Persistent Context Graph) */}
          <div className="md:col-span-4 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white">
                  <Database size={20} weight="bold" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Context DAG</h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">DIRECTED ACYCLIC GRAPH</p>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  Instead of flat, lossy chat buffers, COOK maintains a persistent dependency graph of your whole monorepo's types, exports, and call-trees.
                </p>

                <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs space-y-2">
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>REPO NODES</span>
                    <span className="text-emerald-400">142,890 EDGES</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[84%]"></div>
                  </div>
                  <div className="text-[10px] text-zinc-500 pt-1">
                    Semantic AST cache warm &bull; 0ms retrieval lag
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                Zero Token Truncation
              </div>
            </div>
          </div>

          {/* Card 3: 4-Column Card (Zero-Hallucination Invariant Engine) */}
          <div className="md:col-span-4 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white">
                  <ShieldCheck size={20} weight="bold" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Formal Verifier</h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">SMT CONSTRAINT SOLVER</p>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  Every function is verified with formal first-order logic. Non-terminating loops and invalid type assertions are rejected prior to emission.
                </p>

                <div className="mt-6 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-900 border border-white/5 p-2 text-zinc-200">
                    <span>Deadlock Freedom</span>
                    <span className="text-emerald-400 font-bold">&radic; PROVEN</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-900 border border-white/5 p-2 text-zinc-200">
                    <span>Bounds Safety</span>
                    <span className="text-emerald-400 font-bold">&radic; PROVEN</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                Powered by Z3 & Custom SMT Proofs
              </div>
            </div>
          </div>

          {/* Card 4: 8-Column Card (Multi-Agent Consensus) */}
          <div className="md:col-span-8 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-white">
                      <ShareNetwork size={20} weight="bold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Multi-Agent Consensus</h3>
                      <p className="text-xs font-mono text-zinc-400">RAFT-INSPIRED ARBITRATION PROTOCOL</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSimulateVote}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-mono text-white hover:bg-white/20 transition-all active:scale-95"
                  >
                    {isSimulatingVote ? 'Voting...' : 'Simulate Quorum'}
                  </button>
                </div>

                <p className="mt-4 text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  Synthesizing software is never left to a single unbounded prompt. Specialized agents (Architect, Security Auditor, Synthesizer, Benchmark Runner) cast cryptographic votes on proposed system diffs before trunk acceptance.
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { node: 'Architect', role: 'Spec Matching', voted: true },
                    { node: 'Security', role: 'CVE & Leak Audit', voted: true },
                    { node: 'Benchmarking', role: 'P99 Latency & Alloc', voted: quorumVotes >= 3 },
                    { node: 'Gatekeeper', role: 'Final Quorum Seal', voted: quorumVotes >= 4 },
                  ].map((vote) => (
                    <div
                      key={vote.node}
                      className={`rounded-xl border p-3 font-mono text-xs transition-all ${
                        vote.voted
                          ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                          : 'border-white/5 bg-zinc-900/30 text-zinc-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{vote.node}</span>
                        {vote.voted ? (
                          <Check size={14} className="text-emerald-400" />
                        ) : (
                          <span className="text-[10px] text-zinc-600">WAITING</span>
                        )}
                      </div>
                      <div className="mt-1 text-[11px] font-sans text-zinc-400">{vote.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                <span>Quorum Status: {quorumVotes >= 3 ? 'SUPERMAJORITY REACHED' : 'AWAITING VOTES'}</span>
                <span>Zero Single-Point-of-Failure</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
