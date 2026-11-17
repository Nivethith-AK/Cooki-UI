"use client";

import React from "react";
import { TextParticleAnimation } from "./text-particle-animation";

export default function TextParticleAnimationDemo() {
  return (
    <div className="w-full min-h-[320px] rounded-2xl overflow-hidden border border-border/40 bg-zinc-950 flex flex-col items-center justify-center p-4 select-none">
      <TextParticleAnimation
        text="COOKI UI"
        fontSize={68}
        fontFamily="monospace"
        fontWeight={900}
        resolution={3}
        pixelSize={2.5}
        hoverRadius={70}
        repelForce={18}
        padding={40}
        height={220}
      />
      <span className="text-xs text-zinc-500 font-mono mt-2">
        Hover or click to scatter interactive particle typography
      </span>
    </div>
  );
}
