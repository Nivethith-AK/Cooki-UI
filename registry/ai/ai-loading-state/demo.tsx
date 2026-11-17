import React from 'react';
import { AiLoadingState } from '@/components/library/ai/AiLoadingState';

export default function AiLoadingStateDemo() {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4 p-8">
      <AiLoadingState label="Synthesizing plan..." variant="PulseBeam" />
      <AiLoadingState label="Generating tokens..." variant="QuantumWave" theme="glass" />
      <AiLoadingState label="Executing sandbox..." variant="CyberCore" theme="dark" />
    </div>
  );
}
