import React, { useRef, useEffect } from 'react';

export const PlasmaGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 50;

      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius + 20);
      grad.addColorStop(0, '#a855f7');
      grad.addColorStop(0.4, '#6366f1');
      grad.addColorStop(0.8, '#06b6d4');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 20, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 7; i++) {
        const angle = (i * Math.PI * 2) / 7 + Math.sin(t + i) * 0.3;
        const ex = cx + Math.cos(angle) * (radius + Math.sin(t * 2 + i) * 10);
        const ey = cy + Math.sin(angle) * (radius + Math.cos(t * 2 + i) * 10);

        ctx.strokeStyle = i % 2 === 0 ? '#38bdf8' : '#e879f9';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(
          cx + Math.cos(angle + 0.5) * 25,
          cy + Math.sin(angle + 0.5) * 25,
          ex,
          ey
        );
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative rounded-full p-2 border border-white/20 bg-black/80 shadow-2xl">
        <canvas ref={canvasRef} width={160} height={160} className="rounded-full" />
      </div>
      <span className="mt-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        Parametric Plasma Orb
      </span>
    </div>
  );
};
