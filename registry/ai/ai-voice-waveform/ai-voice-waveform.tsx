import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Microphone, 
  MicrophoneSlash, 
  SpeakerHigh, 
  Waveform, 
  Circle, 
  Play, 
  Pause,
  ArrowsClockwise
} from '@phosphor-icons/react';

export interface AiVoiceWaveformProps {
  state?: 'listening' | 'speaking' | 'idle';
  colorTheme?: 'cyan' | 'emerald' | 'violet' | 'amber';
  barCount?: number;
  active?: boolean;
  className?: string;
}

export const AiVoiceWaveform: React.FC<AiVoiceWaveformProps> = ({
  state: controlledState,
  colorTheme = 'cyan',
  barCount = 24,
  active: controlledActive,
  className = '',
}) => {
  const [internalActive, setInternalActive] = useState(true);
  const [internalState, setInternalState] = useState<'listening' | 'speaking' | 'idle'>('listening');
  const [frequencies, setFrequencies] = useState<number[]>([]);

  const isActive = controlledActive !== undefined ? controlledActive : internalActive;
  const currentState = controlledState !== undefined ? controlledState : internalState;

  // Generate responsive animated bar heights
  useEffect(() => {
    const bars = Math.max(12, Math.min(barCount, 40));
    let frameId: number;
    let tick = 0;

    const updateSpectrum = () => {
      tick += 0.08;
      if (!isActive) {
        setFrequencies(Array(bars).fill(4));
        return;
      }

      const next = Array.from({ length: bars }, (_, i) => {
        const centerOffset = 1 - Math.abs(i - bars / 2) / (bars / 2);
        if (currentState === 'listening') {
          // Dynamic noise with center bias
          const wave = Math.sin(tick * 3 + i * 0.5) * 0.5 + 0.5;
          const noise = Math.random() * 0.4 + 0.1;
          return Math.max(6, Math.floor((wave * 0.6 + noise * 0.4) * 64 * centerOffset) + 6);
        } else if (currentState === 'speaking') {
          // Smooth sine undulating voice rhythm
          const wave1 = Math.sin(tick * 2 + i * 0.35);
          const wave2 = Math.cos(tick * 1.5 - i * 0.2);
          const combined = (wave1 + wave2 + 2) / 4;
          return Math.max(8, Math.floor(combined * 72 * centerOffset) + 8);
        } else {
          // Gentle idle breathing
          const idleWave = (Math.sin(tick * 1.2 + i * 0.2) + 1) / 2;
          return Math.max(4, Math.floor(idleWave * 18 * centerOffset) + 4);
        }
      });

      setFrequencies(next);
      frameId = requestAnimationFrame(updateSpectrum);
    };

    frameId = requestAnimationFrame(updateSpectrum);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, currentState, barCount]);

  const themeConfig = {
    cyan: {
      barGradient: 'from-cyan-400 via-sky-500 to-blue-600',
      aura: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      pill: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
    emerald: {
      barGradient: 'from-emerald-400 via-teal-500 to-green-600',
      aura: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    violet: {
      barGradient: 'from-violet-400 via-purple-500 to-indigo-600',
      aura: 'bg-violet-500/20 border-violet-500/30 text-violet-400',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.25)]',
      pill: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
    amber: {
      barGradient: 'from-amber-400 via-orange-500 to-rose-600',
      aura: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      pill: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  }[colorTheme];

  const stateLabels = {
    listening: 'Listening to prompt...',
    speaking: 'Synthesizing voice response...',
    idle: 'Standby mode (tap mic to speak)',
  };

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-6 shadow-xl transition-all ${className}`}>
      {/* Top Header Status */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${themeConfig.aura}`}>
            {currentState === 'listening' ? (
              <Microphone size={16} weight="bold" />
            ) : currentState === 'speaking' ? (
              <SpeakerHigh size={16} weight="bold" />
            ) : (
              <Waveform size={16} weight="bold" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Neural Voice Engine</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${themeConfig.pill}`}>
                {currentState}
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">Sampling: 48kHz &bull; Latency &lt; 90ms</p>
          </div>
        </div>

        {/* Mute/Active Toggle */}
        <button
          onClick={() => setInternalActive(!isActive)}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
            isActive
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-xs'
              : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500 border-zinc-200 dark:border-white/10'
          }`}
          title={isActive ? 'Mute microphone' : 'Unmute microphone'}
        >
          {isActive ? <Microphone size={16} weight="bold" /> : <MicrophoneSlash size={16} weight="bold" />}
        </button>
      </div>

      {/* Main Waveform Visualization Stage */}
      <div className="relative my-8 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-zinc-50 dark:bg-[#07070a] border border-zinc-200/60 dark:border-white/5 px-4">
        {/* Pulsating Center Aura */}
        <div 
          className={`absolute h-28 w-28 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
            isActive ? `${themeConfig.aura.split(' ')[0]} opacity-70 scale-125` : 'opacity-0 scale-75'
          }`} 
        />

        {/* Waveform Frequency Bars */}
        <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 h-full w-full max-w-md">
          {frequencies.map((height, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-full flex-1 max-w-[12px]"
            >
              <div
                style={{
                  height: `${height}px`,
                  transition: 'height 80ms ease-out',
                }}
                className={`w-full rounded-full bg-gradient-to-t ${themeConfig.barGradient} ${
                  isActive ? themeConfig.glow : 'opacity-30'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Live Audio Level Rings */}
        {isActive && currentState !== 'idle' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-20 rounded-full border border-dashed border-zinc-300 dark:border-white/10 animate-pulse" />
          </div>
        )}
      </div>

      {/* Live Text Caption & Activity */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Circle 
            size={8} 
            weight="fill" 
            className={isActive ? (currentState === 'listening' ? 'text-emerald-500 animate-pulse' : 'text-cyan-500 animate-ping') : 'text-zinc-500'} 
          />
          <span className="truncate">{stateLabels[currentState]}</span>
        </div>

        {/* State Switching Pills (Interactive in preview) */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-white/5">
          {(['listening', 'speaking', 'idle'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setInternalState(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all cursor-pointer ${
                currentState === s
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
