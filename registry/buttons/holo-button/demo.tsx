"use client";

import React from "react";
import { HoloButton } from "./holo-button";

export default function HoloButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8 w-full">
      <HoloButton variant="primary" size="md">
        Primary Holo
      </HoloButton>
      <HoloButton variant="cyber" size="md">
        Cyber Neon
      </HoloButton>
      <HoloButton variant="rosegold" size="md">
        Rose Gold
      </HoloButton>
      <HoloButton variant="glass" size="md">
        Frosted Glass
      </HoloButton>
    </div>
  );
}
