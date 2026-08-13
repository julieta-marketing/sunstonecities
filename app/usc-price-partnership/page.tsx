import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Users,
} from 'lucide-react'
import { Counter } from '@/components/motion/counter'
import {
  EventAlbumCarousel,
  type EventAlbumPhoto,
} from '@/components/event-album-carousel'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getProgramHistoryYears } from '@/lib/usc-program-history'

export const metadata: Metadata = {
  title: 'USC Price Partnership | Sunstone Cities',
  description:
    'Explore the Sunstone Economic Development Challenge at USC Price, its public-sector partners, program history, and ways to participate.',
}

const stats = [
  { value: 20, suffix: '', label: 'Local Governments Participated' },
  { value: 100, suffix: '+', label: 'USC Price Student Competitors' },
  { value: 200, suffix: '+', label: 'Final Pitch Event Attendees' },
]

const involvement: Array<{
  title: string
  description: string
  action: string
  href: string
  image: string
  imageAlt: string
  external?: boolean
}> = [
  {
    title: 'Participate as a Local Government Client',
    description: "Shape next year's Sunstone Economic Development Challenge.",
    action: 'Apply Now',
    href: 'https://us12.list-manage.com/survey?u=2fd77d6c079360825b35bcbcd&id=6d92f21886&attribution=false',
    image: '/usc-challenge/get-involved-local-government-client.jpg',
    imageAlt:
      'Local government and public-sector leaders attending a Sunstone Cities event',
    external: true,
  },
  {
    title: 'Sponsor',
    description: 'Support the annual Sunstone Economic Development Challenge.',
    action: 'Contact Us',
    href: 'mailto:John.Keisler@SunstoneCities.com',
    image: '/usc-challenge/get-involved-sponsor.jpg',
    imageAlt:
      'Sunstone Cities representative speaking at a City County Management Fellowship event',
    external: true,
  },
  {
    title: 'Join the Board',
    description: 'Connect with the City/County Management Fellowship Board.',
    action: 'Contact Us',
    href: 'https://priceschool.usc.edu/academics/masters/master-of-public-administration-mpa/city-county-management-fellowship/',
    image: '/usc-challenge/get-involved-board.png',
    imageAlt:
      'USC Price City County Management Fellowship community gathered outside Ralph and Goldy Lewis Hall',
    external: true,
  },
  {
    title: 'Serve as Mentors',
    description: 'Guide USC Price students as they develop actionable strategies.',
    action: 'Contact Us',
    href: 'https://sites.usc.edu/sunstone-price-challenge/contact/',
    image: '/usc-challenge/get-involved-mentors.jpg',
    imageAlt:
      'Mentor greeting a participant during a collaborative USC Price event',
    external: true,
  },
]

const relatedPrograms = [
  {
    title: 'USC Sol Price School of Public Policy',
    description: 'Learn about urban planning, public policy, and management.',
    href: 'https://priceschool.usc.edu/',
    icon: GraduationCap,
  },
  {
    title: 'City/County Management Fellowship Program',
    description: 'Develop future city and county leaders.',
    href: 'https://priceschool.usc.edu/academics/masters/master-of-public-administration-mpa/city-county-management-fellowship/',
    icon: Users,
  },
  {
    title: 'Sunstone Economic Development @ USC Price',
    description: 'Drive economic growth through innovation.',
    href: 'https://sites.usc.edu/sunstone-price-challenge/',
    icon: Briefcase,
  },
]

const eventAlbumPhotos: EventAlbumPhoto[] = [
  {
    id: '4th-student-mixer',
    caption: '4th Sunstone Challenge Student Mixer',
    image: '/events-gallery/4th-sunstone-challenge-student-mixer.jpg',
    href: 'https://www.flickr.com/photos/uscsppd/albums/72177720329345232/',
  },
  {
    id: '4th-final-pitch',
    caption: '4th Sunstone Challenge Final Pitch',
    image: '/events-gallery/4th-sunstone-challenge-final-pitch.jpg',
    href: 'https://www.flickr.com/photos/uscsppd/albums/72177720333388205',
  },
  {
    id: '3rd-final-pitch',
    caption: '3rd Sunstone Challenge Final Pitch',
    image: '/events-gallery/3rd-sunstone-challenge-final-pitch.jpg',
    href: 'https://www.flickr.com/photos/uscsppd/albums/72177720325266996/',
  },
  {
    id: '2nd-final-pitch',
    caption: '2nd Sunstone Challenge Final Pitch',
    image: '/events-gallery/2nd-sunstone-challenge-final-pitch.jpg',
    href: 'https://www.flickr.com/photos/uscsppd/albums/72177720316163248/',
  },
  {
    id: '1st-final-pitch',
    caption: '1st Sunstone Challenge Final Pitch',
    image: '/events-gallery/1st-sunstone-challenge-final-pitch.jpg',
    href: 'https://www.flickr.com/photos/uscsppd/albums/72177720307859492/',
  },
]

