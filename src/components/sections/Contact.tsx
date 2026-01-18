'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import resumeData from '@/data/resume.json'
import Icon from '../Icon'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // For static site, use mailto as fallback
    // For production with serverless function, replace this with API call
    const mailtoLink = `mailto:${resumeData.email}?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`

    window.location.href = mailtoLink

    setStatus('success')
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setStatus('idle')
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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

  return (
    <section id="contact" className="section bg-[var(--bg-secondary)]">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom"
      >
        <motion.h2 variants={itemVariants} className="heading-lg text-center mb-16">
          Let's Connect
        </motion.h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="heading-sm mb-4">Get in touch</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                I'm always interested in hearing about new opportunities,
                collaborations, or just having a chat about ML and AI. Feel free
                to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${resumeData.email}`}
                className="flex items-center space-x-4 p-4 rounded-xl glass hover:scale-105 transition-transform duration-200 group"
              >
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-200">
                  <Icon name="email" className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-[var(--text-tertiary)]">
                    Email
                  </div>
                  <div className="font-medium text-[var(--text-primary)]">
                    {resumeData.email}
                  </div>
                </div>
              </a>

              <a
                href={`https://github.com/${resumeData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl glass hover:scale-105 transition-transform duration-200 group"
              >
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-200">
                  <Icon name="github" className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-[var(--text-tertiary)]">
                    GitHub
                  </div>
                  <div className="font-medium text-[var(--text-primary)]">
                    @{resumeData.github}
                  </div>
                </div>
              </a>

              <a
                href={`https://linkedin.com/in/${resumeData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl glass hover:scale-105 transition-transform duration-200 group"
              >
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-200">
                  <Icon name="linkedin" className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-[var(--text-tertiary)]">
                    LinkedIn
                  </div>
                  <div className="font-medium text-[var(--text-primary)]">
                    {resumeData.linkedin}
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-[var(--text-primary)]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-[var(--text-primary)]"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-[var(--text-primary)] resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Message Sent!'
                  : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-sm text-green-500 text-center">
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
