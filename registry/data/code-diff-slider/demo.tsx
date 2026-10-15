import React from 'react';
import { CodeDiffSlider } from './code-diff-slider';

export default function CodeDiffSliderDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <CodeDiffSlider filename="src/telemetry/mesh-client.ts" />
    </div>
  );
}
