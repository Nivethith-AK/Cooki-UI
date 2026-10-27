import React from 'react';
import { HamburgerMenuOverlay } from '@/components/library/navigation/HamburgerMenuOverlay';

export default function HamburgerMenuOverlayDemo() {
  return (
    <div className="w-full max-w-sm h-72">
      <HamburgerMenuOverlay buttonTop="28px" buttonLeft="28px" />
    </div>
  );
}
