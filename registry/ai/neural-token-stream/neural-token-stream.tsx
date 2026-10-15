import React, { useState, useEffect, useRef } from 'react';
import { Brain, Cpu, Play, ArrowClockwise, CheckCircle, Lightning, CaretRight } from '@phosphor-icons/react';

export interface NeuralTokenStreamProps {
  modelName?: string;
  streamingSpeedMs?: number;
  showProbabilities?: boolean;
  className?: string;
}

interface TokenData {
  text: string;
  prob: number; // 0 to 1
  isReasoning?: boolean;
}

const DEFAULT_TOKENS: TokenData[] = [
  { text: "Analyzing", prob: 0.98, isReasoning: true },
  { text: " system", prob: 0.96, isReasoning: true },
  { text: " constraints...", prob: 0.92, isReasoning: true },
  { text: " Verified.", prob: 0.99, isReasoning: true },
  { text: "The", prob: 0.94 },
  { text: " optimal", prob: 0.89 },
  { text: " distributed", prob: 0.97 },
  { text: " cache", prob: 0.95 },
  { text: " strategy", prob: 0.92 },
  { text: " involves", prob: 0.88 },
  { text: " dynamic", prob: 0.93 },
  { text: " multi-region", prob: 0.96 },
  { text: " read", prob: 0.91 },
  { text: " replicas", prob: 0.97 },
  { text: " with", prob: 0.99 },
  { text: " Raft", prob: 0.95 },
  { text: " consensus", prob: 0.98 },
  { text: " for", prob: 0.99 },
  { text: " atomic", prob: 0.94 },
  { text: " writes.", prob: 0.99 }
];

export const NeuralTokenStream: React.FC<NeuralTokenStreamProps> = ({
  modelName = "Nexus-70B-MoE",
  streamingSpeedMs = 75,
  showProbabilities = true,
  className = ""
}) => {
  const [tokenIndex, setTokenIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isGenerating) return;

    if (tokenIndex < DEFAULT_TOKENS.length) {
      timerRef.current = setTimeout(() => {
        setTokenIndex(prev => prev + 1);
      }, streamingSpeedMs);
    } else {
      setIsGenerating(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tokenIndex, isGenerating, streamingSpeedMs]);

  const handleRestart = () => {
    setTokenIndex(0);
    setIsGenerating(true);
    setSelectedToken(null);
  };

  const visibleTokens = DEFAULT_TOKENS.slice(0, tokenIndex);
  const reasoningTokens = visibleTokens.filter(t => t.isReasoning);
  const outputTokens = visibleTokens.filter(t => !t.isReasoning);
  const currentToken = visibleTokens[visibleTokens.length - 1];

  const getConfidenceColor = (prob: number) => {
    if (prob >= 0.95) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (prob >= 0.90) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  };

  return (
    <div className={`w-full max-w-2xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#07080d] p-6 shadow-2xl backdrop-blur-xl font-mono text-xs select-none ${className}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <Brain size={18} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{modelName}</h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                MoE FP8
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">Live Top-1 Logprob Tokenization</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Restart Token Stream"
          >
            <ArrowClockwise size={13} weight="bold" className={isGenerating ? "animate-spin" : ""} />
            <span className="text-[11px]">Replay</span>
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 p-3 rounded-2xl bg-zinc-100/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 text-[11px]">
        <div>
          <span className="text-zinc-400 block text-[10px]">OUTPUT TOKENS</span>
          <span className="font-bold text-zinc-900 dark:text-white">{outputTokens.length} / 16</span>
        </div>
        <div>
          <span className="text-zinc-400 block text-[10px]">THROUGHPUT</span>
          <span className="font-bold text-cyan-400">{isGenerating ? '94.2 tok/s' : '0.0 tok/s'}</span>
        </div>
        <div>
          <span className="text-zinc-400 block text-[10px]">AVG LOGPROB</span>
          <span className="font-bold text-emerald-400">95.4%</span>
        </div>
        <div>
          <span className="text-zinc-400 block text-[10px]">TTFT</span>
          <span className="font-bold text-violet-400">18.2ms</span>
        </div>
      </div>

      {/* Thinking / Reasoning Accordion */}
      {reasoningTokens.length > 0 && (
        <div className="mb-4 p-3 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/5">
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
            <Cpu size={12} weight="bold" className="text-violet-400" />
            <span>Reasoning Chain</span>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-xs italic">
            {reasoningTokens.map((t, idx) => (
              <span key={idx} className="transition-opacity duration-150">
                {t.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Generated Content Viewport with interactive token inspector */}
      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-200/80 dark:border-white/10 min-h-[90px] leading-relaxed">
        {outputTokens.map((t, idx) => {
          const isSelected = selectedToken?.text === t.text;
          return (
            <span
              key={idx}
              onClick={() => setSelectedToken(t)}
              className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-all duration-150 hover:bg-violet-500/20 hover:text-violet-300 ${
                isSelected ? 'bg-violet-500/30 text-violet-300 ring-1 ring-violet-400' : 'text-zinc-800 dark:text-zinc-100'
              }`}
            >
              {t.text}
            </span>
          );
        })}

        {/* Streaming Glow Caret */}
        {isGenerating && (
          <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse rounded-xs shadow-[0_0_8px_rgba(6,182,212,0.8)] align-middle" />
        )}
      </div>

      {/* Token Inspector Drawer */}
      {showProbabilities && selectedToken && (
        <div className="mt-3 p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px] animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Token:</span>
            <code className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 font-bold text-zinc-900 dark:text-white">
              "{selectedToken.text}"
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Logprob Confidence:</span>
            <span className={`px-2 py-0.5 rounded-full font-bold border ${getConfidenceColor(selectedToken.prob)}`}>
              {(selectedToken.prob * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
