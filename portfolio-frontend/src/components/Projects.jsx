import { Github } from 'lucide-react'
import { SectionLabel } from './Skills.jsx'

const PROJECTS = [
  {
    title: 'AI Portfolio Assistant',
    github: 'https://github.com/yaqubhasan',
    tags: ['React', 'FastAPI', 'Claude API', 'JavaScript', 'Python'],
    status: 'Completed',
    bullets: [
      'Developed a personal portfolio website with an AI chatbot that answers questions about my resume, projects, and technical background.',
      'Built a React frontend with sections for projects, technical skills, education, coursework, and contact information.',
      'Integrated a FastAPI backend with Claude API to generate personalized responses using resume and project data as context.',
      'Used AI-assisted development workflows with Claude to plan, build, debug, and improve the application structure.',
    ],
  },
  {
    title: 'Fabflix: Full-Stack Database Migration & Web Application',
    github: 'https://github.com/uci-jherold2-fall25-cs122b/2025-fall-cs-122b-y',
    tags: ['Java', 'MySQL', 'MongoDB', 'Tomcat'],
    status: 'Completed',
    bullets: [
      'Migrated a movie database application from MySQL to MongoDB, redesigning schema for NoSQL scalability.',
      'Built Java migration tools to transform relational datasets into document-based MongoDB collections.',
      'Replaced JDBC with the MongoDB Java driver and implemented authentication, cart, search, and security features.',
    ],
  },
  {
    title: 'NLP Search Engine with Inverted Indexing',
    github: 'https://github.com/nobantahir/NLP_Web_Search_Engine',
    tags: ['Python', 'Flask', 'NLTK', 'BeautifulSoup'],
    status: 'Completed',
    bullets: [
      'Built a search engine processing large-scale web data using NLP techniques and inverted indexing.',
      'Implemented tf-idf ranking, compressed index storage, and optimized retrieval using custom binary search.',
      'Designed a memory-efficient partial indexing system to handle large datasets at scale.',
      'Developed both CLI and Flask-based web interfaces with millisecond-level query response times.',
    ],
  },
  {
    title: 'Distributed Web Crawler',
    github: 'https://github.com/Yuanbao2000/Yuanbao2000-cs121_A2Crawler',
    tags: ['Python', 'Multithreading', 'Networking'],
    status: 'Completed',
    bullets: [
      'Developed a scalable web crawler to collect and process large volumes of web pages from distributed cache servers.',
      'Implemented URL frontier management, filtering, deduplication, and robust HTML parsing logic.',
      'Enforced politeness policies and rate limiting to ensure efficient and compliant crawling behavior.',
    ],
  },
]

const STATUS_COLORS = {
  'Completed':   'text-emerald-400 bg-emerald-400/10',
  'In Progress': 'text-amber-400 bg-amber-400/10',
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Projects" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Things I've <span className="gradient-text">Built</span>
        </h2>
        <p className="text-zinc-400 mb-14 max-w-xl">
          Projects spanning full-stack web development, databases, search systems, and AI — each built and shipped end to end.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-brand-500/30 transition-all group overflow-hidden w-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status]}`}>
                    {p.status}
                  </span>
                  <h3 className="font-semibold text-base text-white group-hover:text-brand-300 transition-colors leading-snug mt-1">
                    {p.title}
                  </h3>
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors shrink-0 mt-1"
                  aria-label="GitHub repository"
                >
                  <Github size={18} />
                </a>
              </div>

              <ul className="space-y-1.5 flex-1">
                {p.bullets.map((b, i) => (
                  <li key={i} className="text-zinc-400 text-sm flex gap-2 leading-relaxed break-words min-w-0">
                    <span className="text-brand-500 mt-0.5 shrink-0">▹</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
