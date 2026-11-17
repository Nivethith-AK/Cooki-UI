import React, { useState } from "react";
import { VectorFlow, InteractionMode } from "./vector-flow";

export default function VectorFlowDemo() {
  const [particleCount, setParticleCount] = useState(700);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("vortex");

  const presets = {
    cyberNeon: {
      name: "Cyber",
      colors: ["#d946ef", "#00f0ff", "#a855f7"],
    },
    solarWind: {
      name: "Solar",
      colors: ["#f97316", "#f59e0b", "#ef4444"],
    },
    aeroStream: {
      name: "Aero",
      colors: ["#14b8a6", "#10b981", "#0ea5e9"],
    },
  };

  const [activePreset, setActivePreset] = useState<keyof typeof presets>("cyberNeon");

  const modes: { id: InteractionMode; label: string }[] = [
    { id: "vortex", label: "Vortex" },
    { id: "attract", label: "Attract" },
    { id: "repel", label: "Repel" },
  ];

  return (
    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-border/40 bg-zinc-950 flex flex-col justify-between p-4 select-none">
      <VectorFlow
        colorParticles={presets[activePreset].colors}
        particleCount={particleCount}
        interactionMode={interactionMode}
        particleSpeed={1.2}
        particleSize={1.2}
        interactive={true}
      />

      {/* Top Controls */}
      <div className="relative z-10 flex items-center justify-between w-full pointer-events-auto">
        <span className="text-xs font-mono font-medium text-white/70 tracking-wider">
          VECTOR FLOW FIELD
        </span>
        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-lg border border-white/10">
          {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePreset(key)}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                activePreset === key
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {presets[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Center Prompt */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <p className="text-xs text-white/50 max-w-xs">
          Move cursor or drag to swirl flow vector streams
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between w-full pointer-events-auto bg-black/50 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Force:</span>
          <div className="flex items-center gap-1">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setInteractionMode(m.id)}
                className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                  interactionMode === m.id
                    ? "bg-white/20 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Count: {particleCount}</span>
          <input
            type="range"
            min="300"
            max="1200"
            step="50"
            value={particleCount}
            onChange={(e) => setParticleCount(Number(e.target.value))}
            className="w-20 accent-primary cursor-pointer h-1 rounded bg-zinc-700 appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
