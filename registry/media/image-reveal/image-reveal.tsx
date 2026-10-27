import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VisualItem {
  id: string | number;
  url: string;
  label: string;
  tag?: string;
}

export interface ImageRevealProps {
  items?: VisualItem[];
  className?: string;
}

const defaultItems: VisualItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    label: "Neural Architecture",
    tag: "Design",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    label: "Kinetic Geometry",
    tag: "3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
    label: "Liquid Interface",
    tag: "Motion",
  },
];

export const ImageReveal: React.FC<ImageRevealProps> = ({
  items = defaultItems,
  className,
}) => {
  const [focusedItem, setFocusedItem] = useState<VisualItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 350, damping: 35 });
  const smoothY = useSpring(cursorY, { stiffness: 350, damping: 35 });

  const onMouseTrack = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md overflow-hidden select-none isolate",
        className
      )}
      onMouseMove={onMouseTrack}
      onMouseLeave={() => setFocusedItem(null)}
    >
      <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
        {items.map((item) => {
          const isHovered = focusedItem?.id === item.id;
          return (
            <div
              key={item.id}
              className="p-4 cursor-pointer relative flex items-center justify-between group transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
              onMouseEnter={() => setFocusedItem(item)}
            >
              <div className="flex items-center gap-3 relative z-20">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  0{item.id}
                </span>
                <span className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.label}
                </span>
                {item.tag && (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="relative z-20 flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-200 group-hover:scale-105">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              <div
                className={cn(
                  "h-[2px] bg-indigo-500 dark:bg-indigo-400 absolute bottom-0 left-0 transition-all duration-300 ease-out",
                  isHovered ? "w-full" : "w-0"
                )}
              />
            </div>
          );
        })}
      </div>

      {focusedItem && (
        <motion.div
          className="absolute z-30 pointer-events-none rounded-xl overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-700/50 hidden sm:block w-36 h-48"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          <img
            src={focusedItem.url}
            alt={focusedItem.label}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ImageReveal;
