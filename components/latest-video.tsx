import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/section-heading'
import { VideoFeature } from '@/components/video-feature'
import { Reveal } from '@/components/motion/primitives'

export function LatestVideo() {
  return (
    <section
      id="video"
      className="relative overflow-hidden border-y border-[#2a3248] bg-[#1e2540] py-20 sm:py-28"
    >
      {/* Subtle dot texture for depth */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
      {/* Soft radial glow centered behind video */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          {/* Inline heading with explicit white colors for dark background */}
          <div className="flex flex-col gap-5">
            <Reveal>
              <SectionLabel className="text-primary-light [&>span]:bg-primary-light/60">
                Latest Video
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                See the work{' '}
                <span className="text-sunstone">in motion</span>
              </h2>
            </Reveal>
          </div>

          <a
            href="#news-archive"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            View more
            <ArrowRight className="size-4 text-primary-light transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14">
          <VideoFeature />
        </div>
      </div>
    </section>
  )
}
