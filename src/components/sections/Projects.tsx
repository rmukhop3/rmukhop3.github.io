'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import ProjectOverlay from '../ProjectOverlay'
import Icon from '../Icon'

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const project = selectedProject
    ? resumeData.projects.find((p) => p.id === selectedProject)
    : null

  return (
    <section id="projects" className="section bg-[var(--bg-primary)]">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          Featured Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {resumeData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Project image placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      name="code"
                      className="w-20 h-20 text-accent/30 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium bg-accent text-white rounded-full">
                      {project.start.split(' ')[1]} {/* Year */}
                    </span>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="heading-sm mb-2 group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-2">
                      {project.subtitle}
                    </p>
                    <p className="text-[var(--text-secondary)] line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs text-[var(--text-tertiary)]">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                    <span className="text-sm text-accent font-medium group-hover:underline">
                      View Details →
                    </span>
                    <div className="flex space-x-3">
                      {project.live && (
                        <Icon
                          name="external"
                          className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-200"
                        />
                      )}
                      {project.repo && (
                        <Icon
                          name="github"
                          className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-200"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Project Overlay */}
      {project && (
        <ProjectOverlay
          project={project}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
