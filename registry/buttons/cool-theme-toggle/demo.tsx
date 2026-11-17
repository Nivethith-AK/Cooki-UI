import React from "react";
import { CoolThemeToggle } from "./cool-theme-toggle";

export default function CoolThemeToggleDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10 w-full">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Large</span>
        <CoolThemeToggle size="lg" />
      </div>
      
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Medium</span>
          <CoolThemeToggle size="md" />
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Small</span>
          <CoolThemeToggle size="sm" />
        </div>
      </div>
    </div>
  );
}
