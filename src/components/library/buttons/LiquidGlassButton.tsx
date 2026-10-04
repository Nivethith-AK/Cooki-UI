import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LiquidGlassButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'subtle' | 'emerald';
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children = 'Experience Refraction',
  className = '',
  onClick,
  variant = 'primary',
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const variantStyles = {
    primary: 'text-white border-white/20 bg-white/[0.07] dark:bg-white/[0.05] shadow-black/20',
    subtle: 'text-zinc-900 dark:text-zinc-100 border-zinc-900/10 dark:border-white/10 bg-zinc-900/[0.04] dark:bg-white/[0.03]',
    emerald: 'text-emerald-100 border-emerald-400/30 bg-emerald-500/[0.12] shadow-emerald-900/20',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative group overflow-hidden px-7 py-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 font-medium text-sm tracking-wide shadow-xl cursor-pointer ${variantStyles[variant]} ${className}`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Dynamic specular light reflection tracking cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 120px at ${coords.x}% ${coords.y}%, rgba(255,255,255,0.35), transparent 70%)`,
        }}
      />

      {/* Internal ambient glossy lens flare */}
      <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-2xl" />

      {/* Rim highlight border effect */}
      <div className="absolute inset-[1px] rounded-[15px] border border-white/10 pointer-events-none" />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
        {children}
      </span>
    </motion.button>
  );
};
