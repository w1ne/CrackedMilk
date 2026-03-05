import { useState, useEffect } from 'react'
import { supabase, getProject, getTasks } from '../lib/supabase'
import type { Project, Task } from '../types'

export function useProject(projectId: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = () => Promise.all([
    getProject(projectId).then(setProject),
    getTasks(projectId).then(setTasks),
  ]).catch(e => setError(e.message))

  useEffect(() => {
    setLoading(true)
    refresh().finally(() => setLoading(false))

    const channel = supabase
      .channel(`project-${projectId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects', filter: `id=eq.${projectId}` }, () => {
        getProject(projectId).then(setProject).catch(console.error)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `project_id=eq.${projectId}` }, () => {
        getTasks(projectId).then(setTasks).catch(console.error)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [projectId])

  return { project, tasks, loading, error, refresh }
}
