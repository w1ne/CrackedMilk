import { toggleTask } from '../../lib/supabase'
import type { Task } from '../../types'

interface Props {
  task: Task
}

export function TaskItem({ task }: Props) {
  async function handleToggle() {
    await toggleTask(task.id, !task.completed)
  }

  return (
    <label className="flex items-start gap-2.5 group cursor-pointer py-1 px-2 rounded hover:bg-[#1a1a1a] transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="mt-0.5 w-3.5 h-3.5 rounded border-[#333] bg-[#141414] checked:bg-purple-500 checked:border-purple-500 cursor-pointer flex-shrink-0 accent-purple-500"
      />
      <span className={`text-xs leading-relaxed ${task.completed ? 'line-through text-[#444]' : 'text-[#aaa] group-hover:text-[#ccc]'} transition-colors`}>
        {task.text}
      </span>
    </label>
  )
}
