import React from 'react';
import { HangingIdCard } from '@/components/library/3d/HangingIdCard';

export default function HangingIdCardDemo() {
  return (
    <div className="w-full flex items-center justify-center p-2">
      <HangingIdCard name="Alex Vanguard" role="Staff Runtime Architect" ribbonColor="indigo" interactive />
    </div>
  );
}
