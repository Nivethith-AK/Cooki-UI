import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Brain, 
  Database, 
  ShieldCheck, 
  Circle,
  Pulse,
  HardDrives
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export interface TopologyNode {
  id: string;
  name: string;
  type: 'gateway' | 'compute' | 'database' | 'security';
  latency: string;
  throughput: string;
  status: 'healthy' | 'active' | 'synced';
  load: string;
  x: number; // percentage in graph canvas
  y: number; // percentage in graph canvas
}

const DEFAULT_NODES: TopologyNode[] = [
  { id: 'gateway', name: 'Edge Ingress API', type: 'gateway', latency: '2.1ms', throughput: '48.2k req/s', status: 'healthy', load: '32%', x: 14, y: 50 },
  { id: 'auth', name: 'Zero-Trust Auth', type: 'security', latency: '4.8ms', throughput: '22.1k req/s', status: 'healthy', load: '18%', x: 45, y: 26 },
  { id: 'ai-engine', name: 'AI Inference Swarm', type: 'compute', latency: '18.4ms', throughput: '12.4k req/s', status: 'active', load: '68%', x: 45, y: 74 },
  { id: 'cache', name: 'Distributed Redis', type: 'database', latency: '0.8ms', throughput: '94.0k req/s', status: 'healthy', load: '41%', x: 82, y: 26 },
  { id: 'postgres', name: 'Postgres Vector DB', type: 'database', latency: '6.2ms', throughput: '8.6k req/s', status: 'synced', load: '24%', x: 82, y: 74 },
];

export interface SystemArchitectureGraphProps {
  interactive?: boolean;
  activePacketPulse?: boolean;
  className?: string;
}

export const SystemArchitectureGraph: React.FC<SystemArchitectureGraphProps> = ({
  interactive = true,
  activePacketPulse = true,
  className = '',
}) => {
  const [selectedNode, setSelectedNode] = useState<TopologyNode>(DEFAULT_NODES[0]);

  const getNodeIcon = (type: TopologyNode['type']) => {
    switch (type) {
      case 'gateway': return <Globe size={16} weight="bold" className="text-cyan-400" />;
      case 'compute': return <Brain size={16} weight="bold" className="text-violet-400" />;
      case 'security': return <ShieldCheck size={16} weight="bold" className="text-emerald-400" />;
      case 'database': return <Database size={16} weight="bold" className="text-amber-400" />;
    }
  };

  // Dedicated clean paths in 1000x500 coordinate space
  const paths = [
    { id: 'gw-auth', d: 'M 140 250 C 290 250, 300 130, 450 130', from: 'gateway', to: 'auth', grad: 'cyanEmerald' },
    { id: 'gw-ai', d: 'M 140 250 C 290 250, 300 370, 450 370', from: 'gateway', to: 'ai-engine', grad: 'cyanViolet' },
    { id: 'auth-cache', d: 'M 450 130 C 600 130, 670 130, 820 130', from: 'auth', to: 'cache', grad: 'emeraldAmber' },
    { id: 'ai-db', d: 'M 450 370 C 600 370, 670 370, 820 370', from: 'ai-engine', to: 'postgres', grad: 'violetAmber' },
    { id: 'auth-ai', d: 'M 450 130 C 420 200, 420 300, 450 370', from: 'auth', to: 'ai-engine', grad: 'emeraldViolet' },
    { id: 'cache-db', d: 'M 820 130 C 850 200, 850 300, 820 370', from: 'cache', to: 'postgres', grad: 'amberEmerald' },
  ];

  return (
    <div className={cn(
      'w-full max-w-3xl mx-auto rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/95 dark:bg-[#07080d] p-5 shadow-2xl font-mono text-xs select-none backdrop-blur-xl',
      className
    )}>
      {/* Dynamic Keyframes for Packet Flow Pulses */}
      <style>{`
        @keyframes topoPacketPulse {
          0% { stroke-dashoffset: 56; }
          100% { stroke-dashoffset: 0; }
        }
        .topo-packet-flow {
          animation: topoPacketPulse 1.8s linear infinite;
        }
        .topo-packet-flow-fast {
          animation: topoPacketPulse 1.3s linear infinite;
        }
      `}</style>

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Pulse size={15} weight="bold" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs leading-none">Distributed Topo-Mesh</h3>
            <span className="text-[10px] text-zinc-400">Live Traffic & Packet Flow Analysis</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
            <Circle size={7} weight="fill" className="text-emerald-400 animate-pulse" />
            <span>5 Nodes Active</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300">
            99.998% UPTIME
          </span>
        </div>
      </div>

      {/* Main Interactive Topology Mesh Area */}
      <div className="relative my-4 h-64 sm:h-72 w-full rounded-2xl bg-zinc-50/80 dark:bg-black/60 border border-zinc-200/60 dark:border-white/5 overflow-hidden">
        {/* Subtle grid dot matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#6b728025_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* SVG Bezier Connection Lines */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="cyanEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="cyanViolet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="emeraldAmber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="violetAmber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="emeraldViolet" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="amberEmerald" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Base Wireframe Paths */}
          {paths.map((p) => {
            const isConnected = selectedNode.id === p.from || selectedNode.id === p.to;
            return (
              <path
                key={`base-${p.id}`}
                d={p.d}
                fill="none"
                stroke="currentColor"
                strokeWidth={isConnected ? 2.5 : 1.5}
                className={cn(
                  'transition-all duration-300',
                  isConnected
                    ? 'text-zinc-600 dark:text-zinc-300'
                    : 'text-zinc-200 dark:text-white/10'
                )}
              />
            );
          })}

          {/* Glowing Animated Packet Pulses */}
          {activePacketPulse &&
            paths.map((p, idx) => (
              <path
                key={`pulse-${p.id}`}
                d={p.d}
                fill="none"
                stroke={`url(#${p.grad})`}
                strokeWidth="3"
                strokeDasharray="10 46"
                strokeLinecap="round"
                className={idx % 2 === 0 ? 'topo-packet-flow' : 'topo-packet-flow-fast'}
              />
            ))}
        </svg>

        {/* Nodes Placed with Percentage Coordinates */}
        {DEFAULT_NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => interactive && setSelectedNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            >
              <div
                className={cn(
                  'relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-200',
                  isSelected
                    ? 'bg-white dark:bg-zinc-900 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.35)] scale-105'
                    : 'bg-white/95 dark:bg-zinc-900/90 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 shadow-md'
                )}
              >
                {/* Node Type Icon */}
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/5 shrink-0">
                  {getNodeIcon(node.type)}
                </div>

                <div className="flex flex-col pr-1">
                  <span className="font-bold text-zinc-900 dark:text-white text-[10px] leading-tight whitespace-nowrap">
                    {node.name}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono">
                    {node.latency}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Telemetry Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-semibold uppercase text-[10px]">SELECTED:</span>
          <span className="font-bold text-zinc-900 dark:text-white text-[11px]">{selectedNode.name}</span>
          <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
            {selectedNode.status}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
          <span>Latency: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNode.latency}</strong></span>
          <span>Load: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNode.throughput}</strong></span>
          <span>Util: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNode.load}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitectureGraph;
