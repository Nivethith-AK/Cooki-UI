import React, { useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  radius: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  accel: number;
  decay: number;
  life: number;
}

export interface MagicParticleLoaderProps {
  size?: number;
  particleCount?: number;
  speed?: number;
  hueRange?: [number, number];
  className?: string;
}

export const MagicParticleLoader: React.FC<MagicParticleLoaderProps> = ({
  size = 180,
  particleCount = 1,
  speed = 1,
  hueRange = [210, 290],
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const tickRef = useRef(0);
  const globalAngleRef = useRef(0);
  const globalRotationRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const visibilityRef = useRef(true);

  useEffect(() => {
    visibilityRef.current = isInView;
  }, [isInView]);

  const createParticle = useCallback(
    (centerX: number, centerY: number, tick: number, minSize: number): Particle => {
      return {
        radius: 6,
        x: centerX + (Math.cos(tick / 20) * minSize) / 2,
        y: centerY + (Math.sin(tick / 20) * minSize) / 2,
        angle: globalRotationRef.current + globalAngleRef.current,
        speed: 0,
        accel: 0.01,
        decay: 0.012,
        life: 1,
      };
    },
    []
  );

  const stepParticle = useCallback(
    (particle: Particle) => {
      particle.speed += particle.accel;
      particle.x += Math.cos(particle.angle) * particle.speed * speed;
      particle.y += Math.sin(particle.angle) * particle.speed * speed;
      particle.angle += Math.PI / 64;
      particle.accel *= 1.01;
      particle.life -= particle.decay;
    },
    [speed]
  );

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle, index: number, tick: number) => {
      const hue =
        hueRange[0] +
        ((tick + particle.life * 100) % (hueRange[1] - hueRange[0]));
      ctx.fillStyle = ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${particle.life * 0.9})`;

      // Draw stroke trail to previous particle
      ctx.beginPath();
      if (particlesRef.current[index - 1]) {
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particlesRef.current[index - 1].x, particlesRef.current[index - 1].y);
      }
      ctx.stroke();

      // Main particle orb
      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        Math.max(0.001, particle.life * particle.radius),
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Micro glow flecks
      const glowSize = Math.random() * 1.5;
      const glowX = particle.x + (Math.random() - 0.5) * 30 * particle.life;
      const glowY = particle.y + (Math.random() - 0.5) * 30 * particle.life;
      ctx.fillRect(Math.floor(glowX), Math.floor(glowY), glowSize, glowSize);
    },
    [hueRange]
  );

  const animate = useCallback(() => {
    if (!visibilityRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const minSize = size * 0.5;

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(centerX, centerY, tickRef.current, minSize));
    }

    // Step particles backwards so removals never skip items
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      stepParticle(p);
      if (p.life <= 0) {
        particlesRef.current.splice(i, 1);
      }
    }

    ctx.clearRect(0, 0, size, size);

    particlesRef.current.forEach((particle, index) => {
      drawParticle(ctx, particle, index, tickRef.current);
    });

    globalRotationRef.current += (Math.PI / 6) * speed;
    globalAngleRef.current += (Math.PI / 6) * speed;
    tickRef.current++;

    animationRef.current = requestAnimationFrame(animate);
  }, [createParticle, stepParticle, drawParticle, particleCount, speed, size]);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Reset transform to identity before scaling by DPR
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "lighter";

    particlesRef.current = [];
    tickRef.current = 0;
    globalAngleRef.current = 0;
    globalRotationRef.current = 0;
  }, [size]);

  useEffect(() => {
    setupCanvas();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setupCanvas, animate]);

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center p-4", className)}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default MagicParticleLoader;
