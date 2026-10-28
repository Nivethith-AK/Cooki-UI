import React, { useState } from 'react';
import { CircularGaugeSpeedometer } from '@/components/library/data/CircularGaugeSpeedometer';

export default function CircularGaugeSpeedometerDemo() {
  const [val, setVal] = useState(78);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <CircularGaugeSpeedometer
        value={val}
        max={100}
        unit="%"
        label="Cluster Throughput"
        sublabel="Node Cluster US-East-1"
        interactive
      />
    </div>
  );
}
