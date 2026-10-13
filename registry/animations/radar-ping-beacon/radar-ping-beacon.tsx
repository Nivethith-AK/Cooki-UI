import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crosshair, 
  Broadcast, 
  Compass, 
  ShieldCheck,
  Target
} from '@phosphor-icons/react';

export interface RadarPingBeaconProps {
  sweepSpeed?: number;
  colorTheme?: 'emerald' | 'cyan' | 'amber';
  interactive?: boolean;
  className?: string;
}

interface Blip {
  id: string;
  name: string;
  x: number; // percentage -50 to 50
  y: number; // percentage -50 to 50
  distance: string;
  signal: string;
  status: 'active' | 'warning' | 'synced';
}

const DEFAULT_BLIPS: Blip[] = [
  { id: '1', name: 'GATEWAY-AP-01', x: 22, y: -26, distance: '142m', signal: '-42 dBm', status: 'synced' },
  { id: '2', name: 'EDGE-CLUSTER-07', x: -32, y: -18, distance: '280m', signal: '-58 dBm', status: 'active' },
  { id: '3', name: 'PROXY-NODE-12', x: 14, y: 34, distance: '198m', signal: '-64 dBm', status: 'warning' },
  { id: '4', name: 'BEACON-SAT-04', x: -20, y: 28, distance: '310m', signal: '-71 dBm', status: 'active' },
];

