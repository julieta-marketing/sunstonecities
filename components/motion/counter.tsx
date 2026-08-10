'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

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
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

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
      {prefix}0{suffix}
    </span>
  )
}
