import { SectionLabel } from '@/components/section-heading'
import { TeamCarousel } from '@/components/team-carousel'
import { team } from '@/lib/site-data'

/* Extracted from About() so it can be reordered independently on the
   homepage; markup/styling kept identical to its original embedded form. */
export function TeamSection() {
  return (
    <section
      id="team"
      className="relative isolate overflow-hidden border-t border-primary/20 bg-[#0b2c49] py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(126deg,transparent_0%,transparent_36%,rgba(70,127,247,0.16)_36%,transparent_53%,transparent_70%,rgba(41,176,166,0.1)_70%,transparent_88%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel className="text-[#a9c8ff]">Team</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
          The team behind <span className="text-[#8db5ff]">the work</span>
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/72 sm:text-lg">
          Experts in public strategy, economic development, and communications.
        </p>

        <TeamCarousel members={team} variant="dark" footerHref="/team" />
      </div>
    </section>
  )
}
