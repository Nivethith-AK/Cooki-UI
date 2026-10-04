import React, { useState, useRef } from 'react';
import { ArrowsLeftRight } from '@phosphor-icons/react';

export const ImageComparisonSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      className="relative w-full max-w-md h-48 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 select-none cursor-ew-resize"
    >
      {/* Background (After / Wireframe) */}
      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
        <div className="text-center font-mono text-zinc-500">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">AFTER (OPTIMIZED)</span>
          <p className="text-[11px] mt-1 text-zinc-400">Zero JS Payload • 60 FPS Canvas WebGL</p>
        </div>
      </div>

      {/* Foreground (Before / Legacy) with clipPath */}
      <div
        className="absolute inset-0 bg-indigo-950 flex items-center justify-center"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <div className="text-center font-mono text-white">
          <span className="text-xs uppercase tracking-widest text-cyan-300 font-bold">BEFORE (LEGACY)</span>
          <p className="text-[11px] mt-1 text-indigo-200">1.4 MB Bundle • 18 DOM Mutations/sec</p>
        </div>
      </div>

      {/* Divider Bar */}
      <div
        style={{ left: `${sliderPos}%` }}
        className="absolute top-0 bottom-0 w-0.5 bg-white -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center"
      >
        <div className="w-6 h-6 rounded-full bg-white text-zinc-900 shadow-lg flex items-center justify-center">
          <ArrowsLeftRight size={12} weight="bold" />
        </div>
      </div>
    </div>
  );
};
