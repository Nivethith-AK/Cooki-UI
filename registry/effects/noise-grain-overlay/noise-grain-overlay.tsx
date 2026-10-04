import React, { useState } from 'react';

interface NoiseGrainOverlayProps {
  className?: string;
  initialOpacity?: number;
  children?: React.ReactNode;
}

export const NoiseGrainOverlay: React.FC<NoiseGrainOverlayProps> = ({
  className = '',
  initialOpacity = 0.07,
  children,
}) => {
  const [opacity, setOpacity] = useState(initialOpacity);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 p-8 ${className}`}>
      {/* SVG Procedural FeTurbulence Noise */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Internal Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            TEXTURE SYNTHESIZER
          </span>
          <h4 className="text-xl font-semibold text-white tracking-tight">
            Analog Film Grain & Noise Overlay
          </h4>
          <p className="text-xs text-zinc-400 max-w-sm">
            High-fidelity mathematical Perlin noise layer providing tactile physical texture to digital displays.
          </p>
        </div>

        {/* Live Controller */}
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-900/90 border border-white/10 w-full max-w-[220px]">
          <div className="flex items-center justify-between text-xs text-zinc-300 font-mono">
            <span>Grain Density</span>
            <span className="text-emerald-400 font-bold">{Math.round(opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.25"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {children}
    </div>
  );
};
