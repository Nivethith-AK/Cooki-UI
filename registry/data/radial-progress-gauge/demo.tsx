import React from 'react';
import { RadialProgressGauge } from './radial-progress-gauge';

export default function Demo() {
  return (
    <div className="p-4 flex items-center justify-center">
      <RadialProgressGauge value={82} label="CPU CLUSTER" />
    </div>
  );
}
