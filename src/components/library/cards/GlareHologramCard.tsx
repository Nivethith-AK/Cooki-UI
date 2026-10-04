import React, { useState, useRef } from 'react';
import { Star, ShieldCheck } from '@phosphor-icons/react';

export const GlareHologramCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-64 h-88 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/20 bg-zinc-950 p-5 shadow-2xl select-none cursor-pointer text-white flex flex-col justify-between"
    >
      {/* Dynamic Rainbow Glare Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(99, 102, 241, 0.3) 30%, rgba(6, 182, 212, 0.25) 50%, rgba(244, 63, 94, 0.2) 75%, transparent 100%)`,
          }}
        />
      )}

      {/* Hologram Sheen Diagonal Bar */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.8) 50%, transparent 60%)',
          transform: `translateX(${(coords.x - 50) * 1.5}%)`,
        }}
      />

      <div className="relative z-10 flex justify-between items-center">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20">EDITION #001</span>
        <Star size={16} weight="fill" className="text-amber-400" />
      </div>

      <div className="relative z-10 text-center py-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-xl flex items-center justify-center">
          <ShieldCheck size={32} className="text-white" />
        </div>
        <h4 className="font-extrabold text-lg mt-3 tracking-wide">QUANTUM CITADEL</h4>
        <p className="text-[11px] text-zinc-400 mt-1 font-mono">Founding Architect Member</p>
      </div>

      <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-zinc-400 border-t border-white/10 pt-3">
        <span>RARITY: MYTHIC</span>
        <span>SHA-256 VERIFIED</span>
      </div>
    </div>
  );
};
