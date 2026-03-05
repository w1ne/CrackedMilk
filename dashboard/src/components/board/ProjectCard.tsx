import type { Project } from '../../types'

interface Props {
  project: Project
  taskCount: number
  completedCount: number
  onClick: () => void
  onDragStart: (e: React.DragEvent) => void
}

export function ProjectCard({ project, taskCount, completedCount, onClick, onDragStart }: Props) {
  const pct = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 cursor-pointer hover:border-[#444] hover:bg-[#1e1e1e] transition-all group"
    >
      <div className="text-sm font-medium text-white truncate mb-2">{project.name}</div>

      {/* Progress bar */}
      <div className="h-1 bg-[#2a2a2a] rounded-full mb-2">
        <div
          className="h-1 bg-purple-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#666]">
        <span>{completedCount}/{taskCount} tasks</span>
        <span className="text-[#444] text-[10px]">
          {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {project.strategy_brief?.painkiller_verdict && (
        <div className="mt-2">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            project.strategy_brief.painkiller_verdict === 'painkiller'
              ? 'bg-green-900/40 text-green-400'
              : 'bg-yellow-900/40 text-yellow-400'
          }`}>
            {project.strategy_brief.painkiller_verdict}
          </span>
        </div>
      )}
    </div>
  )
}
