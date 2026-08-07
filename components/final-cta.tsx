'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { KineticHeading } from '@/components/motion/primitives'
import { Magnetic } from '@/components/interactive'

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[80svh] items-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/hero-city.png"
          alt="City skyline at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/70 to-background/50" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          <KineticHeading text="Let's build what" />
          <br />
          <KineticHeading text="comes next" highlight="next" delay={0.1} />
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="shine group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_12px_32px_-8px_rgba(78,114,217,0.6)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Start a conversation
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
