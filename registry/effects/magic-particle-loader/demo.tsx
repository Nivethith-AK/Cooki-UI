import React from 'react';
import { MagicParticleLoader } from '@/components/library/effects/MagicParticleLoader';

export default function MagicParticleLoaderDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <MagicParticleLoader size={180} particleCount={2} speed={1.2} />
    </div>
  );
}
