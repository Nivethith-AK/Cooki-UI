import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gauge, 
  TrendUp, 
  CurrencyDollar, 
  Cpu, 
  CheckCircle,
  Lightning,
  Brain
} from '@phosphor-icons/react';

export interface ModelMetric {
  id: string;
  name: string;
  provider: string;
  speedTps: number;
  ttftMs: number;
  mmluScore: number;
  inputCost: string;
  outputCost: string;
  contextWindow: string;
  accent: string;
}

const DEFAULT_MODELS: ModelMetric[] = [
  {
    id: 'claude-3-7',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    speedTps: 118,
    ttftMs: 140,
    mmluScore: 92.4,
    inputCost: '$3.00',
    outputCost: '$15.00',
    contextWindow: '200k',
    accent: '#f97316',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Omnimodal',
    provider: 'OpenAI',
    speedTps: 124,
    ttftMs: 165,
    mmluScore: 90.8,
    inputCost: '$2.50',
    outputCost: '$10.00',
    contextWindow: '128k',
    accent: '#10b981',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 Reasoner',
    provider: 'DeepSeek',
    speedTps: 84,
    ttftMs: 240,
    mmluScore: 91.2,
    inputCost: '$0.55',
    outputCost: '$2.19',
    contextWindow: '64k',
    accent: '#3b82f6',
  },
  {
    id: 'llama-3-3',
    name: 'Llama 3.3 70B Open',
    provider: 'Meta AI',
    speedTps: 165,
    ttftMs: 95,
    mmluScore: 88.6,
    inputCost: '$0.35',
    outputCost: '$0.90',
    contextWindow: '128k',
    accent: '#8b5cf6',
  },
];

export interface AiModelBenchmarkCardProps {
  initialModelId?: string;
  className?: string;
}

export const AiModelBenchmarkCard: React.FC<AiModelBenchmarkCardProps> = ({
  initialModelId = 'claude-3-7',
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState(initialModelId);
  const activeModel = DEFAULT_MODELS.find((m) => m.id === selectedId) || DEFAULT_MODELS[0];

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#07080d] p-6 shadow-2xl font-mono text-xs select-none ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Brain size={16} weight="bold" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Neural Speed & Reasoning Matrix</h3>
            <span className="text-[11px] text-zinc-500">Standardized Token Inference Telemetry</span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
          v2026.Q4
        </span>
      </div>

      {/* Model Selector Tabs */}
      <div className="my-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DEFAULT_MODELS.map((model) => {
          const isSelected = model.id === selectedId;
          return (
            <button
              key={model.id}
              onClick={() => setSelectedId(model.id)}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-100 dark:bg-white/10 border-zinc-400 dark:border-white/20 shadow-xs'
                  : 'bg-zinc-50/50 dark:bg-white/[0.02] border-zinc-200 dark:border-white/5 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase text-zinc-400 truncate">
                  {model.provider}
                </span>
                <span 
                  style={{ backgroundColor: model.accent }} 
                  className="h-1.5 w-1.5 rounded-full" 
                />
              </div>
              <div className="font-bold text-zinc-900 dark:text-white text-[11px] truncate">
                {model.name.split(' ')[0]} {model.name.split(' ')[1] || ''}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Benchmark Telemetry Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModel.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-4 rounded-2xl bg-zinc-50 dark:bg-black/60 border border-zinc-200/60 dark:border-white/5 p-4"
        >
          {/* 1. Inference Throughput Speed */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                <Lightning size={14} className="text-amber-400" />
                <span>Streaming Throughput</span>
              </span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {activeModel.speedTps} tokens/sec
              </span>
            </div>
            {/* Speed Bar */}
            <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (activeModel.speedTps / 180) * 100)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ backgroundColor: activeModel.accent }}
                className="h-full rounded-full"
              />
            </div>
          </div>

          {/* 2. Reasoning Benchmark Accuracy (MMLU) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                <TrendUp size={14} className="text-emerald-400" />
                <span>MMLU-Pro Accuracy</span>
              </span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {activeModel.mmluScore}%
              </span>
            </div>
            {/* Accuracy Bar */}
            <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activeModel.mmluScore}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
          </div>

          {/* 3. Cost & Specs Matrix Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200 dark:border-white/5 text-center">
            <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200/50 dark:border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase">Latency (TTFT)</span>
              <p className="font-bold text-zinc-900 dark:text-white mt-0.5">{activeModel.ttftMs}ms</p>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200/50 dark:border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase">Input / Output</span>
              <p className="font-bold text-zinc-900 dark:text-white mt-0.5">{activeModel.inputCost} / {activeModel.outputCost}</p>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200/50 dark:border-white/5">
              <span className="text-[10px] text-zinc-400 uppercase">Context</span>
              <p className="font-bold text-zinc-900 dark:text-white mt-0.5">{activeModel.contextWindow}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer Model Summary */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-200/80 dark:border-white/5 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle size={14} className="text-emerald-400" />
          <span>Speculative Decoding Supported</span>
        </span>
        <span className="text-zinc-500 font-bold uppercase">Zero Batch Queue</span>
      </div>
    </div>
  );
};
