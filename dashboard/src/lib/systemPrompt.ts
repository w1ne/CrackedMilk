import type { Project, Task } from '../types'
import { PHASES } from '../constants/phases'
import { AGENT_PROMPT } from '../constants/agentPrompt'

export function buildSystemPrompt(project: Project, tasks: Task[]): string {
  const completedTasks = tasks.filter(t => t.completed)
  const incompleteTasks = tasks.filter(t => !t.completed)
  const currentPhaseTasks = tasks.filter(t => t.phase_number === project.current_phase)
  const currentPhaseComplete = currentPhaseTasks.filter(t => t.completed).length
  const currentPhaseName = PHASES.find(p => p.number === project.current_phase)?.name ?? `Phase ${project.current_phase}`

  const completedByPhase = PHASES.map(phase => {
    const phaseTasks = completedTasks.filter(t => t.phase_number === phase.number)
    if (phaseTasks.length === 0) return null
    return `Phase ${phase.number} — ${phase.name}:\n` +
      phaseTasks.map(t => `  ✅ ${t.text}`).join('\n')
  }).filter(Boolean).join('\n\n')

  const incompleteInCurrentPhase = incompleteTasks
    .filter(t => t.phase_number === project.current_phase)
    .map(t => `  ⬜ ${t.text}`)
    .join('\n')

  const briefEntries = Object.entries(project.strategy_brief)
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join('\n')

  const pipelineEntries = Object.entries(project.pipeline_config)
    .filter(([, v]) => v && (Array.isArray(v) ? v.length > 0 : true))
    .map(([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n')

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  return `${AGENT_PROMPT}

---

## CURRENT PROJECT STATE

**Project:** ${project.name}
**Project ID:** ${project.id}
**Current Phase:** ${project.current_phase} — ${currentPhaseName}
**Phase Progress:** ${currentPhaseComplete} of ${currentPhaseTasks.length} tasks completed in this phase
**Overall Progress:** ${completedTasks.length} of ${tasks.length} tasks completed

### Completed Tasks (across all phases)
${completedByPhase || '  (none yet)'}

### Incomplete Tasks in Current Phase
${incompleteInCurrentPhase || '  (all tasks in this phase are complete — advance to next phase)'}

### Strategy Brief (collected so far)
${briefEntries || '  (not yet filled in)'}

### Pipeline Config (collected so far)
${pipelineEntries || '  (not yet configured)'}

---

## DATABASE ACCESS (for updating project state)

Supabase REST API: ${supabaseUrl}/rest/v1
API Key: ${supabaseKey}

When the user answers a strategy question, update strategy_brief immediately:
  PATCH /projects?id=eq.${project.id}
  Body: { "strategy_brief": { ...existing, "field": "answer" } }

When a task is completed, mark it:
  PATCH /tasks?id=eq.<task-uuid>
  Body: { "completed": true }

When advancing to the next phase:
  PATCH /projects?id=eq.${project.id}
  Body: { "current_phase": ${project.current_phase + 1} }

---

Based on the project state above, guide the user through the next step. If they ask "what's next", identify the first incomplete task in the current phase and explain exactly how to execute it.`
}
