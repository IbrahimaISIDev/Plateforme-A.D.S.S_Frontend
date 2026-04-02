import React, { type ReactNode } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInProps extends MotionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.5,
  direction = 'up',
  distance = 20,
  ...motionProps 
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 }
      case 'down': return { y: -distance, opacity: 0 }
      case 'left': return { x: distance, opacity: 0 }
      case 'right': return { x: -distance, opacity: 0 }
      case 'none': return { opacity: 0 }
      default: return { y: distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ y: 0, x: 0, opacity: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] as const
      }}
      className={cn(className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  childDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function StaggerChildren({ 
  children, 
  className, 
  staggerDelay = 0.1,
  childDelay = 0,
  direction = 'up'
}: StaggerChildrenProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay
      }
    }
  }

  const childVariants = {
    hidden: () => {
      switch (direction) {
        case 'up': return { y: 20, opacity: 0 }
        case 'down': return { y: -20, opacity: 0 }
        case 'left': return { x: 20, opacity: 0 }
        case 'right': return { x: -20, opacity: 0 }
        case 'none': return { opacity: 0 }
        default: return { y: 20, opacity: 0 }
      }
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        ease: [0.25, 0.1, 0.25, 1.0] as const
      }
    }
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  initialScale?: number
}

export function ScaleIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.3,
  initialScale = 0.9
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface SlideInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction: 'left' | 'right' | 'up' | 'down'
  distance?: number
}

export function SlideIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.4,
  direction,
  distance = 100
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -distance }
      case 'right': return { x: distance }
      case 'up': return { y: -distance }
      case 'down': return { y: distance }
      default: return { x: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// Hook pour les animations de hover
export function useHoverAnimation() {
  return {
    whileHover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
}

// Animation de pulse pour les éléments importants
export function Pulse({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
