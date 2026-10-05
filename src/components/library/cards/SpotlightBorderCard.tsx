import React, { useRef, useState } from 'react';
import { Cpu, ArrowUpRight } from '@phosphor-icons/react';

export interface SpotlightBorderCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export const SpotlightBorderCard: React.FC<SpotlightBorderCardProps> = ({
  title = 'Autonomous Agent Pipeline',
  description = 'High-velocity distributed execution graph powered by continuous neural feedback and deterministic verification loops.',
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-sm rounded-3xl p-[1.5px] overflow-hidden transition-all duration-300 group ${className}`}
    >
      {/* Dynamic Cursor Spotlight Border */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.8), rgba(236, 72, 153, 0.6), transparent 70%)`,
        }}
      />

      {/* Card Body */}
      <div className="relative z-10 w-full h-full rounded-[22px] bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between border border-zinc-200/80 dark:border-white/10 shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
              <Cpu size={18} weight="bold" />
            </span>
            <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              ACTIVE
            </span>
          </div>

          <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400">99.98% Latency SLI</span>
          <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>Inspect</span>
            <ArrowUpRight size={13} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  );
};
