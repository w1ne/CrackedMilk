import { useState, useEffect } from 'react'
import { PHASES, SEED_TASKS } from '../../constants/phases'
import { useProjects } from '../../hooks/useProjects'
import { getTasks, createProject, seedTasks, updateProjectPhase } from '../../lib/supabase'
import { PhaseColumn } from './PhaseColumn'
import type { Task } from '../../types'

interface Props {
  onProjectClick: (id: string) => void
}

export function BoardView({ onProjectClick }: Props) {
  const { projects, loading } = useProjects()
  const [allTasks, setAllTasks] = useState<Map<string, Task[]>>(new Map())
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Load tasks for all projects
  useEffect(() => {
    async function load() {
      const entries = await Promise.all(
        projects.map(async p => [p.id, await getTasks(p.id)] as [string, Task[]])
      )
      setAllTasks(new Map(entries))
    }
    if (projects.length > 0) load()
  }, [projects])

  async function handleCreate() {
    if (!newName.trim() || creating) return
    setCreating(true)
    try {
      const project = await createProject(newName.trim())
      await seedTasks(project.id, SEED_TASKS)
      setNewName('')
      setShowModal(false)
      onProjectClick(project.id)
    } finally {
      setCreating(false)
    }
  }

  async function handleDrop(projectId: string, newPhase: number) {
    await updateProjectPhase(projectId, newPhase)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full text-[#555]">Loading...</div>
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
        <div>
          <h1 className="text-white font-semibold text-base">Projects</h1>
          <p className="text-[#555] text-xs mt-0.5">{projects.length} projects across 8 phases</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
        >
          <span>+</span> New Project
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto px-6 py-4">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {PHASES.map(phase => (
            <PhaseColumn
              key={phase.number}
              phase={phase}
              projects={projects.filter(p => p.current_phase === phase.number)}
              allTasks={allTasks}
              onProjectClick={onProjectClick}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 w-80" onClick={e => e.stopPropagation()}>
            <h2 className="text-white font-semibold mb-1">New Project</h2>
            <p className="text-[#555] text-xs mb-4">Creates the project and seeds all 8 phases with tasks.</p>
            <input
              autoFocus
              type="text"
              placeholder="Project name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#444] mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 text-xs text-[#666] hover:text-white border border-[#2a2a2a] rounded-md py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim() || creating}
                className="flex-1 text-xs bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-md py-2 transition-colors"
              >
                {creating ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
