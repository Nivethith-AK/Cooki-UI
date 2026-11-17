import React from 'react';
import { InvoicePrinter } from '@/components/library/cards/InvoicePrinter';

export default function InvoicePrinterDemo() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center p-4">
      <InvoicePrinter />
    </div>
  );
}
