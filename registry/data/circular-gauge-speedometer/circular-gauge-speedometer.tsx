import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gauge, ArrowUpRight, Pulse } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export interface CircularGaugeSpeedometerProps {
  value?: number;
  max?: number;
  min?: number;
  unit?: string;
  label?: string;
  sublabel?: string;
  showTicks?: boolean;
  interactive?: boolean;
  className?: string;
}

export const CircularGaugeSpeedometer: React.FC<CircularGaugeSpeedometerProps> = ({
  value = 78,
  max = 100,
  min = 0,
  unit = '%',
  label = 'Cluster Throughput',
  sublabel = 'Node Cluster US-East-1',
  showTicks = true,
  interactive = true,
  className = '',
}) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setCurrentVal(value);
  }, [value]);

  const clampedVal = Math.min(Math.max(currentVal, min), max);
  const percentage = (clampedVal - min) / (max - min);

  // 240° arc: from 210° (bottom-left) to -30° (bottom-right)
  // Center is (160, 140), radius is 100
  const arcLength = 418.88; // 2 * PI * 100 * (240 / 360)
  const strokeOffset = arcLength - percentage * arcLength;
  const needleAngle = -120 + percentage * 240;

  // Status computation
  const getStatus = (pct: number) => {
    if (pct >= 0.85) return { label: 'CRITICAL', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
    if (pct >= 0.65) return { label: 'ELEVATED', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'OPTIMAL', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  };

  const status = getStatus(percentage);

  // Handle click or drag on gauge to adjust value
  const handlePointerInteraction = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + (rect.height * 140) / 220; // center y scaled

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Angle in degrees from positive x axis
    let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;

    // Arc runs from 150° (val = 0) through 270° (top, val = 50) to 30° / 390° (val = 100)
    let progress = 0;
    if (angleDeg >= 150 && angleDeg <= 360) {
      progress = (angleDeg - 150) / 240;
    } else if (angleDeg <= 30) {
      progress = (angleDeg + 360 - 150) / 240;
    } else {
      progress = angleDeg < 90 ? 1 : 0;
    }

    const newVal = Math.round(min + Math.min(Math.max(progress, 0), 1) * (max - min));
    setCurrentVal(newVal);
  };

  // Ticks at 0, 20, 40, 60, 80, 100%
  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div
      className={cn(
        'w-full max-w-sm mx-auto p-6 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 shadow-2xl backdrop-blur-xl flex flex-col items-center font-mono select-none',
        className
      )}
    >
      {/* Top Telemetry Header */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-zinc-200/60 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400">
            <Gauge size={16} weight="bold" />
          </div>
          <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
            Telemetry
          </span>
        </div>
        <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider', status.color)}>
          {status.label}
        </span>
      </div>

      {/* Speedometer SVG Canvas */}
      <div className="relative w-full aspect-[320/220] max-w-[280px] flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 320 220"
          className="w-full h-full cursor-pointer touch-none"
          onPointerDown={(e) => {
            setIsDragging(true);
            handlePointerInteraction(e);
          }}
          onPointerMove={(e) => {
            if (isDragging) handlePointerInteraction(e);
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          <defs>
            {/* Smooth speedometer gradient */}
            <linearGradient id="speedometerGrad" x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="45%" stopColor="#6366f1" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Background Track Arc (240° arch from 210° to -30°) */}
          <path
            d="M 73.4 190 A 100 100 0 1 1 246.6 190"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-zinc-200 dark:text-white/10"
          />

          {/* Active Gradient Meter Arc */}
          <path
            d="M 73.4 190 A 100 100 0 1 1 246.6 190"
            fill="none"
            stroke="url(#speedometerGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-300 ease-out"
          />

          {/* Radial Tick Lines & Labels */}
          {showTicks &&
            ticks.map((t, idx) => {
              const deg = -120 + t * 240;
              const rad = ((deg - 90) * Math.PI) / 180;
              const x1 = 160 + 82 * Math.cos(rad);
              const y1 = 140 + 82 * Math.sin(rad);
              const x2 = 160 + 72 * Math.cos(rad);
              const y2 = 140 + 72 * Math.sin(rad);

              const labelX = 160 + 60 * Math.cos(rad);
              const labelY = 140 + 60 * Math.sin(rad);
              const tickVal = Math.round(min + t * (max - min));

              return (
                <g key={idx}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-zinc-400 dark:text-white/30"
                  />
                  <text
                    x={labelX}
                    y={labelY + 3}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-zinc-400 dark:fill-zinc-500 font-semibold select-none"
                  >
                    {tickVal}
                  </text>
                </g>
              );
            })}

          {/* Dynamic Needle */}
          <g transform={`rotate(${needleAngle} 160 140)`} className="transition-transform duration-300 ease-out">
            {/* Tapered Needle Blade */}
            <polygon
              points="157,140 160,52 163,140"
              fill="#6366f1"
              filter="url(#needleGlow)"
              className="dark:fill-indigo-400"
            />
            {/* Needle Point Tip */}
            <circle cx="160" cy="50" r="2.5" fill="#ffffff" />
          </g>

          {/* Center Hub & Glass Pivot Cap */}
          <circle cx="160" cy="140" r="14" fill="currentColor" className="text-zinc-100 dark:text-zinc-900 shadow-md" />
          <circle cx="160" cy="140" r="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-white/20" />
          <circle cx="160" cy="140" r="6" fill="#6366f1" />
        </svg>

        {/* Live Numeric Readout Displayed directly below the Pivot */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              {clampedVal}
            </span>
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{unit}</span>
          </div>
          <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 tracking-wider uppercase mt-0.5">
            {label}
          </span>
          <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono">
            {sublabel}
          </span>
        </div>
      </div>

      {/* Interactive Range Slider (Synchronized for touch/mouse testing) */}
      {interactive && (
        <div className="w-full mt-4 pt-3 border-t border-zinc-200/60 dark:border-white/5 flex items-center gap-3">
          <span className="text-[10px] text-zinc-400 font-bold">{min}</span>
          <input
            type="range"
            min={min}
            max={max}
            value={clampedVal}
            onChange={(e) => setCurrentVal(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
          />
          <span className="text-[10px] text-zinc-400 font-bold">{max}</span>
        </div>
      )}
    </div>
  );
};

export default CircularGaugeSpeedometer;
