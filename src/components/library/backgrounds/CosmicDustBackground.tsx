import React, { useRef, useEffect } from 'react';

interface CosmicDustBackgroundProps {
  className?: string;
  particleCount?: number;
  dustColor?: string;
  interactive?: boolean;
  children?: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
}

export const CosmicDustBackground: React.FC<CosmicDustBackgroundProps> = ({
  className = '',
  particleCount = 120,
  dustColor = 'rgba(165, 180, 252, ',
  interactive = true,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.8,
        maxAlpha: 0.3 + Math.random() * 0.6,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Pulse alpha
        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Interactive mouse gravity deflection
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${dustColor}${Math.max(0, p.alpha)})`;
        ctx.shadowBlur = p.size > 1.5 ? 8 : 0;
        ctx.shadowColor = '#818cf8';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, dustColor, interactive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full min-h-[360px] overflow-hidden rounded-2xl bg-zinc-950 flex items-center justify-center ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Atmospheric ambient nebulas */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-600/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-lg p-8 text-center pointer-events-auto">
        {children || (
          <div className="space-y-3 bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
            <span className="inline-block px-3 py-1 text-xs font-mono font-medium tracking-widest text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
              DEEP COSMOS PARTICLES
            </span>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              Cosmic Dust Stardust
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hover and move your mouse to disturb the particulate gravitational field.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
