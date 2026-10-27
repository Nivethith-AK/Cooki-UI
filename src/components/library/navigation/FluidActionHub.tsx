import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings2, 
  X, 
  Sun, 
  Moon, 
  Share2, 
  Link2, 
  Compass, 
  ArrowUp, 
  Check,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FluidActionHubProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "inline";
  className?: string;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

export const FluidActionHub = ({
  position = "inline",
  className,
  onThemeToggle,
  isDark = false,
}: FluidActionHubProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(42);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6 z-50",
    "bottom-left": "fixed bottom-6 left-6 z-50",
    "top-right": "fixed top-6 right-6 z-50",
    "top-left": "fixed top-6 left-6 z-50",
    inline: "relative z-30",
  };

  const radius = 24;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 350, damping: 25 } },
  };

  return (
    <div 
      ref={containerRef}
      className={cn("font-sans select-none", positionClasses[position], className)}
    >
      <motion.div
        layout
        initial={{ borderRadius: 28 }}
        animate={{ 
          width: isOpen ? 290 : 52,
          height: isOpen ? 340 : 52,
          borderRadius: isOpen ? 20 : 26
        }}
        transition={{ 
          type: "spring", 
          stiffness: 380, 
          damping: 28,
        }}
        className="bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-xl shadow-zinc-500/10 dark:shadow-black/60 overflow-hidden flex flex-col justify-start"
      >
        {/* Toggle Button wrapper */}
        <div className="relative w-[52px] h-[52px] flex items-center justify-center shrink-0">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[52px] h-[52px] flex items-center justify-center relative focus:outline-none z-20 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Quick Panel"
          >
            <svg className="w-12 h-12 absolute -rotate-90 pointer-events-none">
              <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx="24"
                cy="24"
                className="text-indigo-600 dark:text-indigo-400 transition-all duration-150"
              />
            </svg>

            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="settings"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Settings2 className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                </motion.div>
              ) : (
                <motion.div
                  key="close"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Panel Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="px-4 pb-4 flex flex-col gap-3 text-left flex-1 overflow-hidden"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="flex flex-col gap-0.5 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Quick Access
                </span>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-500" /> System Hub
                </span>
              </motion.div>

              {/* Progress Card */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/40 p-2.5 rounded-xl shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase">Scroll Read</span>
                  <span className="text-sm font-bold font-mono tracking-tight text-zinc-800 dark:text-zinc-200">
                    {Math.round(scrollProgress)}% Scrolled
                  </span>
                </div>
                <button
                  onClick={handleScrollToTop}
                  className="p-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  title="Scroll to Top"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
              </motion.div>

              {/* Controls */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2">
                <button
                  onClick={onThemeToggle}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all gap-1.5 text-center text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[9px] font-medium uppercase tracking-wider">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-[9px] font-medium uppercase tracking-wider">Dark Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all gap-1.5 text-center text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                      <span className="text-[9px] font-medium uppercase tracking-wider">Copy Link</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Share links */}
              <motion.div variants={itemVariants} className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=Cooki%20UI%20Components`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all text-[10px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Post
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: document.title, url: window.location.href });
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all text-[10px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  <Share2 className="w-3 h-3 text-zinc-600 dark:text-zinc-300" />
                  Share
                </button>
              </motion.div>

              {/* Footer */}
              <motion.div variants={itemVariants} className="flex justify-between items-center text-[9px] text-zinc-400 dark:text-zinc-500 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-2 mt-auto">
                <span className="flex items-center gap-1 font-semibold">
                  <Monitor className="w-2.5 h-2.5 text-indigo-500" /> Cooki UI
                </span>
                <span className="font-mono text-[9px]">v2.1.0</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FluidActionHub;
