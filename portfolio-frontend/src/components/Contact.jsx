import { Mail, Github, Linkedin, Send } from 'lucide-react'
import { SectionLabel } from './Skills.jsx'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire to backend email handler
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Contact" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Let's <span className="gradient-text">Work Together</span>
        </h2>
        <p className="text-zinc-400 mb-14 max-w-xl">
          I'm actively looking for full-time software engineering roles starting in 2026.
          Feel free to reach out about job opportunities or project collaborations.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-500/60 transition-colors"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-500/60 transition-colors"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about the role or opportunity..."
              rows={5}
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-500/60 transition-colors resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all glow-sm"
            >
              {sent ? 'Message Sent ✓' : (<><Send size={15} /> Send Message</>)}
            </button>
          </form>

          {/* Contact links */}
          <div className="flex flex-col gap-6 justify-center">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'yaqubhasann@gmail.com',
                href: 'mailto:yaqubhasann@gmail.com',
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'github.com/yaqubhasan',
                href: 'https://github.com/yaqubhasan',
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'linkedin.com/in/yaqub-hasan',
                href: 'https://linkedin.com/in/yaqub-hasan',
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-brand-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono">{label}</p>
                  <p className="text-zinc-200 text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
