'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, X, Minimize2, Maximize2, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIAssistantChatProps {
  onApplyChanges?: (changes: any) => void
  currentSiteData?: any
}

export function AIAssistantChat({ onApplyChanges, currentSiteData }: AIAssistantChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your AI assistant. I can help you:\n\n• Edit your landing page content\n• Change colors and styling\n• Modify headlines and CTAs\n• Adjust game settings\n• And much more!\n\nJust tell me what you\'d like to change!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call AI API
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context: currentSiteData,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // If AI suggests changes, apply them
      if (data.changes && onApplyChanges) {
        onApplyChanges(data.changes)
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-full shadow-neon flex items-center justify-center hover:scale-110 transition-all duration-300 z-[9999] group animate-glow"
        style={{ zIndex: 9999 }}
        title="AI Assistant"
      >
        <Sparkles className="w-7 h-7 text-black group-hover:rotate-12 transition-transform" />
      </button>
    )
  }

  return (
    <div
      className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80 h-16' : 'bottom-6 right-6 w-96 h-[600px]'} bg-dark-surface border border-neon-primary/30 rounded-2xl shadow-neon-xl flex flex-col z-[9999] transition-all duration-300 font-inter`}
      style={{ zIndex: 9999 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neon-primary/20 bg-gradient-to-r from-neon-primary/10 to-neon-secondary/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Assistant</h3>
            <p className="text-xs text-text-muted">Powered by OpenAI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-neon-primary/20 rounded-lg transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-neon-primary" />
            ) : (
              <Minimize2 className="w-4 h-4 text-neon-primary" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-neon-primary to-neon-secondary text-black'
                      : 'bg-darker-surface border border-neon-primary/20 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-black/60' : 'text-text-muted'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-darker-surface border border-neon-primary/20 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-neon-primary animate-spin" />
                    <p className="text-sm text-text-muted">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neon-primary/20">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-darker-surface border border-neon-primary/20 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-neon-primary/50 resize-none"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 bg-gradient-to-r from-neon-primary to-neon-secondary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Press <kbd className="px-1.5 py-0.5 bg-darker-surface border border-neon-primary/20 rounded text-neon-primary">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-darker-surface border border-neon-primary/20 rounded text-neon-primary">Shift + Enter</kbd> for new line
            </p>
          </div>
        </>
      )}
    </div>
  )
}
