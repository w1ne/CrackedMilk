import { createClient } from '@supabase/supabase-js'
import type { Project, Task, ChatMessage } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getProject(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createProject(name: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert({ name })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProjectPhase(id: string, phase: number): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .update({ current_phase: phase })
    .eq('id', id)
  if (error) throw error
}

export async function updateStrategyBrief(
  id: string,
  updates: Partial<Project['strategy_brief']>
): Promise<void> {
  // Fetch existing brief first to merge, not overwrite
  const project = await getProject(id)
  const { error } = await supabase
    .from('projects')
    .update({ strategy_brief: { ...project.strategy_brief, ...updates } })
    .eq('id', id)
  if (error) throw error
}

export async function updatePipelineConfig(
  id: string,
  updates: Partial<Project['pipeline_config']>
): Promise<void> {
  const project = await getProject(id)
  const { error } = await supabase
    .from('projects')
    .update({ pipeline_config: { ...project.pipeline_config, ...updates } })
    .eq('id', id)
  if (error) throw error
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

// ── Tasks ─────────────────────────────────────────────────────────────────────

export async function getTasks(projectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('phase_number', { ascending: true })
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function seedTasks(projectId: string, seeds: Omit<Task, 'id' | 'project_id'>[]): Promise<void> {
  const rows = seeds.map(s => ({ ...s, project_id: projectId }))
  const { error } = await supabase.from('tasks').insert(rows)
  if (error) throw error
}

export async function toggleTask(id: string, completed: boolean): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', id)
  if (error) throw error
}

// ── Chat messages ─────────────────────────────────────────────────────────────

export async function getMessages(projectId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function saveMessage(
  projectId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ project_id: projectId, role, content })
    .select()
    .single()
  if (error) throw error
  return data
}
