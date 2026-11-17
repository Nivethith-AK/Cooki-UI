import React from "react";
import { AnimatedBubbleParticles } from "./animated-bubble-particles";

export default function AnimatedBubbleParticlesDemo() {
  return (
    <div className="relative w-full h-[360px] rounded-2xl overflow-hidden flex items-center justify-center border border-border/40 bg-zinc-950">
      <AnimatedBubbleParticles
        className="absolute inset-0"
        colorHueStart={210}
        colorHueEnd={270}
        saturation={85}
        lightness={60}
        maxBubbles={36}
        spawnInterval={240}
        minRadius={8}
        maxRadius={42}
        speed={0.8}
        mouseRepelRadius={140}
        mouseInteraction={true}
        enableGlow={true}
        enablePop={true}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 p-6 rounded-xl bg-background/60 backdrop-blur-md border border-border/30 text-center max-w-sm pointer-events-auto">
        <h4 className="text-sm font-semibold text-foreground">Interactive Bubbles</h4>
        <p className="text-xs text-muted-foreground">
          Hover to repel or click any floating bubble to pop it with particle burst physics.
        </p>
      </div>
    </div>
  );
}
