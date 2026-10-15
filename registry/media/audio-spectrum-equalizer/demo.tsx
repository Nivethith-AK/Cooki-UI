import React from 'react';
import { AudioSpectrumEqualizer } from './audio-spectrum-equalizer';

export default function AudioSpectrumEqualizerDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <AudioSpectrumEqualizer barCount={24} barColor="cyan" interactive={true} showDbMeter={true} />
    </div>
  );
}
