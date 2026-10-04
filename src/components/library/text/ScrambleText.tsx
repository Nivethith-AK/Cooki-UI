import React, { useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText: React.FC<{ text?: string }> = ({
  text = 'DETERMINISTIC CODE EMISSION',
}) => {
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <div
      onMouseEnter={scramble}
      className="flex flex-col items-center justify-center p-6 font-mono text-center cursor-pointer select-none"
    >
      <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">HOVER TO DECRYPT</span>
      <h3 className="text-sm sm:text-base font-bold text-emerald-400 tracking-wider">
        {displayText}
      </h3>
    </div>
  );
};
