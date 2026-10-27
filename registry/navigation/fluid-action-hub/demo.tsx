import React from 'react';
import { FluidActionHub } from '@/components/library/navigation/FluidActionHub';

export default function FluidActionHubDemo() {
  return (
    <div className="flex items-center justify-center p-8 w-full min-h-[360px]">
      <FluidActionHub position="inline" />
    </div>
  );
}
