"use client";

import React, { useState } from "react";
import { AiPromptBar } from "./ai-prompt-bar";

export default function AiPromptBarDemo() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (text: string) => {
    if (text.trim()) {
      setMessages((prev) => [...prev, text]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[380px] p-6 rounded-2xl bg-zinc-950/40 border border-border/40">
      <div className="w-full flex flex-col items-center gap-2 text-center max-w-md my-auto">
        <h4 className="text-sm font-semibold text-foreground">AI Autonomous Shell</h4>
        <p className="text-xs text-muted-foreground">
          Type prompt, attach context or click the model selector to change execution kernels.
        </p>
        {messages.length > 0 && (
          <div className="w-full max-h-32 overflow-y-auto space-y-2 mt-4 p-3 rounded-xl bg-background/50 border border-border/30 text-left">
            {messages.map((m, i) => (
              <div key={i} className="text-xs text-foreground/90 font-mono truncate">
                <span className="text-primary font-bold mr-1.5">&gt;</span>
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-xl">
        <AiPromptBar
          placeholder="Ask AI anything or type '/' for commands..."
          onSend={handleSend}
          variant="rounded"
          className="w-full shadow-2xl"
        />
      </div>
    </div>
  );
}
