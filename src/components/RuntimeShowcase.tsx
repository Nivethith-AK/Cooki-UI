import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GitFork, 
  ShieldCheck, 
  FileCode, 
  Cpu, 
  TreeStructure, 
  Lightning, 
  CheckCircle, 
  Sliders, 
  ArrowsClockwise, 
  Check, 
  WarningCircle 
} from '@phosphor-icons/react'

type CanvasMode = 'nodes' | 'invariants' | 'diff'

interface AgentNode {
  id: string
  name: string
  role: string
  status: 'active' | 'syncing' | 'verified'
  load: string
  description: string
  invariants: string[]
}

const AGENTS: AgentNode[] = [
  {
    id: 'a1',
    name: 'Arch-01',
    role: 'Decomposition Engine',
    status: 'verified',
    load: '12% CPU',
    description: 'Deconstructs natural specification into typed AST contracts and formal dependency DAGs.',
    invariants: ['Total Type Completeness', 'Acyclic Dependency Proof'],
  },
  {
    id: 'a2',
    name: 'Synth-02',
    role: 'Kernel Synthesizer',
    status: 'active',
    load: '88% CPU',
    description: 'Generates low-level implementations targeting zero-copy, cache-coherent memory layouts.',
    invariants: ['Zero Allocation Invariant', 'Memory Alignment 64B'],
  },
  {
    id: 'a3',
    name: 'Verify-03',
    role: 'Formal SMT Solver',
    status: 'verified',
    load: '45% CPU',
    description: 'Executes Z3-powered constraint proofs verifying deadlock-freedom and linearizability.',
    invariants: ['Quorum Leader Safety', 'State Machine Determinism'],
  },
  {
    id: 'a4',
    name: 'Audit-04',
    role: 'Sandboxed Gatekeeper',
    status: 'verified',
    load: '19% CPU',
    description: 'Compiles in isolated WASM sandbox; asserts bit-for-bit SHA256 reproducibility before Git merge.',
    invariants: ['Hermetic Build Reproducibility', 'Zero Dynamic Leaks'],
  },
]

