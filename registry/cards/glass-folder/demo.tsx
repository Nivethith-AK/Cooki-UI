import React from 'react'
import { GlassFolder } from './glass-folder'

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <GlassFolder title="Registry Schemas" count={12} />
    </div>
  )
}
