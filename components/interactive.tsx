'use client'

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { cn } from '@/lib/utils'

/* Card with a mouse-following spotlight highlight */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('spotlight relative', className)}
    >
      {children}
    </div>
  )
}

/* 3D tilt that responds to cursor position */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  })

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={shouldReduceMotion ? undefined : onMove}
      onMouseLeave={shouldReduceMotion ? undefined : reset}
      style={shouldReduceMotion ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn('[transform-style:preserve-3d]', className)}
    >
      {children}
    </motion.div>
  )
}

/* Button/element that leans toward the cursor */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={shouldReduceMotion ? undefined : onMove}
      onMouseLeave={shouldReduceMotion ? undefined : reset}
      style={shouldReduceMotion ? undefined : { x, y }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}

/* Count-up number that animates when scrolled into view */
export function CountUp({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: {
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18 })
  const [display, setDisplay] = useState('0')

  useMotionValueEvent(spring, 'change', (v) => {
    setDisplay(v.toFixed(decimals))
  })

  if (inView) mv.set(to)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shouldReduceMotion ? to.toFixed(decimals) : display}
      {suffix}
    </span>
  )
}
