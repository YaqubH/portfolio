import { SectionLabel } from './Skills.jsx'
import { GraduationCap, BookOpen } from 'lucide-react'

const COURSEWORK = [
  'Data Structures',
  'Computer Organization',
  'Computer Systems and Programming',
  'Operating Systems',
  'Design and Analysis of Algorithms',
  'Database Management Systems',
  'Software Engineering',
  'Linear Algebra',
  'Discrete Mathematics',
]

export default function Experience() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Education" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-14">
          Education &{' '}
          <span className="gradient-text">Coursework</span>
        </h2>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/60 via-brand-500/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">

            <div className="sm:pl-14 relative">
              <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full glass border border-brand-500/30 items-center justify-center text-brand-400">
                <GraduationCap size={16} />
              </div>
              <div className="glass rounded-2xl p-6 hover:border-brand-500/30 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white text-lg">
                      Bachelor of Science in Computer Science
                    </h3>
                    <p className="text-brand-400 text-sm font-mono mt-0.5">
                      Graduated: December 2025
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                    2021 – Dec 2025
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:pl-14 relative">
              <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full glass border border-brand-500/30 items-center justify-center text-brand-400">
                <BookOpen size={16} />
              </div>
              <div className="glass rounded-2xl p-6 hover:border-brand-500/30 transition-colors">
                <h3 className="font-semibold text-white text-lg mb-4">
                  Relevant Coursework
                </h3>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map(course => (
                    <span
                      key={course}
                      className="px-3 py-1.5 rounded-md bg-white/5 text-zinc-300 text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
