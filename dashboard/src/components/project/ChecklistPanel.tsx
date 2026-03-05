import { PHASES } from '../../constants/phases'
import { TaskItem } from './TaskItem'
import type { Project, Task } from '../../types'

interface Props {
  project: Project
  tasks: Task[]
}

export function ChecklistPanel({ project, tasks }: Props) {
  const totalDone = tasks.filter(t => t.completed).length
  const totalPct = tasks.length > 0 ? Math.round((totalDone / tasks.length) * 100) : 0

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Project header */}
      <div className="px-5 py-4 border-b border-[#1e1e1e] flex-shrink-0">
        <h2 className="text-white font-semibold text-sm truncate">{project.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1 bg-[#2a2a2a] rounded-full">
            <div className="h-1 bg-purple-500 rounded-full transition-all" style={{ width: `${totalPct}%` }} />
          </div>
          <span className="text-[11px] text-[#555] flex-shrink-0">{totalDone}/{tasks.length}</span>
        </div>

        {/* Strategy brief preview */}
        {project.strategy_brief?.audience && (
          <p className="text-[11px] text-[#555] mt-2 truncate">
            Audience: {project.strategy_brief.audience}
          </p>
        )}
      </div>

      {/* Phase sections */}
      <div className="flex-1 overflow-y-auto py-2">
        {PHASES.map(phase => {
          const phaseTasks = tasks.filter(t => t.phase_number === phase.number)
          const done = phaseTasks.filter(t => t.completed).length
          const isActive = project.current_phase === phase.number
          const isComplete = done === phaseTasks.length && phaseTasks.length > 0

          return (
            <div key={phase.number} className="mb-1">
              <div className={`flex items-center gap-2 px-4 py-2 ${isActive ? 'sticky top-0 bg-[#141414] z-10' : ''}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${
                  isComplete ? 'bg-green-600 text-white' :
                  isActive ? 'bg-purple-600 text-white' :
                  'bg-[#2a2a2a] text-[#555]'
                }`}>
                  {isComplete ? '✓' : phase.number}
                </span>
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${
                  isActive ? 'text-purple-400' : isComplete ? 'text-[#666]' : 'text-[#444]'
                }`}>
                  {phase.name}
                </span>
                <span className="text-[10px] text-[#444] ml-auto">{done}/{phaseTasks.length}</span>
              </div>

              {(isActive || !isComplete) && phaseTasks.length > 0 && (
                <div className="px-2 pb-1">
                  {phaseTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
