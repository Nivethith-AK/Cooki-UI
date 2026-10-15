import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SpeakerHigh, SpeakerSlash, Waveform, Sliders } from '@phosphor-icons/react';

export interface AudioSpectrumEqualizerProps {
  barCount?: number;
  barColor?: 'cyan' | 'violet' | 'emerald' | 'amber';
  height?: number;
  interactive?: boolean;
  showDbMeter?: boolean;
  className?: string;
}

const COLOR_MAP = {
  cyan: {
    bar: 'bg-cyan-500',
    barGradient: 'from-cyan-400 to-blue-600',
    peak: 'bg-cyan-300',
    glow: 'shadow-[0_0_12px_rgba(6,182,212,0.5)]',
    accent: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  violet: {
    bar: 'bg-violet-500',
    barGradient: 'from-violet-400 to-indigo-600',
    peak: 'bg-violet-300',
    glow: 'shadow-[0_0_12px_rgba(139,92,246,0.5)]',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  },
  emerald: {
    bar: 'bg-emerald-500',
    barGradient: 'from-emerald-400 to-teal-600',
    peak: 'bg-emerald-300',
    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    accent: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  amber: {
    bar: 'bg-amber-500',
    barGradient: 'from-amber-400 to-orange-600',
    peak: 'bg-amber-300',
    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    accent: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  }
};

export const AudioSpectrumEqualizer: React.FC<AudioSpectrumEqualizerProps> = ({
  barCount = 24,
  barColor = 'cyan',
  height = 140,
  interactive = true,
  showDbMeter = true,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [gain, setGain] = useState(78);
  const [bands, setBands] = useState<number[]>(() => Array.from({ length: barCount }, () => Math.random() * 80 + 10));
  const [peaks, setPeaks] = useState<number[]>(() => Array.from({ length: barCount }, () => 90));
  const animRef = useRef<number | null>(null);

  const colors = COLOR_MAP[barColor] || COLOR_MAP.cyan;

  useEffect(() => {
    let tick = 0;
    const updateSpectrum = () => {
      tick += 0.08;
      if (isPlaying && !isMuted) {
        setBands(prev => {
          const next = prev.map((val, idx) => {
            const freqBias = Math.sin(tick * 1.5 + idx * 0.4) * 20;
            const target = Math.max(8, Math.min(100, (Math.sin(tick + idx * 0.3) * 35 + 45) + freqBias + (Math.random() * 20 - 10)));
            return target * (gain / 100);
          });
          
          setPeaks(prevPeaks => 
            prevPeaks.map((peak, idx) => {
              const current = next[idx];
              if (current > peak) return current;
              return Math.max(current, peak - 1.5);
            })
          );

          return next;
        });
      } else {
        setBands(prev => prev.map(val => Math.max(4, val * 0.85)));
        setPeaks(prev => prev.map(val => Math.max(4, val * 0.9)));
      }
      animRef.current = requestAnimationFrame(updateSpectrum);
    };

    animRef.current = requestAnimationFrame(updateSpectrum);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, isMuted, gain, barCount]);

  const avgDb = isPlaying && !isMuted ? (-36 + (gain * 0.32)).toFixed(1) : '-96.0';
  const peakDb = isPlaying && !isMuted ? (-12 + (gain * 0.11)).toFixed(1) : '-96.0';

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-[#090a0f] p-6 shadow-2xl backdrop-blur-xl font-mono text-xs select-none ${className}`}>
      {/* Header telemetry */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white">
            <Waveform size={18} weight="bold" className={isPlaying && !isMuted ? colors.accent : 'text-zinc-400'} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">DSP Spectrum Equalizer</h3>
            <span className="text-[11px] text-zinc-400">24-Bit / 96kHz Low-Latency Float Stream</span>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${isPlaying && !isMuted ? colors.badge : 'bg-zinc-100 dark:bg-white/5 text-zinc-400 border-zinc-200 dark:border-white/10'}`}>
          {isPlaying && !isMuted ? 'LIVE AUDIO' : 'PAUSED'}
        </span>
      </div>

      {/* Main Spectrum Visualizer Viewport */}
      <div 
        style={{ height: `${height}px` }} 
        className="relative flex items-end justify-between gap-1 sm:gap-1.5 my-6 px-3 py-2 rounded-2xl bg-zinc-100/60 dark:bg-black/40 border border-zinc-200/60 dark:border-white/5 overflow-hidden"
      >
        {/* Horizontal dB reference lines */}
        <div className="pointer-events-none absolute inset-x-0 top-1/4 border-b border-zinc-200/40 dark:border-white/5" />
        <div className="pointer-events-none absolute inset-x-0 top-2/4 border-b border-zinc-200/40 dark:border-white/5" />
        <div className="pointer-events-none absolute inset-x-0 top-3/4 border-b border-zinc-200/40 dark:border-white/5" />

        {bands.slice(0, barCount).map((level, idx) => {
          const peak = peaks[idx] || level;
          return (
            <div key={idx} className="relative flex-1 h-full flex flex-col justify-end items-center group">
              {/* Peak indicator dot */}
              <div 
                style={{ bottom: `${peak}%` }}
                className={`absolute w-full h-[3px] rounded-full transition-all duration-75 ${colors.peak} ${colors.glow}`}
              />

              {/* Dynamic Frequency Bar */}
              <div 
                style={{ height: `${level}%` }}
                className={`w-full rounded-t-sm bg-gradient-to-t ${colors.barGradient} transition-all duration-75 ${level > 65 ? colors.glow : ''}`}
              />
            </div>
          );
        })}
      </div>

      {/* Decibel & Channel Readout */}
      {showDbMeter && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 p-3 rounded-2xl bg-zinc-100/50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 text-[11px]">
          <div>
            <span className="text-zinc-400 block text-[10px]">RMS GAIN</span>
            <span className="font-bold text-zinc-900 dark:text-white">{avgDb} dB</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px]">PEAK HOLD</span>
            <span className="font-bold text-zinc-900 dark:text-white">{peakDb} dB</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px]">CHANNELS</span>
            <span className="font-bold text-zinc-900 dark:text-white">STEREO 2.0</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px]">SAMPLE RATE</span>
            <span className="font-bold text-zinc-900 dark:text-white">96,000 Hz</span>
          </div>
        </div>
      )}

      {/* Interactive Controls Bar */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-200/80 dark:border-white/5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? <Pause size={14} weight="bold" /> : <Play size={14} weight="fill" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <SpeakerSlash size={14} weight="bold" /> : <SpeakerHigh size={14} weight="bold" />}
            </button>
          </div>

          {/* Master Gain Slider */}
          <div className="flex items-center gap-2.5 flex-1 max-w-[200px]">
            <Sliders size={14} className="text-zinc-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : gain}
              onChange={(e) => {
                setGain(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              aria-label="Master Gain"
            />
            <span className="text-[10px] text-zinc-400 font-mono w-7 text-right">{isMuted ? 0 : gain}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
