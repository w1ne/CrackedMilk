import type { Project, Task } from '../../types'
import type { Phase } from '../../types'
import { ProjectCard } from './ProjectCard'

interface Props {
  phase: Phase
  projects: Project[]
  allTasks: Map<string, Task[]>
  onProjectClick: (id: string) => void
  onDrop: (projectId: string, newPhase: number) => void
}

export function PhaseColumn({ phase, projects, allTasks, onProjectClick, onDrop }: Props) {
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.currentTarget.classList.add('bg-[#1a1a1a]')
  }

  function handleDragLeave(e: React.DragEvent) {
    e.currentTarget.classList.remove('bg-[#1a1a1a]')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.currentTarget.classList.remove('bg-[#1a1a1a]')
    const projectId = e.dataTransfer.getData('projectId')
    if (projectId) onDrop(projectId, phase.number)
  }

  return (
    <div
      className="flex-shrink-0 w-56 flex flex-col rounded-lg transition-colors"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider">
          {phase.name}
        </span>
        {projects.length > 0 && (
          <span className="text-[10px] text-[#555] bg-[#1a1a1a] px-1.5 py-0.5 rounded-full">
            {projects.length}
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 min-h-[80px]">
        {projects.map(project => {
          const tasks = allTasks.get(project.id) ?? []
          return (
            <ProjectCard
              key={project.id}
              project={project}
              taskCount={tasks.length}
              completedCount={tasks.filter(t => t.completed).length}
              onClick={() => onProjectClick(project.id)}
              onDragStart={e => e.dataTransfer.setData('projectId', project.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
