import React, { useRef, useEffect, useState } from 'react';
import { Gift, ArrowClockwise } from '@phosphor-icons/react';

export const ScratchToRevealCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 140;

    ctx.fillStyle = '#71717a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL CODE', canvas.width / 2, canvas.height / 2 + 4);
    setIsScratched(false);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const scratchAtPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    setIsScratched(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) scratchAtPoint(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      scratchAtPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-xl">
      <div className="relative w-[280px] h-[140px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 select-none">
        {/* Hidden Content Underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-zinc-900 text-center p-4">
          <Gift size={24} className="text-amber-400 mb-1" weight="fill" />
          <span className="font-mono text-sm font-bold text-white tracking-widest">
            COOKI-PRO-VIP99
          </span>
          <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
            100% OFF PRO REGISTRY
          </span>
        </div>

        {/* Scratch Surface Canvas */}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          onClick={(e) => scratchAtPoint(e.clientX, e.clientY)}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />
      </div>

      <button
        onClick={initCanvas}
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowClockwise size={12} />
        <span>Reset Surface</span>
      </button>
    </div>
  );
};
