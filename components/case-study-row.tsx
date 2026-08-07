import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '@/lib/site-data'

export function CaseStudyRow({
  caseStudies,
}: {
  caseStudies: CaseStudy[]
}) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Case Studies
        </span>
        <a
          href="#news-archive"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
        >
          View all
          <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="marquee-mask -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div className="flex gap-4">
          {caseStudies.map((cs) => (
            <article
              key={cs.id}
              className="flex w-72 shrink-0 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {cs.client}
                </span>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground">
                  {cs.title}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <div className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  {cs.metric}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {cs.metricLabel}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
