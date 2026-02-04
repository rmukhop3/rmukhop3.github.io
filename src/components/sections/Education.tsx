'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="education" className="section relative overflow-hidden">
      <div className="absolute inset-0 section-bg-primary" />
      <GradientMesh variant="skills" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          Education
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                          <Icon name="education" className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="heading-sm">{edu.degree}</h3>
                          <p className="text-accent font-medium">{edu.school}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end text-right">
                      <span className="text-sm text-[var(--text-tertiary)]">
                        {edu.start} - {edu.end}
                      </span>
                      <span className="text-sm text-[var(--text-tertiary)]">
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    {/* Top row - Specialization and GPA */}
                    <div className="flex flex-wrap gap-6">
                      {edu.specialization && (
                        <div className="flex items-center gap-2">
                          <Icon name="star" className="w-5 h-5 text-accent" />
                          <span className="text-[var(--text-secondary)]">
                            {edu.specialization}
                          </span>
                        </div>
                      )}
                      
                      {edu.gpa && (
                        <div className="flex items-center gap-2">
                          <Icon name="chart" className="w-5 h-5 text-accent" />
                          <span className="text-[var(--text-secondary)]">
                            GPA: <span className="font-semibold text-[var(--text-primary)]">{edu.gpa}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Courses - Full width grid */}
                    {edu.courses && edu.courses.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                          Key Courses
                        </h4>
                        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1.5">
                          {edu.courses.map((course, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[var(--text-secondary)] group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                              <span className="group-hover:text-accent transition-colors">{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
