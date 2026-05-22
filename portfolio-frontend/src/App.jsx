import Navbar    from './components/Navbar.jsx'
import Hero      from './components/Hero.jsx'
import Skills    from './components/Skills.jsx'
import Projects  from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact   from './components/Contact.jsx'
import ChatBot   from './components/ChatBot.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <ChatBot />
    </div>
  )
}
