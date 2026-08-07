import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Reveal,
  Stagger,
  StaggerItem,
} from '@/components/motion/primitives'

const challengeLogos = [
  {
    name: 'City/County Management Fellowship',
    logo: '/usc-challenge/cmf.webp',
  },
  {
    name: 'Sunstone Cities',
    logo: '/usc-challenge/sunstone-cities-logo-horiz-cropped.png',
  },
  {
    name: 'Sunstone Community Fund',
    logo: '/usc-challenge/sunstone-community-fund.png',
  },
  {
    name: 'USC Price School of Public Policy',
    logo: '/usc-challenge/usc-price.png',
  },
]

export function UscSunstoneChallenge() {
  return (
    <section
      id="usc-challenge"
      className="relative isolate overflow-hidden bg-transparent pb-24 pt-10 text-foreground sm:pb-28 sm:pt-12 lg:pt-14"
    >
      <Image
        src="/usc-challenge/background.jpg"
        alt="Sunstone Economic Development Challenge finalists and judges at USC"
        fill
        sizes="100vw"
        quality={95}
        className="-z-30 object-cover object-center opacity-60 saturate-[0.82]"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(231,237,245,0.98)_0%,rgba(231,237,245,0.92)_42%,rgba(231,237,245,0.62)_58%,rgba(231,237,245,0.3)_78%,rgba(231,237,245,0.16)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(231,237,245,0.08)_0%,rgba(231,237,245,0.4)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-52 bg-[linear-gradient(180deg,#e7edf5_0%,rgba(231,237,245,0.96)_24%,rgba(231,237,245,0.7)_50%,rgba(231,237,245,0.24)_78%,transparent_100%)] sm:h-64" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div>
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                USC Sunstone Challenge
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-[1.75] text-muted-foreground sm:text-lg">
                The Sunstone Economic Development Challenge @ USC Price pairs
                public policy students with local governments to develop
                practical strategies that attract small businesses, create
                jobs, and expand opportunity.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <Link
                href="/usc-price-partnership"
                className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#e7edf5]"
              >
                Explore the Challenge
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

        </div>

        <Reveal delay={0.08}>
          <div className="mt-16 sm:mt-20">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Challenge Partners
              </p>
            </div>

            <Stagger
              className="grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-4 sm:gap-8"
              staggerChildren={0.08}
              delayChildren={0.05}
            >
              {challengeLogos.map((partner) => (
                <StaggerItem
                  key={partner.name}
                  className="flex items-center justify-center"
                >
                  <div className="group flex h-24 w-full items-center justify-center sm:h-28">
                    <div className="flex h-20 w-full max-w-[15rem] items-center justify-center rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_18px_42px_-26px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-24 sm:px-5">
                      <div className="relative h-12 w-full shrink-0 sm:h-14">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          fill
                          sizes="(max-width: 640px) 40vw, 220px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Follow the City/County Management Fellowship for Challenge
              updates.
            </p>
            <a
              href="https://www.instagram.com/usccmf/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#e7edf5]"
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
  )
}
