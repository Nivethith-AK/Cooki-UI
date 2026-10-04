export interface AgentStep {
  id: string
  name: string
  role: string
  status: 'pending' | 'running' | 'completed'
  latency: string
  detail: string
}

export interface SpecPreset {
  id: string
  title: string
  spec: string
  category: string
  codeSnippet: string
  language: string
  metrics: {
    compileTime: string
    invariantsProven: number
    astNodes: number
    safetyScore: string
  }
}
