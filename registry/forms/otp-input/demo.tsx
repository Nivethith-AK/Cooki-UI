import React from 'react';
import { OTPInput } from './otp-input';

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Two-Factor Authentication</div>
      <OTPInput length={6} onComplete={(code) => alert('Code entered: ' + code)} />
      <span className="text-[11px] text-zinc-500 font-mono">Enter 6-digit verification security token</span>
    </div>
  );
}
