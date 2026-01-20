'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'

export default function About() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Delivered', value: '15+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Publications', value: '2' },
  ]

  return (
    <section id="about" className="section relative bg-[var(--bg-secondary)] overflow-hidden">
      <GradientMesh variant="about" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {resumeData.summary}
            </p>

            <div className="space-y-3">
              <h3 className="heading-sm text-[var(--text-primary)]">
                Currently working on
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start space-x-2">
                  <Icon name="check" className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Building scalable RAG-based AI systems at Arizona State University</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="check" className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Optimizing vector database indexing for 35+ file formats</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="check" className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>Researching multi-agent architectures for context-aware chatbots</span>
                </li>
              </ul>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={`https://github.com/${resumeData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
              >
                <Icon name="github" className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href={`https://linkedin.com/in/${resumeData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
              >
                <Icon name="linkedin" className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-accent transition-colors duration-200"
              >
                <Icon name="email" className="w-5 h-5" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
