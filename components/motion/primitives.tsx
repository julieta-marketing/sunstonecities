'use client'

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
  type MotionValue,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const easeOut = [0.16, 1, 0.3, 1] as const

/* Fade + rise on scroll into view */
export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 28,
  once = true,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  once?: boolean
  as?: 'div' | 'span' | 'li' | 'section'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  )
}

/* Alias: FadeIn is a Reveal */
export const FadeIn = Reveal

/* Stagger container + item */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
}

export function Stagger({
  children,
  className,
  once = true,
  staggerChildren = 0.1,
  delayChildren = 0.05,
  viewportAmount,
  viewportMargin = '-60px',
}: {
  children: ReactNode
  className?: string
  once?: boolean
  staggerChildren?: number
  delayChildren?: number
  viewportAmount?: number
  viewportMargin?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: viewportMargin, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 26,
  duration = 0.75,
}: {
  children: ReactNode
  className?: string
  y?: number
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* Parallax translate driven by scroll position */
export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

/* Word-by-word headline reveal with a clip mask */
export function KineticHeading({
  text,
  className,
  highlight,
  highlightClassName = 'text-sunstone',
  delay = 0,
  animateOnMount = false,
}: {
  text: string
  className?: string
  highlight?: string
  highlightClassName?: string
  delay?: number
  animateOnMount?: boolean
}) {
  const words = text.split(' ')
  const normalizedWords = words.map((word) => word.replace(/[^\w]/g, ''))
  const highlightWords = highlight?.split(' ').filter(Boolean) ?? []
  const highlightedIndexes = new Set<number>()

  if (highlightWords.length) {
    normalizedWords.forEach((_, i) => {
      const phraseMatches = highlightWords.every(
        (highlightWord, j) => normalizedWords[i + j] === highlightWord
      )

      if (phraseMatches) {
        highlightWords.forEach((_, j) => highlightedIndexes.add(i + j))
      }
    })
  }

  const revealProps = animateOnMount
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: true } as const }
  return (
    <span className={cn('inline', className)}>
      {words.map((word, i) => {
        const isHi = highlightedIndexes.has(i)
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-top pb-[0.08em]"
          >
            <motion.span
              className={cn('inline-block', isHi && highlightClassName)}
              initial={{ y: '110%' }}
              {...revealProps}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.06,
                ease: easeOut,
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

export function useScrollProgress(): {
  ref: React.RefObject<HTMLDivElement | null>
  progress: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  return { ref, progress: scrollYProgress }
}
