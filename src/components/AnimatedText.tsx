'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerChildren?: number
  once?: boolean
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  once = true,
}: AnimatedTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  // Split text into words, then each word into characters
  const words = text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
      },
    },
  }

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren / 2,
      },
    },
  }

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
        mass: 0.8,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ perspective: 800, willChange: 'transform' }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block whitespace-nowrap"
          variants={wordVariants}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={charVariants}
              style={{ transformOrigin: 'bottom' }}
            >
              {char}
            </motion.span>
          ))}
          {/* Add space after each word except the last */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Gradient text variant with character animation
export function AnimatedGradientText({
  text,
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  once = true,
}: AnimatedTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  const characters = text.split('')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
      },
    },
  }

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block gradient-text ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={charVariants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
