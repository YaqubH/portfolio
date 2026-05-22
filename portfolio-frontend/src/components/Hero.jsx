import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-20">
        <div className="max-w-3xl animate-fade-in-up">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-brand-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for full-time roles
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-5">
            Hi, I'm{' '}
            <span className="gradient-text">Yaqub Hasan</span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-300 font-medium mb-6 leading-snug">
            Computer Science graduate focused on full-stack development, databases, search systems, and AI-integrated applications.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-10">
            I build practical software projects using web development, databases, and search systems.
            My current portfolio project includes an AI assistant powered by{' '}
            <span className="text-zinc-200 font-medium">Claude API</span> that can answer questions
            about my resume, projects, and technical background.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all glow hover:glow"
            >
              View My Work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-zinc-300 hover:text-white font-semibold transition-all"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex items-center gap-5 mt-10">
            {[
              { icon: Github,   href: 'https://github.com/yaqubhasan',       label: 'GitHub'   },
              { icon: Linkedin, href: 'https://linkedin.com/in/yaqub-hasan', label: 'LinkedIn' },
              { icon: Mail,     href: 'mailto:yaqubhasann@gmail.com',        label: 'Email'    },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-brand-400 transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 text-xs font-mono">
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  )
}
