"use client";

import React from "react";
import { InteractiveCardGallery } from "./interactive-card-gallery";

export default function InteractiveCardGalleryDemo() {
  const sampleCards = [
    {
      title: "Atmospheric Optics",
      description: "Sub-millisecond raymarched atmospheric scattering and volumetric lighting shaders.",
      imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      badge: "SHADERS",
      buttonText: "Inspect Shader"
    },
    {
      title: "Neural Isolate",
      description: "Hermetic container runtime providing deterministic AST analysis and verification.",
      imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      badge: "RUNTIME",
      buttonText: "Open Isolate"
    },
    {
      title: "Vector Pipeline",
      description: "GPU-accelerated compute shaders orchestrating real-time flow field aerodynamics.",
      imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      badge: "COMPUTE",
      buttonText: "View Topology"
    }
  ];

  return (
    <div className="w-full flex items-center justify-center p-2">
      <InteractiveCardGallery
        cards={sampleCards}
        columns={3}
        cardHeight="h-72"
        className="max-w-4xl"
      />
    </div>
  );
}
