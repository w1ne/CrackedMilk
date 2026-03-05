import { useState } from 'react'
import { BoardView } from './components/board/BoardView'
import { ProjectView } from './components/project/ProjectView'

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0d]">
      {/* Global nav */}
      <nav className="flex items-center px-6 py-3 border-b border-[#1a1a1a] flex-shrink-0">
        <button
          onClick={() => setSelectedProjectId(null)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-white font-bold text-sm tracking-tight">CrackedMilk</span>
          <span className="text-[#333] text-xs">/ dashboard</span>
        </button>
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedProjectId ? (
          <ProjectView
            projectId={selectedProjectId}
            onBack={() => setSelectedProjectId(null)}
          />
        ) : (
          <BoardView onProjectClick={setSelectedProjectId} />
        )}
      </div>
    </div>
  )
}
