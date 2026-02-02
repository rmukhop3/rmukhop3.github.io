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
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

// Secondary nav items shown in dropdown
const moreItems = [
  { name: 'Education', href: '#education' },
  { name: 'Publications', href: '#publications' },
  { name: 'GitHub', href: '#github' },
  { name: 'Courses', href: '#courses' },
  { name: 'Certifications', href: '#certifications' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
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
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <MagneticButton key={item.name} strength={0.2}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="text-[var(--text-secondary)] hover:text-accent transition-colors duration-200 font-medium text-sm"
                >
                  {item.name}
                </a>
              </MagneticButton>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <MagneticButton strength={0.2}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
                  className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200 font-medium text-sm"
                >
                  More
                  <motion.svg
                    animate={{ rotate: isMoreOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
              </MagneticButton>
              
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 py-2 w-44 glass rounded-xl shadow-xl"
                  >
                    {moreItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                          setIsMoreOpen(false)
                        }}
                        className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-accent hover:bg-[var(--bg-secondary)] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle - Animated Switch */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300"
              style={{
                backgroundColor: theme === 'dark' ? 'var(--bg-tertiary)' : '#e0e7ff',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                animate={{
                  x: theme === 'dark' ? 28 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Icon
                  name={theme === 'dark' ? 'moon' : 'sun'}
                  className="w-3 h-3 text-accent"
                />
              </motion.div>
              {/* Background icons */}
              <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                <Icon name="sun" className={`w-3 h-3 transition-opacity ${theme === 'dark' ? 'opacity-30' : 'opacity-0'}`} />
                <Icon name="moon" className={`w-3 h-3 transition-opacity ${theme === 'light' ? 'opacity-30' : 'opacity-0'}`} />
              </div>
            </motion.button>
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
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--bg-primary)] shadow-2xl overflow-y-auto">
              <div className="flex flex-col p-6 space-y-4 mt-20">
                {/* Primary nav items */}
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-lg text-[var(--text-primary)] hover:text-accent transition-colors duration-200"
                  >
                    {item.name}
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="border-t border-[var(--border-color)] my-2" />

                {/* Secondary nav items */}
                {moreItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + index) * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-lg text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
                  >
                    {item.name}
                  </motion.a>
                ))}

                {/* Theme Toggle */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full py-2 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        name={theme === 'light' ? 'moon' : 'sun'}
                        className="w-5 h-5"
                      />
                      <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                    </span>
                    {/* Mini toggle indicator */}
                    <div 
                      className="w-10 h-5 rounded-full p-0.5 transition-colors"
                      style={{ backgroundColor: theme === 'dark' ? 'var(--accent)' : 'var(--bg-tertiary)' }}
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full bg-white shadow"
                        animate={{ x: theme === 'dark' ? 20 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </div>
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
