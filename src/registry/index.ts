import { RegistryItem } from '../types/component'
import { COMPONENT_REGISTRY } from './components'
import { GENERATED_COMPONENTS } from './generatedComponents'
import { GENERATED_BACKGROUNDS } from './generatedBackgrounds'

// Combined catalogue with 520+ components and 500+ backgrounds (1020 total items)
export const ALL_REGISTRY_ITEMS: RegistryItem[] = [
  ...COMPONENT_REGISTRY,
  ...GENERATED_COMPONENTS,
  ...GENERATED_BACKGROUNDS,
]

export { COMPONENT_REGISTRY } from './components'
export { GENERATED_COMPONENTS } from './generatedComponents'
export { GENERATED_BACKGROUNDS } from './generatedBackgrounds'
