'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import Icon from './Icon'
import MagneticButton from './MagneticButton'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Publications', href: '#publications' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Courses', href: '#courses' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
          >
            RM
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <MagneticButton key={item.name} strength={0.2}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="text-[var(--text-secondary)] hover:text-accent transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              </MagneticButton>
            ))}

            {/* Theme Toggle */}
            <MagneticButton strength={0.3}>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors duration-200"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <Icon
                  name={theme === 'light' ? 'moon' : 'sun'}
                  className="w-5 h-5"
                />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'close' : 'menu'}
              className="w-6 h-6"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-[var(--bg-primary)] shadow-2xl">
              <div className="flex flex-col p-8 space-y-6 mt-20">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-xl text-[var(--text-primary)] hover:text-accent transition-colors duration-200"
                  >
                    {item.name}
                  </motion.a>
                ))}

                <div className="pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-3 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
                  >
                    <Icon
                      name={theme === 'light' ? 'moon' : 'sun'}
                      className="w-5 h-5"
                    />
                    <span>
                      {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
