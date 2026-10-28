import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Crosshair, Target, Compass, NavigationArrow, ShieldCheck } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export interface MagneticTargetCursorProps {
  color?: 'cyan' | 'emerald' | 'amber' | 'rose';
  showCoordinates?: boolean;
  className?: string;
}

const COLOR_STYLES = {
  cyan: {
    border: 'border-cyan-400',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    dot: 'bg-cyan-400',
    ring: 'border-cyan-400/80',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  emerald: {
    border: 'border-emerald-400',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    dot: 'bg-emerald-400',
    ring: 'border-emerald-400/80',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  amber: {
    border: 'border-amber-400',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    dot: 'bg-amber-400',
    ring: 'border-amber-400/80',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  rose: {
    border: 'border-rose-400',
    text: 'text-rose-400',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.5)]',
    dot: 'bg-rose-400',
    ring: 'border-rose-400/80',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
};

interface TargetNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  x: number; // px within canvas
  y: number; // px within canvas
}

export const MagneticTargetCursor: React.FC<MagneticTargetCursorProps> = ({
  color = 'cyan',
  showCoordinates = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);
  const [lockedTarget, setLockedTarget] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [rawCoords, setRawCoords] = useState({ x: 210, y: 130 });
  const [sonarPings, setSonarPings] = useState<{ id: number; x: number; y: number }[]>([]);

  const styles = COLOR_STYLES[color] || COLOR_STYLES.cyan;

  // Spring physics for buttery-smooth cursor and magnetic lock-on
  const targetX = useMotionValue(210);
  const targetY = useMotionValue(130);
  const smoothX = useSpring(targetX, { stiffness: 450, damping: 28 });
  const smoothY = useSpring(targetY, { stiffness: 450, damping: 28 });

  // Targets placed within a 440 x 260 coordinate space
  const targets: TargetNode[] = [
    { id: 't1', label: 'Primary Ingress', icon: <Target size={13} className={styles.text} />, x: 105, y: 72 },
    { id: 't2', label: 'Quantum Gateway', icon: <ShieldCheck size={13} className="text-violet-400" />, x: 235, y: 132 },
    { id: 't3', label: 'Vector Node', icon: <Compass size={13} className="text-emerald-400" />, x: 335, y: 192 },
  ];

  // Autonomous idle scanning when mouse is outside canvas
  useEffect(() => {
    if (isInside) return;
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % targets.length;
      const t = targets[step];
      targetX.set(t.x);
      targetY.set(t.y);
      setRawCoords({ x: Math.round(t.x), y: Math.round(t.y) });
      setLockedTarget(t.id);
    }, 2400);

    return () => clearInterval(interval);
  }, [isInside]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setRawCoords({ x: Math.round(mouseX), y: Math.round(mouseY) });
    setIsInside(true);

    // Magnetic Proximity Calculation (Snap threshold: 52px)
    let closestTarget: TargetNode | null = null;
    let minDistance = 52;

    for (const t of targets) {
      const dist = Math.hypot(mouseX - t.x, mouseY - t.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestTarget = t;
      }
    }

    if (closestTarget) {
      // Magnetic suction: pull reticle directly onto target center
      targetX.set(closestTarget.x);
      targetY.set(closestTarget.y);
      setLockedTarget(closestTarget.id);
    } else {
      // Free flight cursor tracking
      targetX.set(mouseX);
      targetY.set(mouseY);
      setLockedTarget(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((prev) => prev + 1);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pingX = e.clientX - rect.left;
    const pingY = e.clientY - rect.top;

    const id = Date.now();
    setSonarPings((prev) => [...prev.slice(-3), { id, x: pingX, y: pingY }]);
    setTimeout(() => {
      setSonarPings((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  };

  return (
    <div
      className={cn(
        'w-full max-w-xl mx-auto rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/95 dark:bg-[#07080d] p-5 shadow-2xl backdrop-blur-xl font-mono text-xs select-none',
        className
      )}
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5">
            <Crosshair size={16} weight="bold" className={styles.text} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-xs leading-none">
              Precision Tactical Reticle
            </h3>
            <span className="text-[10px] text-zinc-400">Low-Latency Magnetic HUD Tracker</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider transition-colors',
              lockedTarget
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : isInside
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-400 border-zinc-200 dark:border-white/10'
            )}
          >
            {lockedTarget ? 'LOCK-ON ENGAGED' : isInside ? 'TRACKING ACTIVE' : 'AUTONOMOUS SCAN'}
          </span>
        </div>
      </div>

      {/* Main Tactical Sandbox Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => setIsInside(false)}
        onClick={handleClick}
        className="relative my-4 h-64 sm:h-72 w-full rounded-2xl bg-zinc-50 dark:bg-[#040407] border border-zinc-200/80 dark:border-white/10 overflow-hidden cursor-none select-none isolate"
      >
        {/* Tactical Crosshair Dot Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#6b728022_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Ambient Compass Axis Lines */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-zinc-200/40 dark:bg-white/5 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-zinc-200/40 dark:bg-white/5 pointer-events-none" />

        {/* Sonar Ping Rings on Click */}
        {sonarPings.map((ping) => (
          <motion.div
            key={ping.id}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{ left: ping.x, top: ping.y, transform: 'translate(-50%, -50%)' }}
            className={cn('absolute w-12 h-12 rounded-full border-2 pointer-events-none z-15', styles.border)}
          />
        ))}

        {/* Interactive Magnetic Targets inside canvas */}
        {targets.map((t) => {
          const isThisLocked = lockedTarget === t.id;
          return (
            <div
              key={t.id}
              style={{ left: `${t.x}px`, top: `${t.y}px`, transform: 'translate(-50%, -50%)' }}
              className="absolute z-10"
            >
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-200 shadow-md',
                  isThisLocked
                    ? 'bg-zinc-900 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                    : 'bg-white/90 dark:bg-zinc-900/80 border-zinc-200 dark:border-white/15 text-zinc-700 dark:text-zinc-200'
                )}
              >
                {t.icon}
                <span className="text-[10px] font-semibold tracking-tight">{t.label}</span>
                {isThisLocked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
            </div>
          );
        })}

        {/* High-Precision Tactical HUD Reticle (Always Rendered, Springs to Mouse or Locks to Targets) */}
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: '-50%',
            y: '-50%',
          }}
          className="pointer-events-none absolute z-30"
        >
          {/* Outer Rotating Tactical Crosshair Ring */}
          <div
            className={cn(
              'relative flex items-center justify-center w-12 h-12 rounded-full border border-dashed transition-all duration-200',
              lockedTarget
                ? 'border-rose-400 scale-125 shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-[spin_6s_linear_infinite]'
                : cn(styles.ring, styles.glow, 'animate-[spin_12s_linear_infinite]')
            )}
          >
            {/* Center target pip */}
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-transform',
                lockedTarget ? 'bg-rose-400 scale-150' : styles.dot
              )}
            />

            {/* 4 Cardinal Crosshair Ticks */}
            <div className="absolute -top-1.5 w-[2px] h-2 bg-current" />
            <div className="absolute -bottom-1.5 w-[2px] h-2 bg-current" />
            <div className="absolute -left-1.5 h-[2px] w-2 bg-current" />
            <div className="absolute -right-1.5 h-[2px] w-2 bg-current" />
          </div>

          {/* Corner Lock-On Brackets (Animate when target is acquired) */}
          {lockedTarget && (
            <div className="absolute inset-[-8px] pointer-events-none">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-rose-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-rose-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-rose-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-rose-400" />
            </div>
          )}

          {/* Floating Live Coordinates HUD Tag */}
          {showCoordinates && (
            <div className="absolute top-7 left-7 whitespace-nowrap px-2 py-0.5 rounded-lg bg-zinc-950/90 text-white text-[9px] font-mono border border-white/10 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
              <NavigationArrow size={9} weight="bold" className={styles.text} />
              <span>X:{rawCoords.x} Y:{rawCoords.y}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Telemetry Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <span>X: <strong className="text-zinc-900 dark:text-zinc-200 font-mono">{rawCoords.x}px</strong></span>
          <span>Y: <strong className="text-zinc-900 dark:text-zinc-200 font-mono">{rawCoords.y}px</strong></span>
          <span>Target: <strong className={cn('font-mono uppercase', lockedTarget ? 'text-rose-400' : 'text-zinc-500')}>
            {lockedTarget ? 'LOCKED' : 'SEEKING'}
          </strong></span>
        </div>
        <div>
          <span>Clicks: <strong className="text-zinc-900 dark:text-zinc-200 font-mono">{clickCount}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default MagneticTargetCursor;
