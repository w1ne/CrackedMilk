import { useState, useEffect } from 'react'
import { supabase, getProjects } from '../lib/supabase'
import type { Project } from '../types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))

    const channel = supabase
      .channel('projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        getProjects().then(setProjects).catch(console.error)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { projects, loading, error }
}