export const RadarPingBeacon: React.FC<RadarPingBeaconProps> = ({
  sweepSpeed = 2.5,
  colorTheme = 'emerald',
  interactive = true,
  className = '',
}) => {
  const [angle, setAngle] = useState(0);
  const [pings, setPings] = useState<{ id: number; x: number; y: number }[]>([]);
  const [selectedBlip, setSelectedBlip] = useState<Blip | null>(null);
  const animRef = useRef<number | null>(null);

  // Sweep rotation loop
  useEffect(() => {
    let lastTime = performance.now();
    const speedDegPerSec = (360 / Math.max(1, sweepSpeed)) * 0.8;

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setAngle((prev) => (prev + speedDegPerSec * delta) % 360);
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [sweepSpeed]);

  const triggerPing = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const newId = Date.now();
    setPings((prev) => [...prev.slice(-3), { id: newId, x: 50, y: 50 }]);
    setTimeout(() => {
      setPings((prev) => prev.filter((p) => p.id !== newId));
    }, 1800);
  };

  const themeConfig = {
    emerald: {
      radarLine: 'from-emerald-500/0 via-emerald-500/20 to-emerald-400',
      blip: 'bg-emerald-400 shadow-[0_0_12px_#34d399]',
      ring: 'border-emerald-500/20',
      axis: 'bg-emerald-500/20',
      badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      gradientRing: 'border-emerald-500/30',
    },
    cyan: {
      radarLine: 'from-cyan-500/0 via-cyan-500/20 to-cyan-400',
      blip: 'bg-cyan-400 shadow-[0_0_12px_#38bdf8]',
      ring: 'border-cyan-500/20',
      axis: 'bg-cyan-500/20',
      badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      gradientRing: 'border-cyan-500/30',
    },
    amber: {
      radarLine: 'from-amber-500/0 via-amber-500/20 to-amber-400',
      blip: 'bg-amber-400 shadow-[0_0_12px_#fbbf24]',
      ring: 'border-amber-500/20',
      axis: 'bg-amber-500/20',
      badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      gradientRing: 'border-amber-500/30',
    },
  }[colorTheme];

  return (
    <div className={`relative w-full max-w-lg mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#07090e] p-5 shadow-2xl flex flex-col items-center select-none ${className}`}>
      {/* Top Telemetry Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Broadcast size={15} className="text-emerald-500 animate-pulse" />
          <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Sonar Recon Array</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400">AZM:</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 w-10 text-right">
            {Math.floor(angle).toString().padStart(3, '0')}°
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${themeConfig.badge}`}>
            4 TARGETS
          </span>
        </div>
      </div>

      {/* Main Radar Screen */}
      <div 
        onClick={triggerPing}
        className="relative my-4 flex h-64 w-64 sm:h-72 sm:w-72 items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 shadow-inner overflow-hidden cursor-crosshair"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Concentric Sonar Rings */}
        {[0.28, 0.52, 0.76, 1.0].map((scale, i) => (
          <div
            key={i}
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
            className={`absolute rounded-full border border-dashed ${themeConfig.ring}`}
          />
        ))}

        {/* Crosshair Axes */}
        <div className={`absolute h-full w-[1px] ${themeConfig.axis}`} />
        <div className={`absolute w-full h-[1px] ${themeConfig.axis}`} />

        {/* Outer Degree Ticks */}
        <div className="absolute inset-2 rounded-full border border-zinc-800 pointer-events-none" />

        {/* Rotating Radar Sweep Needle with Phosphor Gradient Arc */}
        <div
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'bottom right',
          }}
          className="absolute top-0 left-0 w-1/2 h-1/2 pointer-events-none"
        >
          {/* Sweep Trail Arc */}
          <div 
            style={{
              background: 'conic-gradient(from 180deg at 100% 100%, rgba(52,211,153,0.28) 0deg, rgba(52,211,153,0.05) 45deg, transparent 65deg)',
            }}
            className="w-full h-full"
          />
          {/* Leading Radius Needle */}
          <div className="absolute right-0 bottom-0 top-0 w-[1.5px] bg-gradient-to-t from-emerald-400 to-emerald-200 shadow-[0_0_8px_#34d399]" />
        </div>

        {/* Manual Ping Waves */}
        <AnimatePresence>
          {pings.map((p) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className={`absolute w-full h-full rounded-full border-2 ${themeConfig.gradientRing} pointer-events-none`}
            />
          ))}
        </AnimatePresence>

        {/* Interactive Target Blips */}
        {DEFAULT_BLIPS.map((blip) => {
          // Check proximity of current sweep angle to blip angle
          const blipAngle = (Math.atan2(blip.y, blip.x) * 180) / Math.PI + 180;
          const diff = Math.abs(angle - blipAngle);
          const isSwept = diff < 15 || diff > 345;

          return (
            <div
              key={blip.id}
              style={{
                left: `${50 + blip.x}%`,
                top: `${50 + blip.y}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlip(blip === selectedBlip ? null : blip);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            >
              <div 
                className={`relative flex items-center justify-center h-4 w-4 rounded-full transition-transform hover:scale-150`}
              >
                {/* Blip Core Light */}
                <div 
                  className={`h-2.5 w-2.5 rounded-full ${themeConfig.blip} ${
                    isSwept ? 'scale-125 brightness-150 animate-ping' : ''
                  }`} 
                />
                
                {/* Ring Beacon on Swept */}
                {isSwept && (
                  <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping" />
                )}
              </div>

              {/* Blip Tooltip */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                <div className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-2.5 py-1 text-[10px] font-mono whitespace-nowrap shadow-xl">
                  <p className="font-bold text-emerald-400">{blip.name}</p>
                  <p className="text-zinc-400">{blip.distance} &bull; {blip.signal}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center Radar Transmitter Core */}
        <div className="relative z-20 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 border border-zinc-600 shadow-md">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Selected Blip Telemetry Banner / Ping Action */}
      <div className="w-full mt-2 pt-3 border-t border-zinc-200/80 dark:border-white/5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 truncate">
          {selectedBlip ? (
            <div className="flex items-center gap-2">
              <Target size={14} className="text-emerald-500 shrink-0" />
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">{selectedBlip.name}</span>
              <span className="text-zinc-400">({selectedBlip.distance})</span>
            </div>
          ) : (
            <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
              Tap radar surface or ping button to emit pulse
            </span>
          )}
        </div>

        <button
          onClick={() => triggerPing()}
          className="px-3 py-1 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[11px] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
        >
          PING SONAR
        </button>
      </div>
    </div>
  );
};
