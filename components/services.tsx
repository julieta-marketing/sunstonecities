import Link from 'next/link'
import {
  ArrowRightLeft,
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  Megaphone,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CaseStudyAccordion } from '@/components/case-study-accordion'
import { Reveal } from '@/components/motion/primitives'
import { getFeaturedProjectConsultingCaseStudies } from '@/lib/project-consulting-case-studies'
import { getFeaturedProjectFinancingCaseStudies } from '@/lib/project-financing-case-studies'

const consultingServices = [
  { title: 'Staff Augmentation', icon: UsersRound },
  { title: 'Economic Development Strategies', icon: ChartNoAxesCombined },
  { title: 'Marketing and Communications', icon: Megaphone },
]

const financingServices = [
  {
    title: 'Public Infrastructure Financing Solutions (PIFS)',
    icon: Building2,
  },
  { title: 'Bridge to Bond', icon: ArrowRightLeft },
  { title: 'Growth Capital', icon: TrendingUp },
]

export function Services() {
  const visibleConsultingCaseStudies = getFeaturedProjectConsultingCaseStudies(3)
  const visibleFinancingCaseStudies = getFeaturedProjectFinancingCaseStudies(3)

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-transparent py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Services"
          title="Solutions that move communities forward"
          highlight="communities forward"
        />

        {/* 6a. Project Consulting */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <div className="max-w-xl">
              <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Project Consulting
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Strategic expertise and hands-on support to strengthen capacity
                and drive results.
              </p>
              <Link
                href="/services/project-consulting"
                className="shine group mt-7 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-8px_rgba(78,114,217,0.6)] ring-1 ring-primary-dark/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_18px_40px_-10px_rgba(78,114,217,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Learn More
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <ul
            aria-label="Project Consulting services"
            className="border-t border-foreground/20"
          >
            {consultingServices.map(({ title, icon: Icon }, i) => (
              <Reveal
                key={title}
                as="li"
                delay={i * 0.05}
                y={16}
                className="flex items-center gap-4 border-b border-foreground/20 py-5 sm:gap-5 sm:py-6"
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary sm:size-6"
                  strokeWidth={1.8}
                />
                <span className="block text-lg font-medium leading-snug text-foreground sm:text-xl">
                  {title}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Consulting Case Studies */}
        <div className="mt-10 sm:mt-12">
          <Reveal delay={0.05}>
            <div>
              <CaseStudyAccordion caseStudies={visibleConsultingCaseStudies} />
            </div>
          </Reveal>
        </div>

        <div
          aria-hidden="true"
          className="mt-24 flex items-center gap-3 sm:mt-32 lg:mt-36"
        >
          <span className="h-px w-14 bg-primary/35 sm:w-20" />
          <span className="size-2 rotate-45 border border-primary/50 bg-primary/10" />
          <span className="h-px w-8 bg-primary/20 sm:w-12" />
        </div>

        {/* 6b. Project Financing */}
        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <div className="max-w-xl">
              <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Project Financing
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Strategic expertise and hands-on support to strengthen capacity
                and drive results.
              </p>
              <Link
                href="/services/project-financing"
                className="shine group mt-7 inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-8px_rgba(78,114,217,0.6)] ring-1 ring-primary-dark/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_18px_40px_-10px_rgba(78,114,217,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Learn More
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <ul
            aria-label="Project Financing services"
            className="border-t border-foreground/20"
          >
            {financingServices.map(({ title, icon: Icon }, i) => (
              <Reveal
                key={title}
                as="li"
                delay={i * 0.05}
                y={16}
                className="flex items-center gap-4 border-b border-foreground/20 py-5 sm:gap-5 sm:py-6"
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary sm:size-6"
                  strokeWidth={1.8}
                />
                <span className="block text-lg font-medium leading-snug text-foreground sm:text-xl">
                  {title}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Financing Case Studies */}
        <div className="mt-10 sm:mt-12">
          <Reveal delay={0.05}>
            <div>
              <CaseStudyAccordion caseStudies={visibleFinancingCaseStudies} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
