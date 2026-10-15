import React from 'react';
import { MagneticTargetCursor } from './magnetic-target-cursor';

export default function MagneticTargetCursorDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <MagneticTargetCursor color="cyan" showCoordinates={true} />
    </div>
  );
}
