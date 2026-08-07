'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Play } from 'lucide-react'
import { SectionLabel } from '@/components/section-heading'
import { Reveal } from '@/components/motion/primitives'

export function VideoFeature() {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal>
      <div className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-border">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1"
            title="Sunstone Cities film"
            allow="accelerated-media; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="shine absolute inset-0 size-full"
            aria-label="Play film"
          >
            <Image
              src="/video-poster.png"
              alt="Sunstone Cities film poster"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/30" />

            {/* Play */}
            <span className="absolute inset-0 flex items-center justify-center">
              <motion.span
                whileHover={{ scale: 1.08 }}
                className="relative flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_50px_-8px_var(--primary)] sm:size-24"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                <Play className="size-7 translate-x-0.5 fill-current sm:size-8" />
              </motion.span>
            </span>

            {/* Meta */}
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-left sm:p-8">
              <SectionLabel>Field Notes</SectionLabel>
              <span className="max-w-xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
                How a stalled downtown became a district again
              </span>
            </span>
          </button>
        )}
      </div>
    </Reveal>
  )
}
