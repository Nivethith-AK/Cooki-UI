import React from 'react'
import { InteractiveLens } from './interactive-lens'

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <InteractiveLens zoomFactor={1.6} lensSize={160} />
    </div>
  )
}
