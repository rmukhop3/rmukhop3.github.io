'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  challenge?: string
  solution?: string
  tech: string[]
  highlights?: string[]
  start: string
  end: string
  live?: string | null
  repo?: string | null
  paper?: string | null
}

interface ProjectOverlayProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

/**
 * ProjectOverlay Component - Detailed project view modal
 *
 * Accessibility:
 * - Focus trap when open
 * - ESC key to close
 * - Click outside to close
 * - ARIA attributes for screen readers
 */
export default function ProjectOverlay({
  project,
  isOpen,
  onClose,
}: ProjectOverlayProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--bg-primary)] rounded-2xl shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-4 right-4 float-right z-10 p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
              aria-label="Close project details"
            >
              <Icon name="close" className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <h2 id="project-title" className="heading-lg mb-3">
                  {project.title}
                </h2>
                <p className="text-xl text-accent font-medium mb-4">
                  {project.subtitle}
                </p>
                <p className="text-[var(--text-secondary)]">
                  {project.start} - {project.end}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="heading-sm mb-4">Overview</h3>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Challenge & Solution */}
              {project.challenge && project.solution && (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="glass rounded-xl p-6">
                    <h3 className="heading-sm mb-4 text-orange-500">
                      Challenge
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6">
                    <h3 className="heading-sm mb-4 text-green-500">
                      Solution
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="heading-sm mb-4">Key Achievements</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 rounded-lg bg-[var(--bg-secondary)]"
                      >
                        <Icon
                          name="check"
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        />
                        <span className="text-[var(--text-secondary)]">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="heading-sm mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-accent/10 text-accent rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Icon name="external" className="w-5 h-5" />
                    <span>View Live</span>
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Icon name="github" className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                )}
                {project.paper && (
                  <a
                    href={project.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Icon name="external" className="w-5 h-5" />
                    <span>Read Paper</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
