'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedId, setExpandedId] = useState<string | null>(
    resumeData.experience[0]?.id || null
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="absolute inset-0 section-bg-secondary" />
      <GradientMesh variant="experience" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border-color)] transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative ${
                    index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 ${
                      index % 2 === 0 ? 'md:translate-x-0' : ''
                    } ring-4 ring-[var(--bg-secondary)]`}
                    style={{
                      top: '2rem',
                    }}
                  />

                  {/* Card */}
                  <motion.div
                    className={`ml-8 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === exp.id ? null : exp.id)
                      }
                      className="w-full text-left glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="heading-sm mb-2">{exp.role}</h3>
                          <div className="flex items-center gap-2 text-accent font-medium mb-1">
                            {exp.companyLogo && (
                              <img
                                src={`/logos/${exp.companyLogo}.png`}
                                alt={`${exp.company} logo`}
                                className="w-6 h-6 object-contain"
                              />
                            )}
                            {exp.company}
                          </div>
                          <div className="text-sm text-[var(--text-tertiary)]">
                            {exp.start} - {exp.end} • {exp.location}
                          </div>
                        </div>

                        <motion.div
                          animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            className="w-6 h-6 text-[var(--text-secondary)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      <p className="text-[var(--text-secondary)] mb-4">
                        {exp.description}
                      </p>

                      <AnimatePresence>
                        {expandedId === exp.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
                              {/* Achievements */}
                              <ul className="space-y-2">
                                {exp.bullets.map((bullet, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start space-x-2 text-sm text-[var(--text-secondary)]"
                                  >
                                    <Icon
                                      name="check"
                                      className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                                    />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Tech Stack */}
                              <div className="flex flex-wrap gap-2 pt-2">
                                {exp.tech.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
