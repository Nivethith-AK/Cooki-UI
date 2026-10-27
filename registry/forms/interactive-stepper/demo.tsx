import React from 'react';
import { InteractiveStepper } from '@/components/library/forms/InteractiveStepper';

export default function InteractiveStepperDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <InteractiveStepper defaultValue={3} min={1} max={12} size="md" />
      <span className="text-xs text-zinc-500 font-mono">Select deployment nodes</span>
    </div>
  );
}
