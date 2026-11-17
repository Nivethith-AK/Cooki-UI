"use client";

import React from "react";
import { GlowingCards, GlowingCard } from "./glowing-cards";
import { Zap, Shield, Cpu } from "lucide-react";

export default function GlowingCardsDemo() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <GlowingCards
        enableGlow={true}
        glowRadius={28}
        glowOpacity={0.8}
        gap="1.5rem"
        className="w-full max-w-4xl"
      >
        <GlowingCard glowColor="#3b82f6" className="flex flex-col gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Zero-Copy Pipelines</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Direct linear memory transfers without serialization overhead.
            </p>
          </div>
        </GlowingCard>

        <GlowingCard glowColor="#8b5cf6" className="flex flex-col gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">WASM JIT Runtime</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Deterministic bytecode execution inside isolated micro-sandboxes.
            </p>
          </div>
        </GlowingCard>

        <GlowingCard glowColor="#10b981" className="flex flex-col gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Formal Proofs</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Automated invariant verification and mathematical safety guarantees.
            </p>
          </div>
        </GlowingCard>
      </GlowingCards>
    </div>
  );
}
