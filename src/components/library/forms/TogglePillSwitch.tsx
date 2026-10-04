import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const TogglePillSwitch: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center gap-3 font-mono text-xs select-none">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
          enabled ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-800'
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-indigo-600' : 'bg-zinc-400'}`} />
        </motion.div>
      </button>

      <span className={`font-semibold ${enabled ? 'text-indigo-500' : 'text-zinc-500'}`}>
        {enabled ? 'SYSTEM ARMED' : 'STANDBY'}
      </span>
    </div>
  );
};
