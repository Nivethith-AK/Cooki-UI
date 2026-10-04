import React from 'react';
import { ArrowRight, Sparkle, Terminal } from '@phosphor-icons/react';

export const HeroGeometryGlowSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white border border-white/10 shadow-2xl relative overflow-hidden text-center select-none">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-cyan-300 mb-4">
          <Sparkle size={13} weight="fill" />
          <span>BUILT FOR NEXT-GEN DEVELOPERS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Ship Interfaces with <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Autonomous Precision.
          </span>
        </h2>

        <p className="mt-4 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
          105+ verified, source-first components ready for React 19, Next.js 15, and Vite. Install via zero-backend API endpoints in seconds.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-mono text-xs font-bold hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer">
            <span>Explore All 105 Artifacts</span>
            <ArrowRight size={13} weight="bold" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white font-mono text-xs font-semibold hover:bg-white/15 border border-white/15 transition-colors cursor-pointer">
            <Terminal size={14} />
            <span>npx cook-ui add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
