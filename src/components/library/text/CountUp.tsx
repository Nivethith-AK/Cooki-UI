import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// Helper function to format the number
const formatValue = (val: number, precision: number, sep: string): string => {
  return Number(val)
    .toFixed(precision)
    .replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};

export interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  separator?: string;
  interactive?: boolean;
  triggerOnView?: boolean;
  className?: string;
  numberClassName?: string;
  animationStyle?: "default" | "bounce" | "spring" | "gentle" | "energetic";
  colorScheme?: "default" | "gradient" | "primary" | "secondary" | "custom";
  customColor?: string;
  onAnimationComplete?: () => void;
}

const easingFunctions = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
};

const animationStyles = {
  default: { type: "tween" },
  bounce: { type: "spring", bounce: 0.25 },
  spring: { type: "spring", stiffness: 100, damping: 10 },
  gentle: { type: "spring", stiffness: 60, damping: 15 },
  energetic: { type: "spring", stiffness: 300, damping: 20 },
};

const colorSchemes = {
  default: "text-zinc-900 dark:text-zinc-50",
  gradient: "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  primary: "text-indigo-600 dark:text-indigo-400",
  secondary: "text-zinc-600 dark:text-zinc-400",
  custom: "",
};

export function CountUp({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  easing = "easeOut",
  separator = ",",
  interactive = true,
  triggerOnView = true,
  className,
  numberClassName,
  animationStyle = "default",
  colorScheme = "default",
  customColor,
  onAnimationComplete,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>(formatValue(0, decimals, separator));
  const containerRef = useRef<HTMLDivElement>(null);
  const count = useMotionValue(0);

  const animationConfig = {
    ...(animationStyles[animationStyle] as any),
    ease: easingFunctions[easing],
    duration: animationStyle === "default" ? duration : undefined,
  };

  useEffect(() => {
    const unsubscribe = count.on("change", (latest) => {
      setDisplayValue(formatValue(latest, decimals, separator));
    });
    return () => unsubscribe();
  }, [decimals, separator, count]);

  const runAnimation = () => {
    count.set(0);
    return animate(count, value, {
      ...animationConfig,
      onComplete: () => {
        onAnimationComplete?.();
      },
    });
  };

  useEffect(() => {
    if (!triggerOnView) {
      const controls = runAnimation();
      return () => controls?.stop();
    }

    let controls: any;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls = runAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [value, duration, easing, animationStyle, triggerOnView]);

  const colorClass =
    colorScheme === "custom" && customColor ? "" : colorSchemes[colorScheme];

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (interactive) runAnimation();
      }}
      className={cn(
        "inline-flex items-center justify-center font-bold font-mono tracking-tight text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 select-none cursor-pointer",
        className
      )}
      title={interactive ? "Click to replay count animation" : undefined}
    >
      <motion.div
        whileHover={interactive ? { scale: 1.05 } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        className={cn("flex items-center transition-all", colorClass, numberClassName)}
        style={colorScheme === "custom" && customColor ? { color: customColor } : undefined}
      >
        {prefix && <span className="mr-1">{prefix}</span>}
        <span>{displayValue}</span>
        {suffix && <span className="ml-1">{suffix}</span>}
      </motion.div>
    </div>
  );
}

export default CountUp;
