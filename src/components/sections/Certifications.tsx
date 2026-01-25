'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="certifications" className="section relative overflow-hidden">
      <div className="absolute inset-0 section-bg-primary" />
      <GradientMesh variant="certifications" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          Licenses & Certifications
        </motion.h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {resumeData.certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="heading-sm text-[var(--text-primary)] mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-accent font-medium mb-1">{cert.issuer}</p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    {cert.date}
                    {cert.expires && ` • Expires ${cert.expires}`}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors duration-200"
                    aria-label="View credential"
                  >
                    <Icon name="external" className="w-5 h-5 text-[var(--text-secondary)]" />
                  </a>
                )}
              </div>

              {cert.credentialId && (
                <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Credential ID: {cert.credentialId}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
