"use client"

import React from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "SolidStart",
  "Qwik City",
  "Angular",
] as const

export const ComboboxBasic: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-sm mx-auto">
      <div className="w-full mb-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>FRAMEWORK COMBOBOX</span>
        <span className="text-[10px] text-indigo-500 dark:text-indigo-400">COMPOUND API</span>
      </div>
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export default ComboboxBasic
