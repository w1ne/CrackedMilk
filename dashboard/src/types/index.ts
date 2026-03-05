export interface Project {
  id: string
  name: string
  created_at: string
  current_phase: number // 1–8
  strategy_brief: StrategyBrief
  pipeline_config: PipelineConfig
}

export interface StrategyBrief {
  painkiller_verdict?: string     // 'painkiller' | 'vitamin' | 'repositioned'
  painkiller_reasoning?: string
  product_summary?: string
  problem?: string
  audience?: string
  status_quo?: string
  status_quo_good_bad?: string
  why_better?: string
  pricing?: string
  first_customers?: string
}

export interface PipelineConfig {
  platforms?: string[]           // ['tiktok', 'reels', 'shorts']
  aesthetic?: string
  voice_profile?: string
  cta_template?: string
  hook_formula?: string
  content_angles?: string[]
  brand_safety?: string
  image_tool?: string
  motion_tool?: string
  voice_tool?: string
  assembly_tool?: string
  automation_tool?: string
  weekly_volume_target?: number
}

export interface Task {
  id: string
  project_id: string
  phase_number: number
  text: string
  completed: boolean
  sort_order: number
}

export interface ChatMessage {
  id: string
  project_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface Phase {
  number: number
  name: string
  description: string
}
