import { RegistryItem } from '../types/component'
import { COMPONENT_REGISTRY } from './components'

// Canonical registry containing only genuine, verified components
export const ALL_REGISTRY_ITEMS: RegistryItem[] = [
  ...COMPONENT_REGISTRY,
]

export { COMPONENT_REGISTRY } from './components'
