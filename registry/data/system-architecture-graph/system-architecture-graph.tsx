import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Cpu, 
  Database, 
  ShieldCheck, 
  CloudCheck, 
  HardDrives,
  Circle,
  Pulse
} from '@phosphor-icons/react';

export interface TopologyNode {
  id: string;
  name: string;
  type: 'gateway' | 'compute' | 'database' | 'security';
  latency: string;
  throughput: string;
  status: 'healthy' | 'active' | 'standby';
  x: number; // percentage in graph canvas
  y: number; // percentage in graph canvas
}

const DEFAULT_NODES: TopologyNode[] = [
  { id: 'gateway', name: 'Edge Ingress API', type: 'gateway', latency: '2.1ms', throughput: '48.2k req/s', status: 'healthy', x: 12, y: 50 },
  { id: 'auth', name: 'Zero-Trust Auth', type: 'security', latency: '4.8ms', throughput: '22.1k req/s', status: 'healthy', x: 44, y: 22 },
  { id: 'ai-engine', name: 'AI Inference Swarm', type: 'compute', latency: '18.4ms', throughput: '12.4k req/s', status: 'active', x: 44, y: 78 },
  { id: 'cache', name: 'Distributed Redis', type: 'database', latency: '0.8ms', throughput: '94.0k req/s', status: 'healthy', x: 86, y: 30 },
  { id: 'postgres', name: 'Postgres Vector DB', type: 'database', latency: '6.2ms', throughput: '8.6k req/s', status: 'healthy', x: 86, y: 72 },
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
      case 'gateway': return <Globe size={18} weight="bold" className="text-cyan-400" />;
      case 'compute': return <Cpu size={18} weight="bold" className="text-violet-400" />;
      case 'security': return <ShieldCheck size={18} weight="bold" className="text-emerald-400" />;
      case 'database': return <Database size={18} weight="bold" className="text-amber-400" />;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#07080d] p-6 shadow-2xl font-mono text-xs select-none ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Pulse size={16} weight="bold" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Distributed Topo-Mesh</h3>
            <span className="text-[11px] text-zinc-500">Live Traffic & Packet Flow Analysis</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <Circle size={8} weight="fill" className="text-emerald-400 animate-pulse" />
            <span>5 Nodes Active</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300">
            99.998% UPTIME
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative my-6 h-72 sm:h-80 w-full rounded-2xl bg-zinc-50 dark:bg-black/60 border border-zinc-200/60 dark:border-white/5 overflow-hidden">
        {/* Subtle grid dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#6b728020_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* SVG Bezier Connection Lines */}
        <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="cyanViolet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="violetAmber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Lines from Gateway (120, 250) to Auth (440, 110) and AI (440, 390) */}
          <path d="M 120 250 C 280 250, 280 110, 440 110" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-white/15" />
          <path d="M 120 250 C 280 250, 280 390, 440 390" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-white/15" />

          {/* Lines from Auth (440, 110) to Cache (860, 150) */}
          <path d="M 440 110 C 650 110, 650 150, 860 150" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-white/15" />

          {/* Lines from AI (440, 390) to Cache (860, 150) and Postgres (860, 360) */}
          <path d="M 440 390 C 650 390, 650 150, 860 150" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-white/15" />
          <path d="M 440 390 C 650 390, 650 360, 860 360" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-white/15" />

          {/* Animated Glowing Packet Pulses */}
          {activePacketPulse && (
            <>
              <path
                d="M 120 250 C 280 250, 280 110, 440 110"
                fill="none"
                stroke="url(#cyanViolet)"
                strokeWidth="3"
                strokeDasharray="8 48"
                className="animate-[dash_2s_linear_infinite]"
              />
              <path
                d="M 120 250 C 280 250, 280 390, 440 390"
                fill="none"
                stroke="url(#cyanViolet)"
                strokeWidth="3"
                strokeDasharray="8 48"
                className="animate-[dash_2.4s_linear_infinite]"
              />
              <path
                d="M 440 390 C 650 390, 650 360, 860 360"
                fill="none"
                stroke="url(#violetAmber)"
                strokeWidth="3"
                strokeDasharray="8 48"
                className="animate-[dash_1.8s_linear_infinite]"
              />
            </>
          )}
        </svg>

        {/* Nodes Placed Absolutes */}
        {DEFAULT_NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => interactive && setSelectedNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            >
              <div className={`relative flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-white dark:bg-zinc-900 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105'
                  : 'bg-white/90 dark:bg-zinc-900/90 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 shadow-md'
              }`}>
                {/* Node Type Icon */}
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5">
                  {getNodeIcon(node.type)}
                </div>

                <div className="hidden sm:flex flex-col pr-1">
                  <span className="font-bold text-zinc-900 dark:text-white text-[11px] leading-tight">
                    {node.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {node.latency}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Inspector Footer Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-semibold uppercase text-[11px]">Selected:</span>
          <span className="font-bold text-zinc-900 dark:text-white">{selectedNode.name}</span>
          <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
            {selectedNode.status}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
          <span>Latency: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNode.latency}</strong></span>
          <span>Load: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNode.throughput}</strong></span>
        </div>
      </div>
    </div>
  );
};
