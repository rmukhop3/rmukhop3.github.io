'use client'

import resumeData from '@/data/resume.json'
import Icon from './Icon'
import { useTheme } from './ThemeProvider'

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: `https://github.com/${resumeData.github}`,
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      href: `https://linkedin.com/in/${resumeData.linkedin}`,
      icon: 'linkedin',
    },
    {
      name: 'Email',
      href: `mailto:${resumeData.email}`,
      icon: 'email',
    },
  ]

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] no-print">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              {resumeData.name}
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">
              {resumeData.tagline}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
                  aria-label={link.name}
                >
                  <Icon name={link.icon as any} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme & Settings */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">
              Preferences
            </h4>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200 mb-4"
            >
              <Icon
                name={theme === 'light' ? 'moon' : 'sun'}
                className="w-5 h-5"
              />
              <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
            >
              <Icon name="download" className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-[var(--text-tertiary)]">
            © {currentYear} {resumeData.name}. Built with Next.js & Tailwind CSS.
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            Designed & Developed with care ✨
          </p>
        </div>
      </div>
    </footer>
  )
}
