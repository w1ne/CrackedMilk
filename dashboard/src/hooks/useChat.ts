import { useState, useEffect, useRef } from 'react'
import { supabase, getMessages, saveMessage } from '../lib/supabase'
import { streamClaude } from '../lib/claude'
import { buildSystemPrompt } from '../lib/systemPrompt'
import type { Project, Task, ChatMessage } from '../types'

export function useChat(project: Project, tasks: Task[]) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef(false)

  useEffect(() => {
    getMessages(project.id).then(setMessages).catch(console.error)

    const channel = supabase
      .channel(`chat-${project.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `project_id=eq.${project.id}` }, payload => {
        setMessages(prev => {
          const exists = prev.find(m => m.id === (payload.new as ChatMessage).id)
          if (exists) return prev
          return [...prev, payload.new as ChatMessage]
        })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [project.id])

  async function sendMessage(content: string) {
    if (streaming) return
    setError(null)

    // Save user message
    const userMsg = await saveMessage(project.id, 'user', content)
    setMessages(prev => [...prev, userMsg])

    // Build Claude messages array from history
    const history = [...messages, userMsg].map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    setStreaming(true)
    setStreamingText('')
    abortRef.current = false

    let fullText = ''

    streamClaude(
      buildSystemPrompt(project, tasks),
      history,
      (chunk) => {
        if (abortRef.current) return
        fullText += chunk
        setStreamingText(fullText)
      },
      async () => {
        setStreaming(false)
        setStreamingText('')
        if (fullText && !abortRef.current) {
          await saveMessage(project.id, 'assistant', fullText)
        }
      },
      (err) => {
        setStreaming(false)
        setStreamingText('')
        setError(err.message)
      }
    )
  }

  function abort() {
    abortRef.current = true
    setStreaming(false)
    setStreamingText('')
  }

  return { messages, streaming, streamingText, error, sendMessage, abort }
}
