import React, { useRef, useEffect } from 'react';

export const StarfieldHyperdriveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; z: number; oZ: number }[] = [];
    const count = 180;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 500,
        oZ: 500,
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let s of stars) {
        s.z -= 4;
        if (s.z <= 0) {
          s.z = 500;
          s.x = (Math.random() - 0.5) * 600;
          s.y = (Math.random() - 0.5) * 600;
        }

        const k = 220 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = Math.max(0.6, (1 - s.z / 500) * 2.8);
          ctx.fillStyle = '#e0e7ff';
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
      <canvas ref={canvasRef} width={500} height={224} className="w-full h-full" />
      <span className="absolute z-10 px-3 py-1 rounded-full bg-zinc-900/80 text-white text-[10px] font-mono border border-white/10 backdrop-blur-md">
        WARP FACTOR 9.2
      </span>
    </div>
  );
};