export const RuntimeShowcase: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CanvasMode>('nodes')
  const [selectedAgent, setSelectedAgent] = useState<AgentNode>(AGENTS[0])
  const [simulatedExecution, setSimulatedExecution] = useState(false)

  const triggerStepSim = () => {
    setSimulatedExecution(true)
    setTimeout(() => setSimulatedExecution(false), 1200)
  }

  return (
    <section id="runtime" className="relative py-24 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section Eyebrow & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
            <span>INTERACTIVE WORKBENCH</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-white">
            The COOK Runtime Canvas.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-zinc-400">
            Inspect how the autonomous kernel decomposes specifications, coordinates agent sub-systems, and mathematically validates code before compilation.
          </p>
        </div>

        {/* Studio Controls Header */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase px-2">Mode:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setActiveMode('nodes')}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  activeMode === 'nodes'
                    ? 'bg-white text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TreeStructure size={14} />
                <span>Agent Choreography</span>
              </button>
              <button
                onClick={() => setActiveMode('invariants')}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  activeMode === 'invariants'
                    ? 'bg-white text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck size={14} />
                <span>Verification Matrix</span>
              </button>
              <button
                onClick={() => setActiveMode('diff')}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  activeMode === 'diff'
                    ? 'bg-white text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileCode size={14} />
                <span>Semantic Diff Auditor</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerStepSim}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:bg-white/10 transition-colors"
            >
              <ArrowsClockwise size={13} className={simulatedExecution ? 'animate-spin text-emerald-400' : ''} />
              <span>Step Consensus Cycle</span>
            </button>
          </div>
        </div>

        {/* Main Canvas Box with Double-Bezel Hardening */}
        <div className="mt-4 double-bezel shadow-2xl">
          <div className="double-bezel-inner min-h-[460px] p-6 relative overflow-hidden bg-grid-dots">
            
            {/* View 1: Agent Choreography */}
            {activeMode === 'nodes' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Node Pipeline Map */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/5">
                    <span>MULTI-AGENT CONCURRENT DAG</span>
                    <span className="text-emerald-400">HERMETIC EXECUTION</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {AGENTS.map((agent, idx) => {
                      const isSelected = selectedAgent.id === agent.id
                      return (
                        <div
                          key={agent.id}
                          onClick={() => setSelectedAgent(agent)}
                          className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 relative ${
                            isSelected
                              ? 'border-white/40 bg-zinc-900/90 shadow-xl'
                              : 'border-white/10 bg-zinc-950/60 hover:border-white/20 hover:bg-zinc-900/40'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-400 font-semibold">{agent.name}</span>
                            <span className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              {agent.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="mt-2 text-sm font-semibold text-white">
                            {agent.role}
                          </div>
                          
                          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                            {agent.description}
                          </p>

                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                            <span>Telemetry: {agent.load}</span>
                            <span className="text-zinc-400">Node {idx + 1} of 4</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Pipeline Directed Channel Status */}
                  <div className="rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Lightning size={14} className="text-amber-400" />
                      <span>Zero-IPC Shared Memory Ring: <strong className="text-white">0.08ms latency</strong></span>
                    </div>
                    <span className="text-emerald-400">Channel Loss: 0.000%</span>
                  </div>
                </div>

                {/* Node Inspector Side Panel */}
                <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-3">
                      <span>NODE INSPECTOR</span>
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-300">
                        {selectedAgent.id.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-lg font-bold text-white">{selectedAgent.role}</h4>
                      <div className="mt-1 text-xs font-mono text-emerald-400">{selectedAgent.name} // Process Active</div>
                      <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                        {selectedAgent.description}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Enforced Formal Invariants:
                      </div>
                      <div className="space-y-2">
                        {selectedAgent.invariants.map((inv) => (
                          <div key={inv} className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-white/5 p-2 text-xs font-mono text-zinc-200">
                            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                            <span className="truncate">{inv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-zinc-500">
                    Deterministic Memory Isolation active in V8 Isolate runtime.
                  </div>
                </div>

              </div>
            )}

            {/* View 2: Verification Matrix */}
            {activeMode === 'invariants' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/5">
                  <span>MATHEMATICAL INVARIANT PROOF ENGINE</span>
                  <span className="text-emerald-400">SMT SATISFIABILITY: VERIFIED</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Memory Bound & Pointer Safety',
                      target: 'Heap / Stack Ring Buffers',
                      proof: 'Array indices proven within [0, N) via static interval arithmetic.',
                      latency: '24ms',
                      verified: true,
                    },
                    {
                      title: 'Data Race & Concurrency Freedom',
                      target: 'Multi-Threaded Atomic Shards',
                      proof: 'All mutating state accesses protected by acquire-release fence invariants.',
                      latency: '41ms',
                      verified: true,
                    },
                    {
                      title: 'Quorum Linearizability',
                      target: 'Distributed Consensus Protocol',
                      proof: 'Log sequence order strictly monotonic across all simulated partitions.',
                      latency: '68ms',
                      verified: true,
                    },
                    {
                      title: 'Bit-Reproducible SHA256 Output',
                      target: 'Compiler WASM Binary Emission',
                      proof: 'Hermetic build environment yields byte-exact hash across all hosts.',
                      latency: '18ms',
                      verified: true,
                    },
                  ].map((inv) => (
                    <div key={inv.title} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-400">{inv.target}</span>
                        <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                          <CheckCircle size={14} weight="fill" />
                          PROVEN
                        </span>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white">{inv.title}</div>
                      <p className="mt-1 text-xs text-zinc-400">{inv.proof}</p>
                      <div className="mt-3 text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                        Solver Execution Time: {inv.latency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Semantic Diff Auditor */}
            {activeMode === 'diff' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/5">
                  <span>SEMANTIC AST DIFF INSPECTION</span>
                  <span className="text-emerald-400">100% SPEC SPECIFICATION COVERAGE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/60 p-4 overflow-x-auto">
                    <div className="text-zinc-500 pb-2 border-b border-white/5 mb-3 flex justify-between">
                      <span>FORMAL SPECIFICATION (INPUT)</span>
                      <span>JSON-SCHEMA</span>
                    </div>
                    <pre className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
{`{
  "entity": "RaftQuorumLeader",
  "invariants": [
    "LeaderCompleteness",
    "LogMatching",
    "StateCommitLinearizable"
  ],
  "constraints": {
    "zeroAllocation": true,
    "maxLatencyP99": "250us"
  }
}`}
                    </pre>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/60 p-4 overflow-x-auto">
                    <div className="text-zinc-500 pb-2 border-b border-white/5 mb-3 flex justify-between">
                      <span>SYNTHESIZED ABSTRACT SYNTAX TREE</span>
                      <span className="text-emerald-400">VERIFIED</span>
                    </div>
                    <pre className="text-emerald-300/90 leading-relaxed whitespace-pre-wrap">
{`+ AstNode::StructDecl("RaftQuorumLeader")
+ -> Field("atomic_term", U64, #[align(64)])
+ -> Field("quorum_witness", ProofToken)
+ -> Impl("commit_batch") {
+      assert_witness(LogMatchingProof);
+      atomic_commit();
+ }
// 0 Hallucinations Detected.`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  )
}
