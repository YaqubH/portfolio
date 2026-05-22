const SKILLS = [
  {
    category: 'Languages',
    items: ['JavaScript', 'Python', 'C/C++', 'SQL'],
  },
  {
    category: 'Frameworks & Tools',
    items: ['React', 'Node.js', 'Flask', 'FastAPI', 'Docker', 'Git', 'Apache Tomcat'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    category: 'AI & Developer Tools',
    items: ['Claude', 'Claude API', 'OpenAI API', 'GitHub Copilot', 'Prompt Engineering', 'AI-Assisted Development'],
  },
  {
    category: 'Concepts',
    items: ['Data Structures & Algorithms', 'REST APIs', 'Full-Stack Development', 'Object-Oriented Programming', 'Retrieval-Augmented Generation'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Skills" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          My Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="text-zinc-400 mb-14 max-w-xl">
          Technologies and concepts I've applied across coursework and personal projects.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map(({ category, items }) => (
            <div
              key={category}
              className="glass rounded-2xl p-6 hover:border-brand-500/30 transition-colors group"
            >
              <h3 className="font-mono text-xs text-brand-400 uppercase tracking-widest mb-4 group-hover:text-brand-300 transition-colors">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md bg-white/5 text-zinc-300 text-sm hover:bg-brand-500/20 hover:text-brand-300 transition-colors cursor-default"
                  >
                    {skill}
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

export function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-px bg-brand-500" />
      <span className="font-mono text-xs text-brand-400 uppercase tracking-widest">{label}</span>
    </div>
  )
}
