import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cube, ShieldCheck, Cpu } from '@phosphor-icons/react';

interface PerspectiveCard3DProps {
  className?: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

export const PerspectiveCard3D: React.FC<PerspectiveCard3DProps> = ({
  className = '',
  title = 'Autonomous Neural Core',
  subtitle = 'High-frequency model execution with sub-millisecond tensor dispatch.',
  tag = 'SYSTEM ARCHITECTURE',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['18deg', '-18deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-18deg', '18deg']);
  const gleamX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const gleamY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className={`relative inline-block w-full max-w-[360px] p-2 ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10 p-6 shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/10 cursor-pointer overflow-hidden"
      >
        {/* Holographic specular gleam */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 240px at 50% 50%, rgba(56, 189, 248, 0.4), transparent 70%)`,
            left: gleamX,
            top: gleamY,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Layer 1: Floating Header Badge (Z: 40px) */}
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="relative z-10 flex items-center justify-between mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            <Cpu size={14} weight="bold" />
            {tag}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
            <Cube size={16} weight="duotone" className="text-cyan-400" />
          </div>
        </div>

        {/* Layer 2: Graphic Core (Z: 60px) */}
        <div
          style={{ transform: 'translateZ(60px)' }}
          className="relative z-10 my-6 h-28 rounded-xl bg-gradient-to-br from-cyan-950/40 via-indigo-950/30 to-violet-950/40 border border-cyan-500/20 flex items-center justify-center overflow-hidden"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 blur-xl opacity-40 animate-pulse" />
          <div className="absolute font-mono text-3xl font-bold tracking-widest text-cyan-200 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
            0101
          </div>
        </div>

        {/* Layer 3: Typography & Description (Z: 30px) */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 space-y-2">
          <h4 className="text-lg font-semibold text-white tracking-tight">{title}</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">{subtitle}</p>
        </div>

        {/* Layer 4: Footer specs (Z: 20px) */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500"
        >
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck size={14} weight="bold" />
            VERIFIED SECURE
          </span>
          <span>LATENCY: 0.4ms</span>
        </div>
      </motion.div>
    </div>
  );
};
