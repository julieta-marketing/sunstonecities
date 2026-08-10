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
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CaseStudyCarousel } from '@/components/case-study-carousel'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Project Consulting Services | Sunstone Cities',
  description:
    'Explore Sunstone Cities project consulting services, featured deliverables, and case studies for public-sector partners.',
}

const services = [
  {
    title: 'Staff Augmentation',
    description:
      'Experienced professionals integrated into your team to manage research, planning, and outreach on demand.',
    image: '/service-staff-augmentation-brian-coleman.jpg',
    onePager: '/one-pagers/staff-augmentation.pdf',
    deliverables: [
      'Customized Economic Research Reports',
      'Council- or Commission-Ready Memos',
      'Presentation Briefings',
      'Two-sided Handouts for Public or Internal Use',
      'Grant Management and Writing',
    ],
  },
  {
    title: 'Economic Development Strategies',
    description:
      'We support business attraction, strategic planning, innovation ecosystem development, and more.',
    image: '/service-economic-development-strategies-long-beach.jpg',
    onePager: '/one-pagers/economic-development-strategies.pdf',
    deliverables: [
      'Economic Strategic Plans',
      'Accelerator Development',
      'Process Improvement Initiatives',
      'Implementation-Ready Reports',
      'Stakeholder Engagement/SWOT Analysis',
      'Market Analysis',
      'BID Formation',
    ],
  },
  {
    title: 'Marketing & Communications',
    description:
      'We help cities communicate initiatives, engage stakeholders, and strengthen awareness through strategic marketing and public outreach.',
    image: '/service-marketing-communications.jpg',
    deliverables: [
      'Communication Plans',
      'Industry Events & Ecosystem Development',
      'Marketing Materials',
    ],
  },
]

const caseStudies = [
  {
    id: 'cons1',
    title: 'City of Anaheim',
    image:
      '/case-studies/project-consulting/anaheim-convention-center.jpg',
    imageAlt: 'Anaheim Convention Center framed by palm trees',
    imagePosition: 'center',
    services: ['Staff Augmentation', 'Economic Development Strategies'],
    challenge:
      'Little Arabia required a formal structure to support business coordination, economic vitality, and long-term district investment.',
    solution:
      'Sunstone Cities worked with local businesses and city leadership to develop a Business Improvement District (BID) framework, including governance recommendations, implementation guidance, and educational resources to support district formation.',
    outcomes: [
      'Established a scalable BID governance model',
      'Improved business coordination and stakeholder alignment',
      'Created tools and resources to support long-term district investment',
      'Positioned the district for sustainable economic growth',
    ],
  },
  {
    id: 'cons2',
    title: 'City of Lakewood',
    image: '/case-studies/project-consulting/lakewood-city-hall.jpg',
    imageAlt: 'Lakewood City Hall exterior',
    imagePosition: 'center',
    services: [
      'Staff Augmentation',
      'Economic Development Strategies',
      'Marketing & Communications',
    ],
    challenge:
      'The City of Lakewood sought a comprehensive economic development roadmap to guide investment, business attraction, workforce development, and long-term economic growth.',
    solution:
      "Sunstone Cities led the development and implementation of the city's Economic Development Strategic Plan through stakeholder engagement, market analysis, and actionable implementation strategies.",
    outcomes: [
      'Established clear economic development priorities',
      'Identified implementation-ready initiatives',
      'Created a five-year strategic roadmap',
      'Increased alignment among public, private, and community stakeholders',
    ],
  },
  {
    id: 'cons3',
    title: 'City of Pasadena',
    image: '/case-studies/project-consulting/pasadena-city-hall.jpg',
    imageAlt: 'Pasadena City Hall and surrounding civic buildings',
    imagePosition: 'center',
    services: ['Economic Development Strategies'],
    challenge:
      'Pasadena sought a modern framework to coordinate economic development efforts across public and private sector partners.',
    solution:
      'Sunstone Cities designed a Public-Private Economic Development Organization (EDO) framework, establishing governance structures, stakeholder roles, and sustainable funding pathways.',
    outcomes: [
      'Formalized public-private collaboration',
      'Increased organizational capacity for economic initiatives',
      'Defined governance and funding structures',
      'Positioned the city for long-term economic competitiveness',
    ],
  },
  {
    id: 'cons4',
    title: "Mayor's Fund for Long Beach",
    image: '/case-studies/project-consulting/long-beach-waterfront.jpg',
    imageAlt: 'Long Beach waterfront, marina, and skyline',
    imagePosition: 'center',
    services: ['Economic Research & Analysis'],
    challenge:
      'Community leaders needed a clear understanding of the economic impact generated by the Long Beach Early Learning Hub and its role in supporting workforce participation.',
    solution:
      'Sunstone Cities conducted an Economic Impact Evaluation using economic modeling, stakeholder surveys, and program analysis to quantify outcomes and identify opportunities for future investment.',
    outcomes: [
      'Delivered data-driven performance insights',
      'Quantified economic and workforce impacts',
      'Improved transparency and accountability',
      'Strengthened the case for continued funding and expansion',
    ],
  },
  {
    id: 'cons5',
    title: 'Opt Health',
    image: '/case-studies/project-consulting/opt-health.png',
    imageAlt: 'Healthcare professional checking a patient’s blood pressure',
    imagePosition: 'center',
    services: ['Staff Augmentation', 'Marketing & Communications'],
    challenge:
      'Opt Health sought to expand adoption among public-sector employers and public safety agencies.',
    solution:
      'Sunstone Cities provided public-sector marketing and business development support, including government outreach, procurement strategy, partnership development, content creation, and CRM management.',
    outcomes: [
      'Expanded engagement with public-sector decision-makers',
      'Increased visibility among government agencies',
      'Strengthened strategic partnerships',
      'Supported public-sector customer acquisition efforts',
    ],
  },
]

