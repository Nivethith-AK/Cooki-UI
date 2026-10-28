import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { QrCode, ShieldCheck, Fingerprint, ArrowsClockwise } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export interface HangingIdCardProps {
  name?: string;
  role?: string;
  idNumber?: string;
  ribbonColor?: 'indigo' | 'cyan' | 'emerald' | 'crimson';
  interactive?: boolean;
  className?: string;
}

const RIBBON_STYLES = {
  indigo: {
    strap: 'from-indigo-600 via-indigo-700 to-indigo-900 border-indigo-500/30',
    accent: 'bg-indigo-500',
    text: 'text-indigo-400',
    glow: 'shadow-indigo-500/20',
  },
  cyan: {
    strap: 'from-cyan-600 via-cyan-700 to-cyan-900 border-cyan-500/30',
    accent: 'bg-cyan-500',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  emerald: {
    strap: 'from-emerald-600 via-emerald-700 to-emerald-900 border-emerald-500/30',
    accent: 'bg-emerald-500',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  crimson: {
    strap: 'from-rose-600 via-rose-700 to-rose-900 border-rose-500/30',
    accent: 'bg-rose-500',
    text: 'text-rose-400',
    glow: 'shadow-rose-500/20',
  },
};

export const HangingIdCard: React.FC<HangingIdCardProps> = ({
  name = 'Alex Vanguard',
  role = 'Staff Runtime Architect',
  idNumber = '#8942-CK',
  ribbonColor = 'indigo',
  interactive = true,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Pendulum spring physics
  const springX = useSpring(dragX, { stiffness: 220, damping: 14, mass: 1.2 });
  const springY = useSpring(dragY, { stiffness: 220, damping: 14, mass: 1.2 });

  // Natural pendulum rotation derived from horizontal displacement
  const pendulumAngle = useTransform(springX, [-150, 150], [-25, 25]);
  const cardRotateY = useTransform(springX, [-150, 150], [-25, 25]);
  const cardRotateX = useTransform(springY, [-100, 100], [15, -15]);
  const glareOpacity = useTransform(springX, [-120, 0, 120], [0.6, 0.15, 0.6]);

  const style = RIBBON_STYLES[ribbonColor] || RIBBON_STYLES.indigo;

  return (
    <div
      className={cn(
        'relative w-full h-[390px] flex flex-col items-center justify-start overflow-hidden select-none [perspective:1200px]',
        className
      )}
    >
      {/* Top Ceiling Anchor Bracket */}
      <div className="absolute top-0 z-30 flex flex-col items-center">
        <div className="w-14 h-2 rounded-b-md bg-zinc-800 dark:bg-zinc-700 border-x border-b border-zinc-600 shadow-md" />
        <div className="w-2 h-2.5 bg-zinc-600 rounded-b-sm" />
      </div>

      {/* Complete Suspended Lanyard Assembly with Top Pivot */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotate: pendulumAngle,
          transformOrigin: 'top center',
        }}
        drag={interactive ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.65}
        onDragEnd={() => {
          dragX.set(0);
          dragY.set(0);
        }}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing touch-none z-20"
      >
        {/* Lanyard Fabric Ribbon */}
        <div
          className={cn(
            'w-6 h-12 bg-gradient-to-b rounded-b-sm border-x shadow-md relative flex flex-col items-center justify-between py-1 overflow-hidden',
            style.strap
          )}
        >
          {/* Woven Fabric Texture Lines */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)] pointer-events-none" />
          <div className="text-[6px] font-mono font-bold tracking-widest text-white/50 uppercase rotate-90 my-auto whitespace-nowrap">
            COOKI UI
          </div>
        </div>

        {/* Metallic Lanyard Clasp & Carabiner Swivel */}
        <div className="relative flex flex-col items-center -mt-1 z-20">
          {/* Crimp Band */}
          <div className="w-7 h-3 rounded-sm bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 border border-zinc-500 shadow-sm flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-zinc-600" />
          </div>
          {/* Steel Swivel Hook Ring */}
          <div className="w-3 h-4 rounded-full border-2 border-zinc-400 -mt-1 shadow" />
          {/* Split Keyring */}
          <div className="w-4 h-2 rounded-full border-2 border-zinc-300 -mt-2 z-10" />
        </div>

        {/* 3D Interactive Badge Body */}
        <motion.div
          style={{
            rotateY: cardRotateY,
            rotateX: cardRotateX,
          }}
          className="relative w-52 h-[264px] rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-black p-4 shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between text-white font-mono select-none -mt-1 group overflow-hidden"
        >
          {/* Card Slot Opening at Top */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full bg-zinc-950 border border-white/20 z-30" />

          {/* Dynamic Shimmering Holographic Glare */}
          <motion.div
            style={{ opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-cyan-400/20 to-violet-500/20 mix-blend-overlay transition-opacity"
          />

          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 p-4 flex flex-col justify-between"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between z-10 pt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-md bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                      <Fingerprint size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-[9px] font-bold tracking-wider text-zinc-200">
                      COOKI PASSPORT
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-400/15 text-cyan-300 text-[7px] font-extrabold border border-cyan-400/30">
                    PRO VIP
                  </span>
                </div>

                {/* Holographic User Avatar */}
                <div className="flex flex-col items-center my-auto z-10 text-center">
                  <div className="relative mb-2">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
                      <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center font-sans font-black text-base text-white">
                        CK
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-black shadow">
                      <ShieldCheck size={10} weight="bold" />
                    </div>
                  </div>

                  <h4 className="font-bold text-xs text-white tracking-tight leading-tight">{name}</h4>
                  <p className="text-[9px] text-zinc-400 mt-0.5 font-sans">{role}</p>
                </div>

                {/* Footer Credentials */}
                <div className="flex items-center justify-between border-t border-white/10 pt-2 z-10 text-[8px]">
                  <div className="flex flex-col">
                    <span className="text-[7px] text-zinc-500 font-mono tracking-wider">ID CREDENTIAL</span>
                    <span className="font-bold text-zinc-300 font-mono">{idNumber}</span>
                  </div>
                  <div className="p-1 rounded-md bg-white/5 border border-white/10">
                    <QrCode size={18} className="text-zinc-200" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 p-4 flex flex-col justify-between text-left"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 pt-1">
                  <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Security Chip</span>
                  <Fingerprint size={14} className="text-cyan-400" />
                </div>

                <div className="space-y-1.5 text-[8px] text-zinc-400 leading-relaxed font-mono my-auto">
                  <p className="text-zinc-300 font-semibold">AUTHORIZED RUNTIME PASS</p>
                  <p className="text-zinc-500 text-[7.5px]">
                    Enclave: us-east-core-4
                    <br />
                    Perms: sudo, deploy, mesh
                    <br />
                    TTL: 2026-12-31T23:59Z
                  </p>
                  <div className="h-5 w-full rounded bg-zinc-800 border border-white/10 flex items-center px-1.5 text-[7px] text-zinc-300 font-mono">
                    BARCODE: |||| ||| ||||| ||
                  </div>
                </div>

                <div className="text-[7px] text-zinc-500 border-t border-white/10 pt-1.5">
                  Cooki UI Architecture System
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flip Card Toggle Button */}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFlipped((prev) => !prev);
            }}
            className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-40"
            title="Flip Badge"
          >
            <ArrowsClockwise size={11} weight="bold" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HangingIdCard;
