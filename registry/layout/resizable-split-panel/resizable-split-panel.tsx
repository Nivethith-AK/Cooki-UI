import React, { useState, useRef } from 'react';
import { DotsThreeVertical } from '@phosphor-icons/react';

export const ResizableSplitPanel: React.FC = () => {
  const [splitPos, setSplitPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPos(Math.min(80, Math.max(20, pct)));
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg h-48 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-950 overflow-hidden flex select-none font-mono text-xs"
    >
      {/* Left Code View */}
      <div
        style={{ width: `${splitPos}%` }}
        className="h-full bg-zinc-900/60 p-4 flex flex-col justify-between overflow-hidden"
      >
        <span className="text-[10px] text-indigo-400 font-bold uppercase">Code View ({Math.round(splitPos)}%)</span>
        <div className="text-[11px] text-zinc-300 font-mono">
          const status = "verified";
          <br />
          render(&lt;Dock /&gt;);
        </div>
        <span className="text-[9px] text-zinc-600">TypeScript 5.9</span>
      </div>

      {/* Drag Divider */}
      <div
        onMouseDown={handleMouseDown}
        className="w-2.5 h-full bg-zinc-800 hover:bg-indigo-500 cursor-col-resize flex items-center justify-center transition-colors z-10 shrink-0"
      >
        <DotsThreeVertical size={12} className="text-zinc-500" />
      </div>

      {/* Right Canvas Preview */}
      <div
        style={{ width: `${100 - splitPos}%` }}
        className="h-full bg-zinc-950 p-4 flex flex-col justify-between items-center text-center overflow-hidden"
      >
        <span className="text-[10px] text-cyan-400 font-bold uppercase">Live Canvas</span>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-lg" />
        <span className="text-[9px] text-zinc-600">Interactive</span>
      </div>
    </div>
  );
};
