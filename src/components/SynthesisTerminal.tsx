import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, CheckCircle, Play, ArrowClockwise, Copy, Check, ShieldCheck, Sparkle, GitCommit } from '@phosphor-icons/react'
import { SpecPreset } from '../types'

const PRESETS: SpecPreset[] = [
  {
    id: 'consensus',
    title: 'Raft Consensus Cache',
    category: 'Distributed Systems',
    spec: 'spec: In-memory fault-tolerant key-value cluster with leader election and deterministic log replication quorum.',
    language: 'rust',
    metrics: {
      compileTime: '184ms',
      invariantsProven: 14,
      astNodes: 2840,
      safetyScore: '100% Deterministic',
    },
    codeSnippet: `// Synthesized by COOK Kernel v2.4 (Formal Raft Module)
pub struct RaftQuorumState<T: Serializable> {
    current_term: AtomicU64,
    voted_for: Option<NodeId>,
    log_commit_index: usize,
    entries: Arc<RwLock<Vec<LogEntry<T>>>>,
    invariant_witness: FormalProof<QuorumSafety>,
}

impl<T: Serializable> RaftQuorumState<T> {
    #[inline(always)]
    pub async fn apply_committed_batch(&self, quorum_size: usize) -> Result<IndexRange, QuorumError> {
        let guard = self.entries.read().await;
        // Deterministic invariant check: Leader Completeness
        debug_assert!(self.invariant_witness.verify_subquorum(&guard));
        Ok(guard.drain_committed(quorum_size))
    }
}`,
  },
  {
    id: 'eventsourcing',
    title: 'Zero-Allocation Event Bus',
    category: 'High-Throughput Kernel',
    spec: 'spec: Lock-free ring buffer pub/sub with mechanical sympathy and deterministic event replay ordering.',
    language: 'typescript',
    metrics: {
      compileTime: '92ms',
      invariantsProven: 8,
      astNodes: 1420,
      safetyScore: 'Zero-Copy Proven',
    },
    codeSnippet: `// Synthesized by COOK Kernel v2.4 (Ring Buffer Stream)
export class DeterministicRingBus<TMessage extends FlatBufferPayload> {
  private readonly cursor = new SharedArrayBuffer(8)
  private readonly ringStorage: Uint8Array

  constructor(private readonly ringCapacity: number = 65536) {
    this.ringStorage = new Uint8Array(ringCapacity * 256)
  }

  public publishBatch(events: readonly TMessage[]): DeterministicBatchReceipt {
    const sequenceId = Atomics.add(new BigInt64Array(this.cursor), 0, BigInt(events.length))
    // Formally verified: Linearizable ordering & zero-allocation
    return { sequenceId, timestampNs: process.hrtime.bigint(), committed: true }
  }
}`,
  },
  {
    id: 'wasm-bridge',
    title: 'SIMD Vector Matrix Kernel',
    category: 'Hardware Acceleration',
    spec: 'spec: Portable 512-bit vector math tensor operations with automatic fallback and memory bound assertions.',
    language: 'zig',
    metrics: {
      compileTime: '135ms',
      invariantsProven: 19,
      astNodes: 3190,
      safetyScore: 'Memory Bound Verified',
    },
    codeSnippet: `// Synthesized by COOK Kernel v2.4 (SIMD Vector Engine)
const std = @import("std");
pub fn matmul_simd_f32(
    comptime N: usize,
    a: *const [N][N]f32,
    b: *const [N][N]f32,
    out: *[N][N]f32
) void {
    // Formal Invariant: Memory safety bounds statically enforced
    comptime std.debug.assert(N % 16 == 0);
    @setFloatMode(.optimized);
    for (0..N) |i| {
        for (0..N) |j| {
            out[i][j] = @reduce(.Add, a[i] * b[j]);
        }
    }
}`,
  },
]

