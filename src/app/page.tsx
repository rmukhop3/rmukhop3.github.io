import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import GitHubStats from '@/components/sections/GitHubStats'
import Education from '@/components/sections/Education'
import Publications from '@/components/sections/Publications'
import Courses from '@/components/sections/Courses'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="relative bg-[var(--bg-primary)]">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Publications />
      <Projects />
      <GitHubStats />
      <Courses />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
