import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { QrCode, Cpu } from '@phosphor-icons/react';

export const HangingIdCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000 flex flex-col items-center justify-center p-4">
      <div className="h-8 w-2 bg-gradient-to-b from-indigo-700 to-indigo-500 rounded-t-sm shadow-md" />
      <div className="h-2.5 w-5 rounded-sm bg-zinc-800 border border-white/20 mb-[-3px] z-20 shadow" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-52 h-76 rounded-3xl border border-white/20 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black p-4 shadow-2xl backdrop-blur-xl flex flex-col justify-between text-white font-mono cursor-pointer select-none"
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60" />

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <Cpu size={16} className="text-cyan-400" />
            <span className="text-[11px] font-bold tracking-wider">COOKI PASSPORT</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[8px] border border-cyan-400/30">
            PRO VIP
          </span>
        </div>

        <div className="flex flex-col items-center my-auto z-10">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-1 shadow-lg shadow-indigo-500/20 mb-2 flex items-center justify-center font-sans font-extrabold text-lg text-white">
            CK
          </div>
          <h4 className="font-bold text-xs text-white">Alex Vanguard</h4>
          <p className="text-[9px] text-zinc-400 mt-0.5">Staff Runtime Architect</p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 z-10 text-[9px]">
          <div>
            <span className="text-zinc-500">ID TOKEN</span>
            <div className="font-bold text-zinc-300">#8942-CK</div>
          </div>
          <QrCode size={20} className="text-white" />
        </div>
      </motion.div>
    </div>
  );
};
