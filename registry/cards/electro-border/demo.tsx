import React from 'react'
import { ElectroBorder } from './electro-border'

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ElectroBorder borderColor="#6366f1" borderWidth={2} distortion={0.5} />
    </div>
  )
}
