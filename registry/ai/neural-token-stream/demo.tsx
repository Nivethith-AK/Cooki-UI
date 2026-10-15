import React from 'react';
import { NeuralTokenStream } from './neural-token-stream';

export default function NeuralTokenStreamDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <NeuralTokenStream modelName="Nexus-70B-MoE" streamingSpeedMs={60} showProbabilities={true} />
    </div>
  );
}
