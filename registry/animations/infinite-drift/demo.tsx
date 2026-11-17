import React from "react";
import { InfiniteDrift } from "./infinite-drift";

export default function InfiniteDriftDemo() {
  const bands = [
    {
      offsetY: -160,
      speed: 1.1,
      rotation: 6,
      rotationType: "fromLeft" as const,
      curveAmount: 32.0,
      curveDirection: 1 as const,
      images: [
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1550684399-3f0f745771d1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80",
      ],
    },
    {
      offsetY: -60,
      speed: 1.4,
      rotation: 6,
      rotationType: "fromCenter" as const,
      curveAmount: 30.0,
      curveDirection: 1 as const,
      images: [
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1557683325-3ba8f0df79de?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      offsetY: 40,
      speed: 0.85,
      rotation: 6,
      curveAmount: 32.0,
      curveDirection: 1 as const,
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1561070791-36c11767b26a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1561070791-0626bcd0516e?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      offsetY: 140,
      speed: 1.2,
      rotation: 6,
      curveAmount: 30.0,
      curveDirection: 1 as const,
      images: [
        "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1511447333849-2b89ae13b002?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1543966888-7c1dc482a810?auto=format&fit=crop&w=400&q=80",
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <InfiniteDrift
        bands={bands}
        height={380}
        imageHeight={80}
        bandHeight={95}
        className="w-full rounded-xl"
      />
    </div>
  );
}
