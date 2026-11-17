import React from 'react';
import { ThreeDImagePageflip } from '@/components/library/media/ThreeDImagePageflip';

export default function ThreeDImagePageflipDemo() {
  return (
    <div className="w-full h-full min-h-[440px] flex items-center justify-center p-4">
      <ThreeDImagePageflip pageWidth={180} pageHeight={260} />
    </div>
  );
}