export default function ProjectConsultingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#eef4ff] via-white to-[#edf8fb] pb-20 pt-36 sm:pb-24 sm:pt-44">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-35" />
          <div className="pointer-events-none absolute -right-24 top-10 size-[30rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <Link
              href="/#services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to services
            </Link>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.48fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Project Consulting Services
                </p>
                <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
                  Strategic capacity for projects that need to move.
                </h1>
              </div>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Strategic expertise and hands-on support to strengthen capacity
                and drive results.
              </p>
            </div>
          </div>
        </section>

        <div id="service-deliverables" className="scroll-mt-28">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 0
            return (
              <section
                key={service.title}
                className={cn(
                  'relative isolate overflow-hidden py-16 sm:py-20 lg:py-24',
                  index > 0 && 'border-t border-border',
                )}
              >
                {service.title !== 'Economic Development Strategies' && (
                  <>
                    <GlowOrb className="-right-24 -top-24 size-80 bg-primary/10 sm:size-96" />
                    <GlowOrb className="-bottom-24 -left-24 size-80 bg-primary/10 sm:size-96" />
                  </>
                )}

                <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
                  <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={service.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    <div className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
                      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <p className="mt-8 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                        Featured Deliverables
                      </p>
                      <ul className="mt-4 space-y-3">
                        {service.deliverables.map((deliverable) => (
                          <li
                            key={deliverable}
                            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>

                      {service.onePager ? (
                        <a
                          href={service.onePager}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                        >
                          <FileDown className="size-4" />
                          Access 1-pager
                        </a>
                      ) : (
                        <a
                          href={`mailto:contact@sunstonecities.com?subject=${encodeURIComponent(
                            `${service.title} 1-pager`,
                          )}`}
                          className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                        >
                          <FileDown className="size-4" />
                          Access 1-pager
                        </a>
                      )}
                    </div>
                  </Reveal>
                </div>
              </section>
            )
          })}
        </div>

        <section className="overflow-hidden border-y border-border bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Case Studies
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Results built with public-sector partners
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:justify-self-end">
                Expanded capacity, sharpened strategy, deep research, and clear
                communications — together, a complete path from plan to
                implementation.
              </p>
            </div>

            <CaseStudyCarousel
              caseStudies={caseStudies}
              ariaLabel="Project Consulting Services case studies"
            />
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="overflow-hidden rounded-2xl bg-[#0F3A63] px-6 py-12 text-white sm:px-12 sm:py-14">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9cc8ee]">
                    Start a Conversation
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    Ready to strengthen your team&apos;s capacity?
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/75">
                    Tell us what your project needs. We&apos;ll help identify the
                    right expertise, deliverables, and path forward.
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
