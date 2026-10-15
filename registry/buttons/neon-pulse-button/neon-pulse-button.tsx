import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Lightning, ArrowRight, Play, Flame } from '@phosphor-icons/react';

export interface NeonPulseButtonProps {
  label?: string;
  colorTheme?: 'cyan' | 'emerald' | 'violet' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NeonPulseButton: React.FC<NeonPulseButtonProps> = ({
  label = 'Activate Superconductor',
  colorTheme = 'cyan',
  size = 'md',
  magnetic = true,
  onClick,
  className = '',
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Magnetic spring pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.35);
    mouseY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
    onClick?.();
  };

  const themeConfig = {
    cyan: {
      neonGlow: 'shadow-[0_0_30px_rgba(6,182,212,0.4)]',
      tracer: 'from-cyan-400 via-sky-400 to-transparent',
      text: 'text-cyan-400',
      aura: 'bg-cyan-500/20',
      activeRing: 'border-cyan-400',
    },
    emerald: {
      neonGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.4)]',
      tracer: 'from-emerald-400 via-teal-400 to-transparent',
      text: 'text-emerald-400',
      aura: 'bg-emerald-500/20',
      activeRing: 'border-emerald-400',
    },
    violet: {
      neonGlow: 'shadow-[0_0_30px_rgba(139,92,246,0.4)]',
      tracer: 'from-violet-400 via-purple-400 to-transparent',
      text: 'text-violet-400',
      aura: 'bg-violet-500/20',
      activeRing: 'border-violet-400',
    },
    amber: {
      neonGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.4)]',
      tracer: 'from-amber-400 via-orange-400 to-transparent',
      text: 'text-amber-400',
      aura: 'bg-amber-500/20',
      activeRing: 'border-amber-400',
    },
  }[colorTheme];

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-xs sm:text-sm gap-2.5',
    lg: 'px-8 py-4 text-sm sm:text-base gap-3',
  }[size];

  return (
    <div className="relative inline-flex items-center justify-center p-2 select-none">
      {/* Dynamic Ambient Aura */}
      <div 
        className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
          isHovered ? `${themeConfig.aura} scale-110 opacity-100` : 'opacity-0 scale-90'
        }`} 
      />

      {/* Button Motion Container */}
      <motion.button
        ref={btnRef}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative group inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider rounded-full bg-zinc-950 text-white overflow-hidden border border-white/10 transition-all duration-200 cursor-pointer ${sizeClasses} ${
          isHovered ? themeConfig.neonGlow : ''
        } ${className}`}
      >
        {/* Rotating Edge Tracer Gradient Border */}
        <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <div className={`w-full h-full bg-[conic-gradient(from_0deg,transparent_0_300deg,currentColor_360deg)] ${themeConfig.text}`} />
        </div>

        {/* Inner Solid Capsule Backdrop */}
        <div className="absolute inset-[1.5px] rounded-full bg-[#090a0f] z-0 transition-colors group-hover:bg-[#0c0e17]" />

        {/* Content Elements */}
        <div className="relative z-10 flex items-center gap-2">
          <Lightning size={16} weight="fill" className={`${themeConfig.text} transition-transform group-hover:scale-125`} />
          <span className="text-zinc-100 tracking-wider">{label}</span>
          <ArrowRight size={14} weight="bold" className="text-zinc-400 transition-transform group-hover:translate-x-1" />
        </div>

        {/* Click Shockwave Burst Ring */}
        {clicked && (
          <div className={`absolute inset-0 rounded-full border-2 ${themeConfig.activeRing} animate-ping pointer-events-none`} />
        )}
      </motion.button>
    </div>
  );
};
