'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { KineticHeading } from '@/components/motion/primitives'
import { Magnetic } from '@/components/interactive'
import { marqueeItems } from '@/lib/site-data'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="hero-shell grain relative flex min-h-[67svh] flex-col justify-end overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-long-beach-marina.jpg"
          alt="Aerial view of the Long Beach marina and downtown skyline at sunset"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[center_82%]"
        />
      </motion.div>

      {/* Keep the copy readable while allowing the right half of the photo
          to remain crisp and unobstructed on larger screens. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 sm:hidden"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(238, 243, 252, 0.52) 0%, rgba(238, 243, 252, 0.74) 48%, rgba(238, 243, 252, 0.9) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(238, 243, 252, 0.88) 0%, rgba(238, 243, 252, 0.82) 34%, rgba(238, 243, 252, 0.62) 48%, rgba(238, 243, 252, 0.28) 58%, rgba(238, 243, 252, 0.05) 68%, transparent 75%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="hero-content relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pt-32"
      >
        <h1 className="hero-title max-w-5xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance text-[#1c244b] sm:text-6xl lg:text-7xl">
          <KineticHeading text="Enriching communities" animateOnMount delay={0.3} />
          <br />
          <KineticHeading
            text="through economic development"
            highlight="economic development"
            highlightClassName="font-bold text-primary"
            animateOnMount
            delay={0.5}
          />
        </h1>

        <div className="hero-copy-row mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.9 }}
            className="hero-summary max-w-md text-pretty text-base font-medium leading-relaxed text-[#3a4260] sm:text-lg"
          >
            Sunstone Cities partners with local governments to unlock growth,
            attract investment, and deliver projects that strengthen communities.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 1 }}
            className="hero-actions flex items-center gap-3"
          >
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                className="hero-cta shine group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-8px_rgba(78,114,217,0.6)] ring-1 ring-primary-dark/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_18px_40px_-10px_rgba(78,114,217,0.7)]"
              >
                Contact Us
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <a
              href="#services"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-base font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
            >
              Our Services
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee ticker
          A fixed dark scrim (not just text color) keeps contrast consistent
          against the hero photo's varying brightness left-to-right — a light
          overlay here would wash out over the photo's brighter areas. */}
      <div className="hero-marquee relative z-10 border-y border-white/15 bg-[#0F3A63]/85 py-4 backdrop-blur-sm">
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee items-center">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-sm font-medium tracking-wide text-white/90"
              >
                {item}
                <span className="size-1 rounded-full bg-primary-light" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
