import React, { useRef, useEffect } from 'react';

export const FlowingLinesWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const lines = 7;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `hsla(${230 + i * 15}, 85%, 65%, 0.45)`;

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.008) + step + i * 0.4) * 45 +
            Math.cos((x * 0.004) - step) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      step += 0.025;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
      <canvas ref={canvasRef} width={500} height={224} className="w-full h-full" />
      <span className="absolute z-10 px-3 py-1 rounded-full bg-zinc-900/80 text-white text-[10px] font-mono border border-white/10 backdrop-blur-md">
        SINUSOIDAL RIBBON THREADS
      </span>
    </div>
  );
};
