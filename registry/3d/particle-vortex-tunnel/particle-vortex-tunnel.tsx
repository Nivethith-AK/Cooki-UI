import React, { useRef, useEffect } from 'react';

export const ParticleVortexTunnel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; z: number }[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: Math.random() * 400,
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let s of stars) {
        s.z -= 2.2;
        if (s.z <= 0) s.z = 400;

        const k = 200 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = Math.max(0.8, (1 - s.z / 400) * 3);
          const alpha = 1 - s.z / 400;

          ctx.fillStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
      <canvas ref={canvasRef} width={400} height={224} className="w-full h-full" />
      <span className="absolute z-10 bottom-3 px-3 py-1 rounded-full bg-zinc-900/80 text-[10px] font-mono text-zinc-400 border border-white/10">
        WARP TUNNEL VELOCITY
      </span>
    </div>
  );
};
