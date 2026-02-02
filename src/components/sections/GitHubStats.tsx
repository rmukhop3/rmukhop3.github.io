'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'
import { useTheme } from '../ThemeProvider'

// GitHub username from resume data
const GITHUB_USERNAME = 'rmukhop3'

// Stats - update these periodically or fetch from GitHub API
const stats = [
  { label: 'Repositories', value: '25+', icon: 'code' },
  { label: 'Contributions', value: '1,247', icon: 'chart' },
  { label: 'Stars Earned', value: '50+', icon: 'star' },
  { label: 'Years Active', value: '5+', icon: 'terminal' },
]

// Streak stats - update periodically
const streakStats = {
  totalContributions: '1,247',
  currentStreak: 31,
  longestStreak: 31,
  contributionPeriod: 'Oct 23, 2023 - Present',
  currentStreakDates: 'Jan 2 - Feb 1',
  longestStreakDates: 'Jan 2 - Feb 1',
}

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
  const { theme } = useTheme()

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

            {/* GitHub Streak - Custom Component */}
            <div className="glass rounded-2xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Icon name="star" className="w-5 h-5 text-accent" />
                Contribution Streak
              </h3>
              <div className="flex-1 flex flex-col justify-center gap-6">
                {/* Current Streak - Main Feature */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="var(--bg-tertiary)"
                        strokeWidth="6"
                      />
                      {/* Animated progress circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#streakGradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={263.9}
                        initial={{ strokeDashoffset: 263.9 }}
                        animate={inView ? { strokeDashoffset: 263.9 * (1 - Math.min(streakStats.currentStreak, 100) / 100) } : {}}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        transform="rotate(-90 50 50)"
                      />
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-3xl font-bold text-[var(--text-primary)]"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      >
                        {streakStats.currentStreak}
                      </motion.span>
                      <span className="text-xs text-[var(--text-secondary)]">days</span>
                    </div>
                  </div>
                </div>

                {/* Current Streak Label */}
                <div className="text-center">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-lg">🔥</span>
                    <span className="text-sm font-semibold text-accent">Current Streak</span>
                  </motion.div>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2">
                    {streakStats.currentStreakDates}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <motion.div
                    className="text-center p-3 rounded-xl bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="text-xl font-bold text-[var(--text-primary)]"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 }}
                    >
                      {streakStats.totalContributions}
                    </motion.div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Total Commits
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-center p-3 rounded-xl bg-[var(--bg-tertiary)]/30 hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="text-xl font-bold text-[var(--text-primary)]"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.1 }}
                    >
                      {streakStats.longestStreak}
                    </motion.div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Best Streak
                    </div>
                  </motion.div>
                </div>
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
                style={theme === 'dark' ? { filter: 'invert(1) hue-rotate(180deg) saturate(1.5) brightness(0.9)' } : {}}
                loading="lazy"
              />
            </div>
            <p className="text-center text-xs text-[var(--text-tertiary)] mt-4">
              Each square represents a day of contributions
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
