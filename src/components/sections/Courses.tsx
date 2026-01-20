'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import GradientMesh from '../GradientMesh'

export default function Courses() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section id="courses" className="section relative bg-[var(--bg-secondary)] overflow-hidden">
      <GradientMesh variant="courses" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          Academic Coursework
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {resumeData.education.map((edu, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="mb-6">
                <h3 className="heading-md mb-2">{edu.degree}</h3>
                <p className="text-accent font-medium mb-1">{edu.school}</p>
                <p className="text-sm text-[var(--text-tertiary)]">
                  {edu.start} - {edu.end} • GPA: {edu.gpa}
                </p>
              </div>

              <div className="space-y-2">
                {edu.courses.map((course, courseIndex) => (
                  <motion.div
                    key={courseIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: courseIndex * 0.05 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-[var(--text-secondary)]">{course}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
