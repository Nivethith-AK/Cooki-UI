"use client";

import React, { useState } from "react";
import { MorphingNavigation } from "./morphing-navigation";
import { Home, Layers, Cpu, Shield, Activity } from "lucide-react";

export default function MorphingNavigationDemo() {
  const [activeTab, setActiveTab] = useState("home");

  const links = [
    { id: "home", label: "Dashboard", href: "#", icon: <Home className="w-4 h-4" /> },
    { id: "layers", label: "Architecture", href: "#", icon: <Layers className="w-4 h-4" /> },
    { id: "cpu", label: "Compilers", href: "#", icon: <Cpu className="w-4 h-4" /> },
    { id: "shield", label: "Security", href: "#", icon: <Shield className="w-4 h-4" /> },
    { id: "telemetry", label: "Telemetry", href: "#", icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="relative w-full min-h-[360px] rounded-2xl overflow-hidden border border-border/40 bg-zinc-950/60 flex flex-col items-center justify-center p-6">
      <MorphingNavigation
        links={links}
        theme="glass"
        disableAutoMorph={false}
        scrollThreshold={40}
        onLinkClick={(link) => setActiveTab(link.id)}
        className="w-full max-w-lg"
      />
      <div className="mt-20 text-center">
        <span className="text-xs font-mono text-zinc-400">
          Active Section: <span className="text-primary font-semibold uppercase">{activeTab}</span>
        </span>
        <p className="text-[11px] text-zinc-500 mt-1">
          Scroll inside viewport or resize to observe dynamic morph transitions.
        </p>
      </div>
    </div>
  );
}
