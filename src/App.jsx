import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import TechStack from '@/components/TechStack/TechStack'
import Projects from '@/components/Projects/Projects'
import Education from '@/components/Education/Education'
import Services from '@/components/Services/Services'
import Contact from '@/components/Contact/Contact'

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Education />
      <Services />
      <Contact />
    </div>
  )
}
