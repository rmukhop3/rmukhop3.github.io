'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'

// GitHub username from resume data
const GITHUB_USERNAME = 'rmukhop3'

// Stats - update these periodically or fetch from GitHub API
const stats = [
  { label: 'Repositories', value: '25+', icon: 'code' },
  { label: 'Contributions', value: '1,247', icon: 'chart' },
  { label: 'Stars Earned', value: '50+', icon: 'star' },
  { label: 'Years Active', value: '5+', icon: 'terminal' },
]

const topLanguages = [
  { name: 'Python', percentage: 65, color: '#3572A5' },
  { name: 'TypeScript', percentage: 15, color: '#2b7489' },
  { name: 'JavaScript', percentage: 10, color: '#f1e05a' },
  { name: 'Java', percentage: 5, color: '#b07219' },
  { name: 'Other', percentage: 5, color: '#8b5cf6' },
]

export default function GitHubStats() {
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

  return (
    <section id="github" className="section relative overflow-hidden">
      <div className="absolute inset-0 section-bg-secondary" />
      <GradientMesh variant="skills" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container-custom relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="heading-lg mb-4">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            My open source contributions and coding activity
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* GitHub Profile Link */}
          <motion.a
            variants={itemVariants}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon name="github" className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors">
                    @{GITHUB_USERNAME}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    View my GitHub profile →
                  </p>
                </div>
              </div>
              <Icon name="external" className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-accent transition-colors" />
            </div>
          </motion.a>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat.icon} className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Languages and Contribution Graph */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Top Languages */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <Icon name="code" className="w-5 h-5 text-accent" />
                Top Languages
              </h3>
              <div className="space-y-4">
                {topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--text-primary)] font-medium">{lang.name}</span>
                      <span className="text-[var(--text-secondary)]">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${lang.percentage}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Streak */}
            <div className="glass rounded-2xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <Icon name="star" className="w-5 h-5 text-accent" />
                Contribution Streak
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=8b5cf6&fire=8b5cf6&currStreakLabel=8b5cf6&sideLabels=94a3b8&currStreakNum=1e293b&sideNums=1e293b&dates=64748b&background=00000000`}
                  alt="GitHub Streak"
                  className="w-full max-w-sm"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* GitHub Contribution Graph */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Icon name="chart" className="w-5 h-5 text-accent" />
              Contribution Activity
            </h3>
            <div className="flex justify-center overflow-x-auto">
              <img
                src={`https://ghchart.rshah.org/8b5cf6/${GITHUB_USERNAME}`}
                alt="GitHub Contribution Graph"
                className="w-full max-w-4xl rounded-lg min-w-[600px]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
