import { ArrowUpRight, Landmark, Layers3, Route } from 'lucide-react'
import { SectionLabel } from '@/components/section-heading'

const principles = [
  {
    number: '01',
    title: 'Public-side fluency',
    body: 'We understand the realities of city hall—policy, staff capacity, stakeholders, and public timelines.',
    icon: Landmark,
  },
  {
    number: '02',
    title: 'Strategy meets capital',
    body: 'We connect the public plan to practical financing, creating an investable path from the start.',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Senior-led delivery',
    body: 'The advisors shaping the strategy stay engaged through decisions, partnerships, and implementation.',
    icon: Route,
  },
]

const proofPoints = [
  {
    value: '20+',
    label: 'Years of public-sector leadership',
  },
  {
    value: '30+',
    label: 'Public agency partners',
  },
  {
    value: '50+',
    label: 'Industry & community partners',
  },
]

export function AboutStory() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/15 bg-white shadow-[0_32px_90px_-48px_rgba(47,95,212,0.42)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-[30rem] rounded-full bg-primary/9 blur-3xl"
      />

      <div className="relative z-10 border-b border-primary/12 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="relative grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-end lg:gap-16">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#303a59] sm:text-5xl lg:text-[3.8rem]">
              Built for the <span className="text-primary">public side.</span>
            </h2>
          </div>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-[#65708c] sm:text-lg">
            Sunstone Cities brings economic strategy, project financing, and
            hands-on delivery under one roof—so ambitious public plans become
            projects communities can see and use.
          </p>
        </div>
      </div>

      <div className="relative z-10 grid bg-white md:grid-cols-3">
        {principles.map((principle) => {
          const Icon = principle.icon

          return (
            <article
              key={principle.number}
              tabIndex={0}
              className="group relative flex min-h-[320px] flex-col border-primary/12 px-7 py-8 outline-none transition-all duration-500 hover:z-10 hover:-translate-y-1 hover:bg-[#f5f8ff] focus-visible:z-10 focus-visible:-translate-y-1 focus-visible:bg-[#f5f8ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 [&:not(:first-child)]:border-t md:min-h-[350px] md:px-8 md:py-9 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0 lg:px-10 lg:py-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />

              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold tracking-[0.16em] text-primary">
                  {principle.number}
                </span>
                <span className="flex size-11 items-center justify-center rounded-full border border-primary/15 bg-[#eef3ff] text-primary transition-all duration-500 group-hover:rotate-6 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-white group-focus-visible:rotate-6 group-focus-visible:border-primary/30 group-focus-visible:bg-primary group-focus-visible:text-white">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
              </div>

              <div className="mt-auto pt-14">
                <h3 className="max-w-[14rem] text-balance font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#303a59]">
                  {principle.title}
                </h3>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-[#68738e] sm:text-[15px]">
                  {principle.body}
                </p>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="mt-7 size-5 text-primary/35 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:text-primary"
              />
            </article>
          )
        })}
      </div>

      <div className="relative z-10 grid border-t border-primary/12 bg-[#f0f4ff] sm:grid-cols-3">
        {proofPoints.map((point) => (
          <div
            key={point.label}
            className="flex min-h-32 items-center gap-5 border-primary/12 px-7 py-6 [&:not(:first-child)]:border-t sm:min-h-36 sm:px-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0 lg:px-10"
          >
            <span className="font-display text-4xl font-semibold tracking-[-0.05em] text-primary lg:text-5xl">
              {point.value}
            </span>
            <span className="max-w-[9.5rem] text-sm font-medium leading-snug text-[#59647f]">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
