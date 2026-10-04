import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Play, Pause } from '@phosphor-icons/react';

export interface MatrixRainTerminalProps {
  fontSize?: number;
  speed?: number;
  className?: string;
}

export const MatrixRainTerminal: React.FC<MatrixRainTerminalProps> = ({
  fontSize = 14,
  speed = 33,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 260);

    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'.split('');
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationId: number;
    let lastTime = 0;

    const render = (time: number) => {
      if (isPlaying && time - lastTime > speed) {
        lastTime = time;
        ctx.fillStyle = 'rgba(5, 5, 10, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#10b981';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Head character is brighter
          ctx.fillStyle = '#a7f3d0';
          ctx.fillText(text, x, y);
          ctx.fillStyle = '#10b981';

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, fontSize, speed]);

  return (
    <div className={`relative w-full h-[260px] rounded-2xl overflow-hidden border border-emerald-500/20 bg-zinc-950 font-mono shadow-2xl ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      
      {/* HUD Header */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs">
          <Terminal size={14} weight="bold" />
          <span>CYBER_DECRYPT.SYS</span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto px-2 py-1 rounded-lg bg-zinc-900/80 border border-emerald-500/30 text-emerald-400 hover:text-white transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause size={12} weight="bold" /> : <Play size={12} weight="bold" />}
        </button>
      </div>
    </div>
  );
};