export const SynthesisTerminal: React.FC = () => {
  const [activePreset, setActivePreset] = useState<SpecPreset>(PRESETS[0])
  const [isSynthesizing, setIsSynthesizing] = useState(false)
  const [currentStep, setCurrentStep] = useState(3)
  const [copied, setCopied] = useState(false)

  const steps = [
    { title: 'Spec Ingestion & Lexing', agent: 'Architect Agent', time: '14ms' },
    { title: 'AST Decomposition & DAG Build', agent: 'Synthesizer Agent', time: '48ms' },
    { title: 'Constraint & Invariant Solver', agent: 'Formal Verifier', time: '82ms' },
    { title: 'Deterministic Bit-Emitted Kernel', agent: 'Emission Runtime', time: '184ms' },
  ]

  const handleTriggerSynthesis = (preset: SpecPreset) => {
    setActivePreset(preset)
    setIsSynthesizing(true)
    setCurrentStep(0)
  }

  useEffect(() => {
    if (!isSynthesizing) return

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 3) {
          setIsSynthesizing(false)
          clearInterval(timer)
          return 3
        }
        return prev + 1
      })
    }, 280)

    return () => clearInterval(timer)
  }, [isSynthesizing])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activePreset.codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Double-Bezel Architecture */}
      <div className="double-bezel shadow-2xl shadow-black/80">
        <div className="double-bezel-inner p-4 sm:p-6 overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-zinc-700/80"></div>
                <div className="h-3 w-3 rounded-full bg-zinc-700/80"></div>
                <div className="h-3 w-3 rounded-full bg-zinc-700/80"></div>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Terminal size={14} className="text-zinc-300" />
                <span className="text-zinc-200">cook-runtime</span>
                <span className="text-zinc-500">/</span>
                <span className="text-emerald-400">spec-engine</span>
              </div>
            </div>

            {/* Spec Preset Selectors */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleTriggerSynthesis(p)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                    activePreset.id === p.id
                      ? 'bg-zinc-800 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Specification Input Banner */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-zinc-900/60 p-3 font-mono text-xs text-zinc-300">
            <div className="flex items-start sm:items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-zinc-400">cook synthesize</span>
              <span className="text-zinc-200 font-medium break-all">"{activePreset.spec}"</span>
            </div>
            <button
              onClick={() => handleTriggerSynthesis(activePreset)}
              disabled={isSynthesizing}
              className="flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-sans font-medium text-white transition-all hover:bg-white/20 active:scale-95 disabled:opacity-50"
            >
              <ArrowClockwise size={12} className={isSynthesizing ? 'animate-spin' : ''} />
              <span>{isSynthesizing ? 'Synthesizing...' : 'Re-verify'}</span>
            </button>
          </div>

          {/* Pipeline Trace Visualizer */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-white/10 pb-4">
            {steps.map((st, i) => {
              const isDone = currentStep >= i
              const isCurrent = currentStep === i && isSynthesizing
              return (
                <div
                  key={st.title}
                  className={`rounded-xl border p-2.5 transition-all ${
                    isDone
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                      : 'border-white/5 bg-zinc-900/30 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">STEP 0{i + 1}</span>
                    {isDone ? (
                      <CheckCircle size={12} weight="fill" className="text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
                    ) : (
                      <span className="text-zinc-600">IDLE</span>
                    )}
                  </div>
                  <div className="mt-1 font-sans text-xs font-medium text-zinc-200 truncate">
                    {st.title}
                  </div>
                  <div className="mt-0.5 text-[10px] font-mono text-zinc-400 flex justify-between">
                    <span>{st.agent}</span>
                    <span>{st.time}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Code Output Window */}
          <div className="mt-4 relative rounded-xl border border-white/10 bg-[#060608] p-4 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-white/5 mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>EMITTED ARTIFACT ({activePreset.language.toUpperCase()})</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-zinc-400">AST Nodes: {activePreset.metrics.astNodes}</span>
                <span className="text-emerald-400 font-semibold">{activePreset.metrics.safetyScore}</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Copy code snippet"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap select-all">
              {activePreset.codeSnippet}
            </pre>
          </div>

          {/* Real-time Verification Telemetry Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck size={14} className="text-emerald-400" />
                Invariants Proven: {activePreset.metrics.invariantsProven}
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300">Deterministic Latency: {activePreset.metrics.compileTime}</span>
            </div>
            <div className="text-zinc-500">
              WASM Container Sandboxed &bull; Bit-reproducible SHA256 Verified
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
