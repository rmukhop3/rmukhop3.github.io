'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'

// Publications data - can be moved to resume.json later
const publications = [
  {
    id: 'sarah-paper',
    title: 'SARAH: Semi-Automated Rehabilitation at Home Using Computer Vision',
    authors: ['Riyank Mukhopadhyay', 'et al.'],
    venue: 'ASU Geometric Media Lab',
    year: '2023',
    status: 'In Progress',
    abstract: 'A computer vision-based rehabilitation system for assessing upper extremity movement quality in stroke survivors using Detectron2 and transformer-based 3D hand-mesh reconstruction.',
    tags: ['Computer Vision', 'Healthcare AI', 'Pose Estimation'],
    links: {
      paper: null,
      code: null,
      demo: null,
    },
  },
  {
    id: 'rlhf-viz-paper',
    title: 'Interactive Visualization for Reinforcement Learning Policy Analysis',
    authors: ['Riyank Mukhopadhyay', 'et al.'],
    venue: 'Visual Informatics',
    year: '2024',
    status: 'Submitted',
    abstract: 'A visualization interface for interactively manipulating and analyzing the CAPS algorithm for training RL agents, enabling detailed exploration of Action/Reward/Value distributions.',
    tags: ['Data Visualization', 'Reinforcement Learning', 'Interactive Systems'],
    links: {
      paper: null,
      code: null,
      demo: null,
    },
  },
]

export default function Publications() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'submitted':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <section id="publications" className="section relative overflow-hidden">
      <div className="absolute inset-0 section-bg-secondary" />
      <GradientMesh variant="contact" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="heading-lg mb-4">Publications & Research</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Research contributions in computer vision, machine learning, and data visualization
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {publications.map((pub) => (
            <motion.article
              key={pub.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              className="glass rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative gradient accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent/30 rounded-l-2xl" />

              <div className="relative z-10 pl-4">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(pub.status)}`}>
                        {pub.status}
                      </span>
                      <span className="text-sm text-[var(--text-tertiary)]">{pub.year}</span>
                    </div>
                    <h3 className="heading-sm mb-2 group-hover:text-accent transition-colors duration-300">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {pub.authors.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="document" className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{pub.venue}</span>
                </div>

                {/* Abstract */}
                <p className="text-[var(--text-secondary)] mb-4 text-sm leading-relaxed">
                  {pub.abstract}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pub.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {pub.links.paper && (
                    <a
                      href={pub.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    >
                      <Icon name="external" className="w-4 h-4" />
                      Read Paper
                    </a>
                  )}
                  {pub.links.code && (
                    <a
                      href={pub.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-accent transition-colors"
                    >
                      <Icon name="github" className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {pub.links.demo && (
                    <a
                      href={pub.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-accent transition-colors"
                    >
                      <Icon name="eye" className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to action */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <p className="text-[var(--text-tertiary)] text-sm">
            Interested in collaboration?{' '}
            <a href="#contact" className="text-accent hover:underline">
              Let&apos;s connect
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
