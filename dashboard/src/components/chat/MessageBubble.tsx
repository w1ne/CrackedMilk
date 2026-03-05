import type { ChatMessage } from '../../types'

interface Props {
  message: ChatMessage
  streaming?: boolean
}

export function MessageBubble({ message, streaming }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
        isUser
          ? 'bg-purple-600 text-white rounded-br-sm'
          : 'bg-[#1e1e1e] text-[#ccc] rounded-bl-sm border border-[#2a2a2a]'
      }`}>
        <div className="whitespace-pre-wrap">{message.content}</div>
        {streaming && (
          <span className="inline-block w-1.5 h-3.5 bg-current opacity-70 animate-pulse ml-0.5 align-middle" />
        )}
      </div>
    </div>
  )
}
