import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  FileDown,
} from 'lucide-react'
import { GlowOrb } from '@/components/decor'
import { Reveal } from '@/components/motion/primitives'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { CaseStudyCarousel } from '@/components/case-study-carousel'

export const metadata: Metadata = {
  title: 'Project Financing | Sunstone Cities',
  description:
    'Explore Sunstone Cities project financing solutions, capital programs, and completed infrastructure and economic development projects.',
}

const onePagers = {
  bridgeToBond: '/one-pagers/bridge-to-bond.pdf',
}

const financingDisclaimer =
  'Sunstone Cities partners with a network of trusted non-bank private capital providers to connect clients with flexible financing solutions tailored to their project and investment needs. Financing options are offered through independent capital partners and are subject to underwriting, approval, and applicable terms and conditions.'

const pifsDeliverables = [
  'Capital stack design and feasibility analysis',
  'Special district and value-capture structuring',
  'Grant and federal funding alignment',
  'Debt capacity and affordability modeling',
]

const bridgeToBondDeliverables = [
  'Interim liquidity and bridge facility structuring',
  'Bond readiness and rating strategy',
  'Refinancing and takeout planning',
  'Cash-flow and timeline modeling',
]

const growthCapitalDeliverables = [
  'Capital sourcing and lender introductions',
  'Term sheet review and negotiation support',
  'Covenant and structure advisory',
]

const loanTypes = [
  'SBA Lending',
  'Working Capital Financing',
  'Equipment Financing',
  'Construction Loans',
  'Bridge Loans',
  'USDA Financing',
  'Infrastructure Financing',
  'PACE Financing',
  'FDI',
]

const constructionProjectTypes = [
  'Rural Construction',
  'New Construction',
  'Hotels',
  'Infrastructure',
  'Hospitals & Community Facilities',
  'Broadband Networks',
  'Manufacturing Facilities',
  'Mixed-Use Development',
  'Renewable Energy',
]

const businessProjectTypes = [
  'Working Capital',
  'Equipment Purchases',
  'Business Expansion',
  'Real Estate Acquisition',
  'Line of Credit',
  'Debt Refinance',
]

const caseStudies = [
  {
    id: 'fin1',
    title: 'UAB Medical West Hospital',
    location: 'Alabama',
    services: ['Public Infrastructure Financing Solutions'],
    image:
      '/case-studies/project-financing/uab-medical-west-hospital.jpg',
    imageAlt: 'UAB Medical West Hospital exterior',
    imagePosition: 'center',
    challenge:
      'The project required a complex financing structure to support the completion of a new 200-bed hospital, medical office building, and parking structure that would replace an aging healthcare facility and expand access to care for rural communities.',
    solution:
      'Project financing included a combination of EB-5 capital, bank financing, and federal loan guarantees to support the development of a new 200-bed hospital, medical office building, and parking structure.',
    outcomes: [
      'Supported a healthcare infrastructure project valued at over $425 million',
      'Facilitated $8.8 million in EB-5 financing',
      'Helped create 497 permanent jobs',
      'Expanded healthcare access for rural communities',
    ],
  },
  {
    id: 'fin2',
    title: "Gold’s Hampton Inn",
    location: 'Nebraska',
    services: ['Public Infrastructure Financing Solutions'],
    image: '/case-studies/project-financing/golds-hampton-inn.jpg',
    imageAlt: 'Gold’s Hampton Inn hotel exterior in downtown Lincoln',
    imagePosition: 'center',
    challenge:
      "The historic Gold's Building required significant redevelopment to transform the underutilized property into a modern hospitality destination that could support downtown Lincoln's growing visitor and business economy.",
    solution:
      'Project financing supported the adaptive reuse and redevelopment of the historic building into a branded Hampton Inn by Hilton hotel, preserving a key downtown asset while introducing new lodging accommodations and visitor amenities.',
    outcomes: [
      'Redeveloped a historic building into a 115-room Hampton Inn',
      'Expanded downtown lodging capacity',
      'Supported tourism and economic activity',
      'Revitalized an underutilized property',
    ],
  },
  {
    id: 'fin3',
    title: 'Marcella Landing at Deer Valley',
    location: 'Utah',
    services: ['Infrastructure Financing Solutions'],
    image:
      '/case-studies/project-financing/marcella-landing-deer-valley.png',
    imageAlt:
      'Mountain resort development at Marcella Landing in Deer Valley',
    imagePosition: 'center',
    challenge:
      'The project required a financing structure to support the development of a mixed-use resort condominium community, including residential units, hospitality amenities, and supporting infrastructure improvements.',
    solution:
      'Provided a financing package combining senior construction financing and C-PACE funding to support project development and infrastructure improvements.',
    outcomes: [
      'Closed a $115.4 million financing package',
      'Supported the development of a 118-unit resort condominium community',
      'Funded infrastructure and vertical construction',
      'Advanced energy-efficient building improvements',
    ],
  },
]

