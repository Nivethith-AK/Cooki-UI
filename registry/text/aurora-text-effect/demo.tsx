"use client";

import React from "react";
import { AuroraTextEffect } from "./aurora-text-effect";

export default function AuroraTextEffectDemo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-6 bg-background rounded-2xl border border-border/40 overflow-hidden">
      <AuroraTextEffect
        text="AURORA"
        fontSize="clamp(2.5rem, 7vw, 5.5rem)"
        className="w-full bg-transparent"
        textClassName="font-black tracking-widest uppercase select-none"
      />
    </div>
  );
}
