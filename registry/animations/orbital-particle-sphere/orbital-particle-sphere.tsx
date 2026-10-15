import React, { useRef, useEffect, useState } from 'react';
import { Globe, Compass, ArrowsClockwise } from '@phosphor-icons/react';

export interface OrbitalParticleSphereProps {
  particleCount?: number;
  rotationSpeed?: number;
  colorTheme?: 'cyan' | 'emerald' | 'violet' | 'amber';
  interactive?: boolean;
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const OrbitalParticleSphere: React.FC<OrbitalParticleSphereProps> = ({
  particleCount = 140,
  rotationSpeed = 1,
  colorTheme = 'cyan',
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number | null>(null);
  const rotYRef = useRef(0);
  const rotXRef = useRef(0.2);
  const velocityRef = useRef({ vx: 0.006 * rotationSpeed, vy: 0.002 * rotationSpeed });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;

    // Responsive Canvas Resize Observer
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Generate sphere points using Fibonacci Golden Spiral
    const points: Point3D[] = [];
    const count = Math.max(60, Math.min(particleCount, 240));
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      points.push({
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
      });
    }

    const themeColors = {
      cyan: { front: '#38bdf8', back: '#0369a1', glow: 'rgba(56,189,248,0.3)' },
      emerald: { front: '#34d399', back: '#065f46', glow: 'rgba(52,211,153,0.3)' },
      violet: { front: '#a78bfa', back: '#5b21b6', glow: 'rgba(167,139,250,0.3)' },
      amber: { front: '#fbbf24', back: '#92400e', glow: 'rgba(251,191,36,0.3)' },
    }[colorTheme];

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply angular rotation & velocity inertia
      if (!isDraggingRef.current) {
        rotYRef.current += velocityRef.current.vx;
        rotXRef.current += velocityRef.current.vy;
      }

      const sphereRadius = Math.min(canvas.width, canvas.height) * 0.38;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 340;

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosX = Math.cos(rotXRef.current);
      const sinX = Math.sin(rotXRef.current);

      // Project and sort points by Z depth for accurate rendering
      const projected = points.map((p) => {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2 * sphereRadius);
        const px = cx + x1 * sphereRadius * scale;
        const py = cy + y2 * sphereRadius * scale;

        return { px, py, z: z2, scale };
      });

      // Sort back-to-front
      projected.sort((a, b) => a.z - b.z);

      // Draw projected particle nodes
      projected.forEach((pt) => {
        const isFront = pt.z > 0;
        const depthAlpha = Math.max(0.12, Math.min(1, (pt.z + 1) / 2));
        const size = Math.max(1, (pt.z + 1.2) * 2.2);

        ctx.save();
        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = isFront ? themeColors.front : themeColors.back;

        if (isFront && size > 2.2) {
          ctx.shadowColor = themeColors.front;
          ctx.shadowBlur = 6;
        }

        ctx.beginPath();
        ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animIdRef.current = requestAnimationFrame(render);
    };

    animIdRef.current = requestAnimationFrame(render);

    // Pause loop when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        animIdRef.current = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [particleCount, rotationSpeed, colorTheme]);

  // Interactive Drag Controls
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !interactive) return;
    const deltaX = e.clientX - lastMouseRef.current.x;
    const deltaY = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    rotYRef.current += deltaX * 0.008;
    rotXRef.current += deltaY * 0.008;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className={`relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden bg-black border border-white/10 flex items-center justify-center select-none ${className}`}>
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Responsive 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Telemetry Overlay */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <Globe size={13} className="text-cyan-400" />
          <span>FIBONACCI SPHERICAL MESH</span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">DRAG CANVAS TO ROTATE ORBIT</span>
      </div>
    </div>
  );
};
