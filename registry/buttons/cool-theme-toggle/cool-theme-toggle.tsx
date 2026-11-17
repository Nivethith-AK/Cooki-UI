"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoolThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  onToggle?: (theme: "light" | "dark") => void;
}

export function CoolThemeToggle({
  className,
  size = "md",
  theme: controlledTheme,
  onToggle,
}: CoolThemeToggleProps) {
  const [internalTheme, setInternalTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setInternalTheme(isDark ? "dark" : "light");

      const observer = new MutationObserver(() => {
        setInternalTheme(
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        );
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    }
  }, []);

  const activeTheme = controlledTheme !== undefined ? controlledTheme : internalTheme;

  const toggleTheme = () => {
    const next = activeTheme === "light" ? "dark" : "light";
    if (controlledTheme === undefined) {
      setInternalTheme(next);
      if (typeof document !== "undefined") {
        if (next === "dark") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
    }
    onToggle?.(next);
  };

  const sizes = {
    sm: {
      button: "w-12 h-6",
      thumb: "w-4 h-4",
      icon: "w-2.5 h-2.5",
      padding: "p-1",
      translateX: 24,
      cloudSize: "w-3 h-3",
    },
    md: {
      button: "w-16 h-8",
      thumb: "w-6 h-6",
      icon: "w-4 h-4",
      padding: "p-1",
      translateX: 32,
      cloudSize: "w-5 h-5",
    },
    lg: {
      button: "w-20 h-10",
      thumb: "w-8 h-8",
      icon: "w-5 h-5",
      padding: "p-1",
      translateX: 40,
      cloudSize: "w-6 h-6",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex rounded-full bg-zinc-200 dark:bg-zinc-800",
          currentSize.button
        )}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={cn(
        "relative rounded-full transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden shadow-inner cursor-pointer",
        activeTheme === "dark" ? "bg-slate-950 border border-slate-800" : "bg-sky-400 border border-sky-300",
        currentSize.button,
        currentSize.padding,
        className
      )}
      aria-label="Toggle theme"
    >
      {/* Sky & Space Celestial Background */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            opacity: activeTheme === "light" ? 1 : 0,
            y: activeTheme === "light" ? 0 : 8,
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-end pr-2 text-white"
        >
          <Cloud className={cn("text-white/90 fill-white/80", currentSize.cloudSize)} />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            opacity: activeTheme === "dark" ? 1 : 0,
            y: activeTheme === "dark" ? 0 : -10,
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-start pl-2"
        >
          <div className="relative w-full h-full">
            <span
              className={cn(
                "absolute top-1.5 left-2 rounded-full bg-yellow-200 shadow-[0_0_4px_rgba(254,240,138,0.8)] opacity-80",
                size === "lg" ? "w-1.5 h-1.5" : "w-1 h-1"
              )}
            />
            <span
              className={cn(
                "absolute bottom-2 left-4 rounded-full bg-yellow-100 shadow-[0_0_4px_rgba(254,240,138,0.6)] opacity-70",
                size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"
              )}
            />
            <span
              className={cn(
                "absolute top-2.5 left-6 rounded-full bg-amber-200 shadow-[0_0_4px_rgba(254,240,138,0.9)] opacity-90",
                size === "lg" ? "w-1 h-1" : "w-0.5 h-0.5"
              )}
            />
          </div>
        </motion.div>
      </div>

      {/* Toggle Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 32,
        }}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full shadow-md",
          activeTheme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-amber-300 border border-amber-200",
          currentSize.thumb
        )}
        animate={{
          x: activeTheme === "dark" ? currentSize.translateX : 0,
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Sun */}
          <motion.div
            initial={false}
            animate={{
              rotate: activeTheme === "dark" ? 180 : 0,
              scale: activeTheme === "dark" ? 0 : 1,
              opacity: activeTheme === "dark" ? 0 : 1,
            }}
            transition={{ duration: 0.35 }}
            className="absolute flex items-center justify-center"
          >
            <Sun className={cn("text-amber-900 fill-amber-400", currentSize.icon)} />
          </motion.div>

          {/* Moon */}
          <motion.div
            initial={false}
            animate={{
              rotate: activeTheme === "dark" ? 0 : -180,
              scale: activeTheme === "dark" ? 1 : 0,
              opacity: activeTheme === "dark" ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
            className="absolute flex items-center justify-center"
          >
            <Moon className={cn("text-yellow-200 fill-yellow-200", currentSize.icon)} />
          </motion.div>
        </div>
      </motion.div>
    </button>
  );
}

export default CoolThemeToggle;
