import React from 'react'
import { AnimatedCopyButton } from './animated-copy-button'

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <AnimatedCopyButton textToCopy="npx cooki-ui add magnetic-button" size="md" />
    </div>
  )
}
