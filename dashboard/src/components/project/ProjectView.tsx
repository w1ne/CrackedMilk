import { useProject } from '../../hooks/useProject'
import { ChecklistPanel } from './ChecklistPanel'
import { ChatPanel } from '../chat/ChatPanel'

interface Props {
  projectId: string
  onBack: () => void
}

export function ProjectView({ projectId, onBack }: Props) {
  const { project, tasks, loading } = useProject(projectId)

  if (loading || !project) {
    return <div className="flex items-center justify-center h-full text-[#555] text-sm">Loading…</div>
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e1e] flex-shrink-0">
        <button
          onClick={onBack}
          className="text-[#555] hover:text-white text-xs transition-colors flex items-center gap-1"
        >
          ← Back
        </button>
        <span className="text-[#333]">|</span>
        <span className="text-xs text-[#888] font-medium">{project.name}</span>
        <span className="ml-auto text-[10px] text-[#444]">
          Phase {project.current_phase}/8
        </span>
      </div>

      {/* Split pane */}
      <div className="flex-1 grid grid-cols-[280px_1fr] overflow-hidden">
        <ChecklistPanel project={project} tasks={tasks} />
        <ChatPanel project={project} tasks={tasks} />
      </div>
    </div>
  )
}
