import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, Loader, AlertCircle } from 'lucide-react'

const BACKEND_URL = 'https://portfolio-backend-8svt.onrender.com'

const GREETING = "Hi! I'm an AI assistant for Yaqub's portfolio. Ask me anything about his skills, projects, education, or background."

const SUGGESTIONS = [
  'What projects has he built?',
  'What is his tech stack?',
  'How do I contact him?',
]

export default function ChatBot() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: GREETING },
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'error',
          text: 'Could not reach the assistant. Make sure the backend is running on port 8000.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[360px] max-h-[540px] flex flex-col glass rounded-2xl overflow-hidden glow">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-brand-500/10">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-brand-400" />
              <span className="font-semibold text-sm text-white">Ask About Yaqub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => {
              if (m.role === 'error') {
                return (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                      <AlertCircle size={13} />
                    </div>
                    <div className="max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed bg-red-500/10 text-red-400 rounded-tl-none">
                      {m.text}
                    </div>
                  </div>
                )
              }

              return (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === 'assistant'
                      ? 'bg-brand-500/20 text-brand-400'
                      : 'bg-zinc-700 text-zinc-300'
                  }`}>
                    {m.role === 'assistant' ? <Bot size={13} /> : <User size={13} />}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.role === 'assistant'
                      ? 'bg-white/5 text-zinc-200 rounded-tl-none'
                      : 'bg-brand-500/80 text-white rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              )
            })}

            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <Bot size={13} />
                </div>
                <div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 flex items-center gap-1.5">
                  <Loader size={13} className="text-brand-400 animate-spin" />
                  <span className="text-xs text-zinc-500">Thinking...</span>
                </div>
              </div>
            )}

            {/* Suggestion chips — shown only on opening message */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-left text-xs px-3 py-2 rounded-lg bg-white/5 text-zinc-400 hover:bg-brand-500/20 hover:text-brand-300 transition-colors border border-white/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about skills, projects, education..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-500/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 shadow-lg glow flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
        aria-label="Open AI chat"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </>
  )
}
