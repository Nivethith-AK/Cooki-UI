import React from 'react';
import { VideoTextMask } from '@/components/library/text/VideoTextMask';

export default function VideoTextMaskDemo() {
  return (
    <div className="w-full max-w-md p-4">
      <VideoTextMask fontSize="18vw" fontWeight="900">
        COOKI
      </VideoTextMask>
    </div>
  );
}
