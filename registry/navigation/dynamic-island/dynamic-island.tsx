import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type IslandPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "inline";

export interface IslandSection {
  id: string;
  label: string;
}

export interface IslandFont {
  name: string;
  value: string;
}

export interface IslandTheme {
  name: string;
  color: string;
  color2?: string;
}

export interface DynamicIslandProps {
  position?: IslandPosition;
  sections?: IslandSection[];
  defaultSectionLabel?: string;
  sectionIcon?: React.ReactNode;
  fonts?: IslandFont[];
  showFontPicker?: boolean;
  defaultFontIndex?: number;
  themes?: IslandTheme[];
  showThemePicker?: boolean;
  defaultThemeIndex?: number;
  storageKey?: string;
  disablePersistence?: boolean;
  className?: string;
  onSectionChange?: (section: IslandSection | null) => void;
  onFontChange?: (font: IslandFont) => void;
  onThemeChange?: (theme: IslandTheme) => void;
}

const DEFAULT_FONTS: IslandFont[] = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Geist", value: "'Geist', sans-serif" },
  { name: "Mono", value: "'Geist Mono', monospace" },
];

const DEFAULT_THEMES: IslandTheme[] = [
  { name: "Indigo", color: "#6366f1", color2: "#818cf8" },
  { name: "Emerald", color: "#10b981", color2: "#34d399" },
  { name: "Violet", color: "#8b5cf6", color2: "#a78bfa" },
  { name: "Rose", color: "#f43f5e", color2: "#fb7185" },
];

const DEFAULT_SECTIONS: IslandSection[] = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
];

function getPositionClasses(position: IslandPosition): string {
  switch (position) {
    case "top-left": return "fixed top-4 left-4 z-50";
    case "top-center": return "fixed top-4 left-1/2 -translate-x-1/2 z-50";
    case "top-right": return "fixed top-4 right-4 z-50";
    case "bottom-left": return "fixed bottom-4 left-4 z-50";
    case "bottom-right": return "fixed bottom-4 right-4 z-50";
    case "bottom-center": return "fixed bottom-4 left-1/2 -translate-x-1/2 z-50";
    case "inline":
    default:
      return "relative z-30";
  }
}

export function DynamicIsland({
  position = "inline",
  sections = DEFAULT_SECTIONS,
  defaultSectionLabel = "Overview",
  sectionIcon,
  fonts = DEFAULT_FONTS,
  showFontPicker = true,
  defaultFontIndex = 0,
  themes = DEFAULT_THEMES,
  showThemePicker = true,
  defaultThemeIndex = 0,
  storageKey = "island",
  disablePersistence = true,
  className = "",
  onSectionChange,
  onFontChange,
  onThemeChange,
}: DynamicIslandProps) {
  const [activeTab, setActiveTab] = useState<"font" | "theme" | null>(null);
  const [currentFont, setCurrentFont] = useState<IslandFont>(fonts[defaultFontIndex] ?? fonts[0]);
  const [currentTheme, setCurrentTheme] = useState<IslandTheme>(themes[defaultThemeIndex] ?? themes[0]);
  const [scrollProgress, setScrollProgress] = useState(35);
  const [currentSection, setCurrentSection] = useState(defaultSectionLabel);
  const islandRef = useRef<HTMLDivElement>(null);

  const dropDir = position.startsWith("top") ? "down" : "up";
  const positionCls = getPositionClasses(position);
  const dropdownBase = dropDir === "up" ? "absolute bottom-full mb-2.5" : "absolute top-full mt-2.5";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const accentColor = currentTheme.color;

  return (
    <div className={cn(positionCls, className)}>
      <div
        ref={islandRef}
        className="relative flex items-center p-1.5 rounded-full border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 shadow-xl backdrop-blur-xl select-none"
      >
        {/* Font Picker */}
        {showFontPicker && fonts.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setActiveTab(activeTab === "font" ? null : "font")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
                activeTab === "font"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
              )}
            >
              {currentFont.name}
            </button>

            <AnimatePresence>
              {activeTab === "font" && (
                <motion.div
                  initial={{ opacity: 0, y: dropDir === "up" ? 8 : -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: dropDir === "up" ? 8 : -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    dropdownBase,
                    "left-0 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-1.5 flex flex-col z-50"
                  )}
                >
                  {fonts.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => {
                        setCurrentFont(font);
                        setActiveTab(null);
                        onFontChange?.(font);
                      }}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer",
                        currentFont.name === font.name
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      )}
                    >
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {showFontPicker && <div className="w-[1px] h-3.5 bg-zinc-200 dark:bg-white/10 mx-1" />}

        {/* Scroll Progress & Section */}
        <button
          onClick={() => {
            if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            {sectionIcon ? (
              sectionIcon
            ) : (
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  className="text-zinc-200 dark:text-white/20"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  strokeWidth="3.5"
                  fill="none"
                  stroke={accentColor}
                  strokeDasharray={`${scrollProgress}, 100`}
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            )}
          </div>
          <span className="w-16 text-center truncate">{currentSection}</span>
        </button>

        {showThemePicker && <div className="w-[1px] h-3.5 bg-zinc-200 dark:bg-white/10 mx-1" />}

        {/* Theme Picker */}
        {showThemePicker && themes.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setActiveTab(activeTab === "theme" ? null : "theme")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
                activeTab === "theme"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: currentTheme.color }}
              />
              <span>{currentTheme.name}</span>
            </button>

            <AnimatePresence>
              {activeTab === "theme" && (
                <motion.div
                  initial={{ opacity: 0, y: dropDir === "up" ? 8 : -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: dropDir === "up" ? 8 : -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    dropdownBase,
                    "right-0 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-1.5 flex flex-col z-50"
                  )}
                >
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => {
                        setCurrentTheme(theme);
                        setActiveTab(null);
                        onThemeChange?.(theme);
                      }}
                      className={cn(
                        "flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer",
                        currentTheme.name === theme.name
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      )}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: theme.color }}
                      />
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicIsland;