export default function ProjectFinancingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#eaf3fb] via-white to-[#edf8fb] pb-20 pt-36 sm:pb-24 sm:pt-44">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-35" />
          <div className="pointer-events-none absolute -right-24 top-10 size-[30rem] rounded-full bg-[#1D6EAF]/12 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <Link
              href="/#services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to services
            </Link>

            <div className="mt-12">
              <div>
                <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
                  Project Financing
                </h1>
                <p className="mt-6 max-w-none text-lg leading-relaxed text-muted-foreground md:whitespace-nowrap">
                  Innovative financing solutions to fund infrastructure and
                  economic development projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div id="service-deliverables" className="scroll-mt-28">
          <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
            <GlowOrb className="-right-24 -top-24 size-80 bg-primary/10 sm:size-96" />
            <GlowOrb className="-bottom-24 -left-24 size-80 bg-primary/10 sm:size-96" />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="lg:order-1">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <Image
                      src="/service-public-infrastructure-financing.jpg"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="lg:order-2">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Public Infrastructure Financing Solutions (PIFS)
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Accelerating critical public infrastructure projects
                    through innovative financing solutions.
                  </p>

                  <p className="mt-8 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Featured Deliverables
                  </p>
                  <ul className="mt-4 space-y-3">
                    {pifsDeliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/#start-a-conversation"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    Contact us
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="relative isolate overflow-hidden border-t border-border py-16 sm:py-20 lg:py-24">
            <GlowOrb className="-right-24 -top-24 size-80 bg-primary/10 sm:size-96" />
            <GlowOrb className="-bottom-24 -left-24 size-80 bg-primary/10 sm:size-96" />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="lg:order-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <Image
                      src="/service-bridge-to-bond-long-beach.jpg"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="lg:order-1">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Bridge to Bond
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Bridging early-stage infrastructure financing to permanent
                    long-term solutions so municipalities can build now, not
                    later.
                  </p>

                  <p className="mt-8 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Featured Deliverables
                  </p>
                  <ul className="mt-4 space-y-3">
                    {bridgeToBondDeliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={onePagers.bridgeToBond}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    <FileDown className="size-4" />
                    View 1-pager
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="relative isolate overflow-hidden border-t border-border py-16 sm:py-20 lg:py-24">
            <GlowOrb className="-right-24 -top-24 size-80 bg-primary/10 sm:size-96" />
            <GlowOrb className="-bottom-24 -left-24 size-80 bg-primary/10 sm:size-96" />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <Reveal className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted lg:aspect-auto lg:h-full lg:min-h-[26rem]">
                    <Image
                      src="/service-growth-capital-long-beach.jpg"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Growth Capital
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Flexible capital solutions for growing businesses and
                    economic development projects.
                  </p>

                  <div className="mt-8">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                      Featured Deliverables
                    </p>
                    <ul className="mt-4 space-y-3">
                      {growthCapitalDeliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/#start-a-conversation"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    Contact us
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>

              <div className="mt-10 border-l-2 border-primary/40 bg-[#f4f7fa] px-5 py-4 sm:px-6">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {financingDisclaimer}
                </p>
              </div>
            </div>
          </section>

          <section className="relative isolate overflow-hidden border-t border-border py-16 sm:py-20 lg:py-24">
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <Reveal className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Loan Types
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {loanTypes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/15 bg-[#f3f6fb] px-3 py-1.5 text-xs font-semibold text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Construction & Project Financing
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {constructionProjectTypes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/15 bg-[#f3f6fb] px-3 py-1.5 text-xs font-semibold text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Business & SBA Financing
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {businessProjectTypes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/15 bg-[#f3f6fb] px-3 py-1.5 text-xs font-semibold text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>

        <section className="overflow-hidden border-y border-border bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Case Studies
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Financing outcomes built for lasting impact
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:justify-self-end">
                Explore how tailored financing structures have advanced
                healthcare, hospitality, infrastructure, and community-serving
                development.
              </p>
            </div>

            <CaseStudyCarousel
              caseStudies={caseStudies}
              ariaLabel="Project Financing case studies"
            />

            <div className="mt-10 border-l-2 border-primary/40 bg-[#f4f7fa] px-5 py-4 sm:px-6">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {financingDisclaimer}
              </p>
            </div>
          </div>
        </section>

        <section id="start-a-conversation" className="scroll-mt-28 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="overflow-hidden rounded-2xl bg-[#0F3A63] px-6 py-12 text-white sm:px-12 sm:py-14">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9cc8ee]">
                    Start a Conversation
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    Ready to move your project forward?
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/75">
                    Tell us about your project, timing, and capital needs.
                    We&apos;ll help identify a practical path to funding and
                    delivery.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="group inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0F3A63] transition-transform hover:-translate-y-0.5"
                >
                  Contact Us
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter showFaq={false} />
    </div>
  )
}
