import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail, Network } from 'lucide-react'
import { LinkedinIcon } from '@/components/brand-icons'
import { DotField } from '@/components/decor'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { SectionLabel } from '@/components/section-heading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TeamPhotoCard } from '@/components/team-photo-card'
import { teamMembers } from '@/lib/team-members'

export const metadata: Metadata = {
  title: 'Our Team | Sunstone Cities',
  description:
    'Meet the public-sector leaders, economic development professionals, analysts, and communications specialists behind Sunstone Cities.',
}

// All five photos are pre-cropped to the same 3:4 head-and-shoulders framing
// (see components/team-photo-card.tsx), so no focus/zoom overrides are needed.
const managingMembers = [
  { name: 'John Keisler', image: '/team/ownership-john.jpg' },
  { name: 'Mike Stone', image: '/team/ownership-mike.jpg' },
  { name: 'Jessica Dela Rosa', image: '/team/ownership-jessica.jpg' },
  { name: 'Jayro Sandoval', image: '/team/ownership-jayro.jpg' },
  { name: 'Ryan Phong', image: '/team/ownership-ryan.jpg' },
]

export default function TeamPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-primary/10 px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
        <DotField className="opacity-[0.16]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-10 size-[28rem] rounded-full bg-primary/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-[-12rem] size-[34rem] rounded-full bg-[#79B3DE]/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <Link
              href="/#about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-x-1"
              />
              Back to About
            </Link>
          </Reveal>

          <Reveal className="mt-12" delay={0.06}>
            <SectionLabel>Team</SectionLabel>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
              Public-sector experience.{' '}
              <span className="text-primary">Shared purpose.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
              Our team includes former public agency leaders, economic
              development professionals, and communications specialists. We
              understand municipal processes and work as an extension of our
              clients’ teams to move important work forward.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-[#0F3A63] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(121,179,222,0.22),transparent_38%),radial-gradient(circle_at_85%_75%,rgba(73,128,246,0.2),transparent_36%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B9DCF0]">
                <Network aria-hidden="true" className="size-4" />
                Ownership
              </span>
              <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Sunstone Cities is owned and operated by five managing members.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/72 lg:justify-self-end">
              Shared ownership brings complementary experience and direct
              accountability to every client relationship and project.
            </p>
          </Reveal>

          <Stagger
            className="mt-10 grid grid-cols-2 gap-1 overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5"
            staggerChildren={0.08}
          >
            {managingMembers.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <TeamPhotoCard name={member.name} image={member.image} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative isolate px-5 py-20 sm:px-8 sm:py-28">
        <DotField className="opacity-[0.11]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>People</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              The expertise behind{' '}
              <span className="text-primary">every engagement</span>
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-primary/12 border-y border-primary/12 sm:mt-16">
            {teamMembers.map((profile, index) => (
              <Reveal
                key={profile.name}
                className="group grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-14"
                x={index % 2 === 0 ? -20 : 20}
                y={16}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#d9dce0] shadow-[0_28px_65px_-42px_rgba(15,58,99,0.65)] lg:col-span-4 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={profile.photo}
                      alt={`${profile.name}, ${profile.title}`}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-top saturate-[0.86] transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0F3A63]/24 to-transparent"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-8 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {profile.name}
                  </h3>
                  <p className="mt-2 max-w-2xl font-display text-base font-medium leading-relaxed text-primary sm:text-lg">
                    {profile.title}
                  </p>
                  <p className="mt-6 max-w-3xl text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
                    {profile.fullIntroduction}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/action inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-20px_rgba(73,128,246,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={`View ${profile.name} on LinkedIn (opens in a new tab)`}
                    >
                      <LinkedinIcon className="size-4" />
                      LinkedIn
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
                      />
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Mail aria-hidden="true" className="size-4" />
                      Email
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter showFaq={false} />
    </main>
  )
}