export default function UscPricePartnershipPage() {
  const programYears = getProgramHistoryYears()

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader darkTop />

      <section className="relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#0F3A63] pb-20 pt-36 text-white sm:pb-24 sm:pt-44 lg:min-h-[780px] lg:pb-28">
        <Image
          src="/usc-challenge/background.jpg"
          alt="Sunstone Economic Development Challenge finalists and judges at USC"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,25,47,0.94)_0%,rgba(15,58,99,0.82)_52%,rgba(15,58,99,0.48)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(70,127,247,0.32),transparent_32%),linear-gradient(180deg,transparent_42%,rgba(15,58,99,0.72)_78%,#0F3A63_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] bg-grid" />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              href="/#usc-challenge"
              className="group mb-9 inline-flex items-center gap-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </Reveal>
          <div className="max-w-4xl">
            <Reveal delay={0.04}>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#a9c8ff]">
                <span className="h-px w-9 bg-[#a9c8ff]/80" />
                USC Price Partnership
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Public ideas. Student insight.{' '}
                <span className="text-[#8db5ff]">Community impact.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="mt-8 max-w-3xl text-pretty text-base leading-[1.8] text-white/82 sm:text-lg">
                The Sunstone Economic Development Challenge @ USC Price is a
                partnership between the USC Price City/County Management
                Fellowship (CMF) Program, the USC Price School of Public
                Policy, and Sunstone Cities. Sunstone Cities serves as the
                Challenge’s economic development partner, while the Sunstone
                Community Fund (SCF) supports the initiative through a
                five-year grant.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="https://sites.usc.edu/sunstone-price-challenge/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_18px_42px_-14px_rgba(70,127,247,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                >
                  Learn more
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#history"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/8 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/55 hover:bg-white/14"
                >
                  Explore program history
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-14 border-b border-border bg-[#0F3A63] pb-14 sm:-mt-16 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger
            className="grid overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_24px_70px_-38px_rgba(4,25,47,0.65)] backdrop-blur-xl md:grid-cols-3"
            staggerChildren={0.12}
          >
            {stats.map((stat) => (
              <StaggerItem
                key={stat.label}
                className="relative border-b border-[#dbe5f5] bg-[#f7f9fe]/70 px-7 py-8 last:border-b-0 sm:px-9 sm:py-9 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-5xl font-semibold tracking-tight text-[#0F3A63] sm:text-6xl"
                />
                <p className="mt-3 max-w-[16rem] text-sm font-semibold leading-6 text-muted-foreground sm:text-base">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(70,127,247,0.1),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-9 bg-primary/70" />
              Participate
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl">
              How To Get Involved
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Bring a community challenge, support the program, or help guide
              the next generation of public-sector leaders.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
            staggerChildren={0.1}
          >
            {involvement.map((item) => (
              <StaggerItem key={item.title}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_45px_-36px_rgba(15,58,99,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/35">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="group/link mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                    >
                      {item.action}
                      {item.external ? (
                        <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      ) : (
                        <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                      )}
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="history" className="relative overflow-hidden py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.11] bg-grid" />
        <div className="pointer-events-none absolute -right-48 top-20 size-[32rem] rounded-full bg-primary/10 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-9 bg-primary/70" />
              Program History
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl">
              Four years of local government collaboration
            </h2>
          </Reveal>

          <div className="mt-14 space-y-4">
            {programYears.map((year, index) => (
              <Reveal key={year.years} delay={index * 0.04}>
                <article className="grid gap-8 rounded-2xl border border-border bg-muted p-7 transition-colors duration-500 hover:bg-white sm:p-9 lg:grid-cols-[0.35fr_0.65fr] lg:gap-14">
                  <div>
                    <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                      {year.years}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                      {year.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {year.years} Local Government Clients
                    </p>
                    <Stagger
                      className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3"
                      staggerChildren={0.05}
                    >
                      {year.clients.map((client) => {
                        const logoTile = (
                          <div className="flex h-32 items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-[0_20px_42px_-30px_rgba(15,58,99,0.35)] transition-transform duration-500 group-hover:-translate-y-1 sm:h-36">
                            <div className="relative h-16 w-32 sm:h-20 sm:w-40">
                              <Image
                                src={client.logo}
                                alt={`${client.name} logo`}
                                fill
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 160px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )

                        return (
                          <StaggerItem key={client.name}>
                            <a
                              href={client.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Visit ${client.name}'s economic development website`}
                              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                              {logoTile}
                              <p className="mt-3 text-center text-xs font-medium leading-5 text-muted-foreground transition-colors group-hover:text-primary">
                                {client.name}
                              </p>
                            </a>
                          </StaggerItem>
                        )
                      })}
                    </Stagger>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-surface-dark py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9dc1ff]">
              <span className="h-px w-9 bg-[#9dc1ff]/70" />
              Gallery
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl">
              Event Album
            </h2>
          </Reveal>

          <EventAlbumCarousel photos={eventAlbumPhotos} />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-9 bg-primary/70" />
              Related Programs
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl">
              Continue exploring the partnership
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 lg:grid-cols-3" staggerChildren={0.1}>
            {relatedPrograms.map((program) => {
              const Icon = program.icon
              return (
                <StaggerItem key={program.title}>
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-[#f6f8fd] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-white hover:shadow-[0_22px_55px_-38px_rgba(15,58,99,0.5)] sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[#e6eefc] text-[#0F3A63]">
                        <Icon className="size-6" />
                      </div>
                      <ArrowUpRight className="size-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="mt-7 font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      {program.description}
                    </p>
                  </a>
                </StaggerItem>
              )
            })}
          </Stagger>

          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Follow the City/County Management Fellowship for Challenge
                updates.
              </p>
              <a
                href="https://www.instagram.com/usccmf/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-2 font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <rect
                    height="17"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    width="17"
                    x="3.5"
                    y="3.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.35" cy="6.7" fill="currentColor" r="1" />
                </svg>
                @usccmf
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter showFaq={false} />
    </main>
  )
}
