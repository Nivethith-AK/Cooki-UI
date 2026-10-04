import React, { useState } from 'react';
import { ArrowsLeftRight } from '@phosphor-icons/react';

export const InteractiveImageCompareLens: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full max-w-md h-[220px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 select-none shadow-xl">
      {/* Before Image (Grayscale / Dark) */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold">
          [LEGACY FRAMEWORK]
        </span>
      </div>

      {/* After Image (Luminous Gradient) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
          [COOKI UI ECOSYSTEM]
        </span>
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-900 shadow-xl border border-zinc-300">
          <ArrowsLeftRight size={14} weight="bold" />
        </div>
      </div>

      {/* Slider input handle */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
      />
    </div>
  );
};
