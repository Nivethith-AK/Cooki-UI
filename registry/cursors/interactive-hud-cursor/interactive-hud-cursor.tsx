import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Target, Crosshair, Compass } from '@phosphor-icons/react';

export interface InteractiveHudCursorProps {
  colorTheme?: 'cyan' | 'emerald' | 'amber' | 'rose';
  showCoordinates?: boolean;
  reticleSize?: number;
  className?: string;
}

export const InteractiveHudCursor: React.FC<InteractiveHudCursorProps> = ({
  colorTheme = 'cyan',
  showCoordinates = true,
  reticleSize = 56,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Smooth spring motion values for lagging reticle
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 350 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const themeConfig = {
    cyan: {
      accent: 'text-cyan-400',
      border: 'border-cyan-400/80',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.4)]',
      bg: 'bg-cyan-500/10',
      dot: 'bg-cyan-400',
    },
    emerald: {
      accent: 'text-emerald-400',
      border: 'border-emerald-400/80',
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.4)]',
      bg: 'bg-emerald-500/10',
      dot: 'bg-emerald-400',
    },
    amber: {
      accent: 'text-amber-400',
      border: 'border-amber-400/80',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.4)]',
      bg: 'bg-amber-500/10',
      dot: 'bg-amber-400',
    },
    rose: {
      accent: 'text-rose-400',
      border: 'border-rose-400/80',
      glow: 'shadow-[0_0_15px_rgba(251,113,133,0.4)]',
      bg: 'bg-rose-500/10',
      dot: 'bg-rose-400',
    },
  }[colorTheme];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    
    setCoords({ x, y });
    mouseX.set(x);
    mouseY.set(y);
    if (!isInside) setIsInside(true);
  };

  const handleMouseDown = () => {
    setIsLocked(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => setIsLocked(false), 300);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`relative w-full h-80 rounded-3xl overflow-hidden bg-[#07080c] border border-white/10 select-none cursor-none flex items-center justify-center ${className}`}
    >
      {/* Sci-fi HUD Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293718_1px,transparent_1px),linear-gradient(to_bottom,#1f293718_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#07080c_90%)] pointer-events-none" />

      {/* Target Dummy Nodes inside container for interaction */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-around px-8">
        {[
          { label: 'ALPHA-01', dist: '124m' },
          { label: 'BEACON-09', dist: '480m' },
          { label: 'PROXY-77', dist: '210m' },
        ].map((node, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 opacity-60">
            <div className="h-2 w-2 rounded-full border border-cyan-400/80 bg-cyan-500/20" />
            <span className="text-[10px] font-mono text-zinc-500">{node.label}</span>
            <span className="text-[9px] font-mono text-zinc-600">{node.dist}</span>
          </div>
        ))}
      </div>

      {/* Instructions when idle */}
      {!isInside && (
        <div className="flex flex-col items-center gap-2 pointer-events-none z-10 text-center px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400">
            <Crosshair size={20} weight="bold" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            Move pointer inside arena to engage HUD
          </span>
          <span className="text-[11px] font-mono text-zinc-600">
            Click anywhere to trigger active lock-on reticle
          </span>
        </div>
      )}

      {/* Trailing Spring-Damped Reticle Cursor */}
      {isInside && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute top-0 left-0 pointer-events-none z-30"
        >
          {/* Main Reticle Outer Frame */}
          <div
            style={{ width: `${reticleSize}px`, height: `${reticleSize}px` }}
            className={`relative flex items-center justify-center transition-transform duration-150 ${
              isLocked ? 'scale-75' : 'scale-100'
            }`}
          >
            {/* Top-Left Bracket */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${themeConfig.border} ${themeConfig.glow}`} />
            {/* Top-Right Bracket */}
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${themeConfig.border} ${themeConfig.glow}`} />
            {/* Bottom-Left Bracket */}
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${themeConfig.border} ${themeConfig.glow}`} />
            {/* Bottom-Right Bracket */}
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${themeConfig.border} ${themeConfig.glow}`} />

            {/* Rotating Outer Dashed Aim Ring */}
            <div className={`absolute inset-1 rounded-full border border-dashed ${themeConfig.border} animate-[spin_10s_linear_infinite] opacity-60`} />

            {/* Inner Lock Target */}
            <div className={`h-2.5 w-2.5 rounded-full ${themeConfig.dot} transition-transform ${isLocked ? 'scale-150 animate-ping' : 'scale-100'}`} />

            {/* Locking State Ring Pulse */}
            {isLocked && (
              <div className={`absolute -inset-2 rounded-full border-2 ${themeConfig.border} animate-ping opacity-80`} />
            )}

            {/* Telemetry Coordinate Label */}
            {showCoordinates && (
              <div className="absolute left-full top-0 ml-3.5 whitespace-nowrap font-mono text-[10px] flex flex-col gap-0.5 pointer-events-none">
                <span className={`font-bold ${themeConfig.accent}`}>
                  LOC: X {coords.x.toString().padStart(3, '0')} / Y {coords.y.toString().padStart(3, '0')}
                </span>
                <span className="text-zinc-500 uppercase text-[9px]">
                  {isLocked ? 'STATUS: [LOCKED]' : 'STATUS: [TRACKING]'}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Immediate Hardware Pinpoint Dot */}
      {isInside && (
        <div
          style={{
            transform: `translate(${coords.x}px, ${coords.y}px)`,
          }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      )}
    </div>
  );
};
