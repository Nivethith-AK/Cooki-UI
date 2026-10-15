import React, { useState, useRef, useEffect } from 'react';
import { Crosshair, Target, Compass, Cursor } from '@phosphor-icons/react';

export interface MagneticTargetCursorProps {
  color?: 'cyan' | 'emerald' | 'amber' | 'rose';
  showCoordinates?: boolean;
  className?: string;
}

const COLOR_STYLES = {
  cyan: {
    border: 'border-cyan-400',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.6)]',
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  emerald: {
    border: 'border-emerald-400',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  amber: {
    border: 'border-amber-400',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  rose: {
    border: 'border-rose-400',
    text: 'text-rose-400',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.6)]',
    dot: 'bg-rose-400',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }
};

export const MagneticTargetCursor: React.FC<MagneticTargetCursorProps> = ({
  color = 'cyan',
  showCoordinates = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 160, y: 120 });
  const [isInside, setIsInside] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const styles = COLOR_STYLES[color] || COLOR_STYLES.cyan;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
    setIsInside(true);
  };

  const handleMouseEnter = () => setIsInside(true);
  const handleMouseLeave = () => {
    setIsInside(false);
    setIsLocked(false);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#07080d] p-6 shadow-2xl backdrop-blur-xl font-mono text-xs select-none ${className}`}>
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white">
            <Crosshair size={18} weight="bold" className={styles.text} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">Precision Tactical Reticle</h3>
            <span className="text-[11px] text-zinc-400">Low-Latency HUD Cursor Tracker</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${isLocked ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : styles.badge}`}>
            {isLocked ? 'TARGET ACQUIRED' : isInside ? 'TRACKING' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Interactive Cursor Tracking Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative my-5 h-64 w-full rounded-2xl bg-zinc-100/70 dark:bg-[#040407] border border-zinc-200/70 dark:border-white/10 overflow-hidden cursor-crosshair group"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

        {/* Interactive Magnetic Targets inside canvas */}
        <div className="absolute top-8 left-10 z-10">
          <button
            onMouseEnter={() => setIsLocked(true)}
            onMouseLeave={() => setIsLocked(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-white/15 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-800 dark:text-zinc-200 hover:border-cyan-400 transition-colors shadow-xs"
          >
            <Target size={14} className="text-cyan-400" />
            <span className="text-[11px]">Primary Ingress</span>
          </button>
        </div>

        <div className="absolute bottom-8 right-12 z-10">
          <button
            onMouseEnter={() => setIsLocked(true)}
            onMouseLeave={() => setIsLocked(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-white/15 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-800 dark:text-zinc-200 hover:border-emerald-400 transition-colors shadow-xs"
          >
            <Compass size={14} className="text-emerald-400" />
            <span className="text-[11px]">Vector Node</span>
          </button>
        </div>

        {/* Custom HUD Crosshair Element */}
        {isInside && (
          <div
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none absolute z-20 transition-all duration-75"
          >
            {/* Outer Rotating Crosshair Ring */}
            <div className={`relative flex items-center justify-center h-10 w-10 rounded-full border border-dashed transition-all duration-150 ${
              isLocked ? 'border-emerald-400 scale-125 animate-spin' : `${styles.border} ${styles.glow}`
            }`}>
              {/* Center target dot */}
              <div className={`h-1.5 w-1.5 rounded-full ${isLocked ? 'bg-emerald-400' : styles.dot}`} />

              {/* Cross tick marks */}
              <div className="absolute -top-1.5 w-0.5 h-1.5 bg-current" />
              <div className="absolute -bottom-1.5 w-0.5 h-1.5 bg-current" />
              <div className="absolute -left-1.5 h-0.5 w-1.5 bg-current" />
              <div className="absolute -right-1.5 h-0.5 w-1.5 bg-current" />
            </div>

            {/* Coordinates Floating Tag */}
            {showCoordinates && (
              <div className="absolute top-6 left-6 whitespace-nowrap px-2 py-0.5 rounded-md bg-black/80 text-white text-[9px] font-mono border border-white/10 shadow-lg">
                X:{coords.x} Y:{coords.y}
              </div>
            )}
          </div>
        )}

        {/* Center prompt if idle */}
        {!isInside && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 pointer-events-none">
            <Cursor size={22} className="mb-2 text-zinc-400 opacity-60 animate-bounce" />
            <span className="text-[11px]">Hover over canvas to engage tactical crosshair</span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-200/60 dark:border-white/5">
        <div className="flex items-center gap-4">
          <span>X: <strong className="text-zinc-900 dark:text-zinc-200 font-mono">{coords.x}px</strong></span>
          <span>Y: <strong className="text-zinc-900 dark:text-zinc-200 font-mono">{coords.y}px</strong></span>
        </div>
        <div>
          <span>Clicks: <strong className="text-zinc-900 dark:text-zinc-200 font-mono">{clickCount}</strong></span>
        </div>
      </div>
    </div>
  );
};
