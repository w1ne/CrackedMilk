import { useEffect, useRef, useState } from 'react'
import { useChat } from '../../hooks/useChat'
import { MessageBubble } from './MessageBubble'
import type { Project, Task } from '../../types'

interface Props {
  project: Project
  tasks: Task[]
}

const QUICK_ACTIONS = [
  'What\'s next?',
  'Run the Painkiller audit',
  'Start the 7 strategy questions',
  'Review my landing page checklist',
  'Help me plan first customers',
]

export function ChatPanel({ project, tasks }: Props) {
  const { messages, streaming, streamingText, error, sendMessage, abort } = useChat(project, tasks)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  function handleSend() {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    sendMessage(text)
  }

  return (
    <div className="flex flex-col h-full border-l border-[#1e1e1e]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1e1e1e] flex-shrink-0 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-white">Onboarding Agent</span>
          <span className="ml-2 text-[10px] text-[#555]">claude-sonnet-4-6</span>
        </div>
        {streaming && (
          <button onClick={abort} className="text-[10px] text-[#666] hover:text-red-400 transition-colors">
            Stop
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.length === 0 && !streaming && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="text-[#444] text-xs max-w-[220px]">
              Ask "What's next?" to get guided through the onboarding process, or start a new interview.
            </div>
            <div className="flex flex-col gap-1.5 w-full max-w-[200px]">
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action}
                  onClick={() => sendMessage(action)}
                  className="text-left text-[11px] text-[#666] hover:text-purple-400 border border-[#222] hover:border-purple-800 rounded-md px-3 py-1.5 transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {streaming && streamingText && (
          <MessageBubble
            message={{ id: '_streaming', project_id: project.id, role: 'assistant', content: streamingText, created_at: new Date().toISOString() }}
            streaming
          />
        )}

        {streaming && !streamingText && (
          <div className="flex justify-start mb-3">
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#555] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-[11px] text-red-400 bg-red-900/20 border border-red-900/30 rounded-md px-3 py-2 mb-3">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[#1e1e1e] flex-shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSend()
            }}
            placeholder="Ask anything… (⌘ Enter to send)"
            rows={2}
            className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#3a3a3a] rounded-md px-3 py-2 text-xs text-white placeholder-[#444] resize-none focus:outline-none transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || streaming}
            className="flex-shrink-0 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white rounded-md px-3 py-2 text-xs font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
