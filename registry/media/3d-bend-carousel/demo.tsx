import React from 'react';
import ThreeDBendCarousel from './3d-bend-carousel';

export default function ThreeDBendCarouselDemo() {
  const items = [
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      title: "Alpine Summit",
      badge: "Alps",
      description: "High altitude exploration through monolithic glacial passes."
    },
    {
      image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80",
      title: "Deep Evergreen",
      badge: "Forest",
      description: "Dense conifer canopy preserving ancient mist systems."
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      title: "Pacific Coast",
      badge: "Ocean",
      description: "Dramatic coastal cliff lines meeting azure tides."
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
      title: "Silent Valley",
      badge: "Mist",
      description: "Low-hanging cloud shelves across winding river valleys."
    },
    {
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80",
      title: "Golden Meadow",
      badge: "Plains",
      description: "Sunset thermals illuminating rolling grass steppes."
    }
  ];

  return (
    <div className="w-full flex items-center justify-center p-2">
      <ThreeDBendCarousel
        items={items}
        height={380}
        itemWidth={260}
        aspectRatio={0.7}
        bendAngle={25}
        orientation="horizontal"
        className="w-full rounded-2xl"
      />
    </div>
  );
}
