import React, { useState } from 'react';
import { GitDiff, GitCommit, GitBranch, Copy, Check, ArrowsLeftRight } from '@phosphor-icons/react';

export interface CodeDiffSliderProps {
  filename?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

interface DiffLine {
  type: 'add' | 'del' | 'context';
  oldNum?: number;
  newNum?: number;
  content: string;
}

const SAMPLE_DIFF: DiffLine[] = [
  { type: 'context', oldNum: 14, newNum: 14, content: "export async function queryMesh(nodeId: string) {" },
  { type: 'context', oldNum: 15, newNum: 15, content: "  const connection = await pool.acquire();" },
  { type: 'del', oldNum: 16, content: "-  const raw = await connection.fetchTelemetry(nodeId);" },
  { type: 'del', oldNum: 17, content: "-  return JSON.parse(raw.payload);" },
  { type: 'add', newNum: 16, content: "+  // Zero-copy direct protobuf deserialization" },
  { type: 'add', newNum: 17, content: "+  const buffer = await connection.streamBytes(nodeId);" },
  { type: 'add', newNum: 18, content: "+  return TelemetryProto.decode(buffer);" },
  { type: 'context', oldNum: 18, newNum: 19, content: "}" },
];

export const CodeDiffSlider: React.FC<CodeDiffSliderProps> = ({
  filename = "src/telemetry/mesh-client.ts",
  beforeLabel = "v1.2.0 (Legacy)",
  afterLabel = "v2.0.0 (Zero-Copy)",
  className = ""
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const additions = SAMPLE_DIFF.filter(l => l.type === 'add').length;
  const deletions = SAMPLE_DIFF.filter(l => l.type === 'del').length;

  const handleCopy = () => {
    const raw = SAMPLE_DIFF.map(l => l.content).join('\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#08090e] p-6 shadow-2xl backdrop-blur-xl font-mono text-xs select-none ${className}`}>
      {/* Diff Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <GitDiff size={18} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-900 dark:text-white text-sm">{filename}</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-zinc-100 dark:bg-white/5 text-zinc-400 border border-zinc-200 dark:border-white/10">
                <GitBranch size={10} />
                <span>main</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-0.5">
              <span className="text-emerald-500 font-bold">+{additions}</span>
              <span className="text-rose-500 font-bold">-{deletions}</span>
              <span className="flex items-center gap-1 font-mono text-zinc-500">
                <GitCommit size={12} />
                <span>8b3f21a</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle view */}
          <div className="flex items-center rounded-xl bg-zinc-100 dark:bg-white/5 p-1 border border-zinc-200 dark:border-white/10 text-[11px]">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-bold ${
                viewMode === 'split' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              Slider
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-bold ${
                viewMode === 'unified' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              Unified
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Copy patch diff"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Main Diff Code Display */}
      {viewMode === 'unified' ? (
        <div className="my-5 rounded-2xl bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/10 overflow-hidden text-[11px]">
          {SAMPLE_DIFF.map((line, idx) => {
            const isAdd = line.type === 'add';
            const isDel = line.type === 'del';
            return (
              <div
                key={idx}
                className={`flex items-center px-3 py-1 font-mono transition-colors ${
                  isAdd ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-l-2 border-emerald-500' :
                  isDel ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-l-2 border-rose-500 line-through opacity-75' :
                  'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-white/[0.02]'
                }`}
              >
                <span className="w-8 shrink-0 text-zinc-400 text-[10px] select-none text-right pr-2">
                  {line.oldNum || ''}
                </span>
                <span className="w-8 shrink-0 text-zinc-400 text-[10px] select-none text-right pr-3">
                  {line.newNum || ''}
                </span>
                <span className="whitespace-pre truncate">{line.content}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative my-5 rounded-2xl bg-zinc-50 dark:bg-black/60 border border-zinc-200 dark:border-white/10 overflow-hidden text-[11px]">
          {/* Subheader showing compare version names */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02] text-[10px] font-bold text-zinc-400 uppercase">
            <span className="text-rose-400">{beforeLabel}</span>
            <span className="text-emerald-400">{afterLabel}</span>
          </div>

          <div className="p-3">
            {SAMPLE_DIFF.map((line, idx) => {
              const isAdd = line.type === 'add';
              const isDel = line.type === 'del';
              return (
                <div
                  key={idx}
                  className={`flex items-center px-2 py-1 font-mono rounded ${
                    isAdd ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                    isDel ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' :
                    'text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span className="w-6 shrink-0 text-zinc-400 select-none font-bold">
                    {isAdd ? '+' : isDel ? '-' : ' '}
                  </span>
                  <span className="whitespace-pre truncate">{line.content.replace(/^[+-]\s*/, '')}</span>
                </div>
              );
            })}
          </div>

          {/* Interactive slider controller */}
          <div className="p-3 border-t border-zinc-200 dark:border-white/5 flex items-center gap-3">
            <ArrowsLeftRight size={14} className="text-zinc-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              aria-label="Diff inspect slider"
            />
            <span className="text-[10px] text-zinc-400 font-mono w-8 text-right">{sliderPos}%</span>
          </div>
        </div>
      )}

      {/* Footer telemetry */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-200/60 dark:border-white/5">
        <span>Parsed in 0.8ms</span>
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">Clean Unified Patch</span>
      </div>
    </div>
  );
};
