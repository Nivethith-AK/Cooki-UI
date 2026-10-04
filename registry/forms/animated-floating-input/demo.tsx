import React, { useState } from 'react';
import { AnimatedFloatingInput } from './animated-floating-input';

export default function Demo() {
  const [val, setVal] = useState('architect@cooki.dev');
  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto">
      <AnimatedFloatingInput
        label="Engineering Handle"
        value={val}
        onChange={setVal}
        placeholder="user@domain.com"
        success={val.includes('@')}
      />
    </div>
  );
}
