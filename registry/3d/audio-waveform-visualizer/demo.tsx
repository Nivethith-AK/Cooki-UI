import React from 'react';
import { AudioWaveformVisualizer } from './audio-waveform-visualizer';

export default function Demo() {
  return (
    <div className="p-4 w-full flex items-center justify-center">
      <AudioWaveformVisualizer />
    </div>
  );
}
