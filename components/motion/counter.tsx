'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 })

  useEffect(() => {
    if (shouldReduceMotion) {
      motionValue.set(value)
      return
    }
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue, shouldReduceMotion])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          latest.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix
      }
    })
  }, [spring, prefix, suffix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shouldReduceMotion
        ? value.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : '0'}
      {suffix}
    </span>
  )
}
