import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { NewsCard } from '@/components/news-card'
import { Stagger, StaggerItem } from '@/components/motion/primitives'
import { newsIndex } from '@/lib/news-index'

export function NewsSection() {
  const all = newsIndex

  return (
    <section id="news-archive" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Newsroom"
          title="Insights, reports & announcements"
          highlight="reports"
          description="Perspectives from our advisors on infrastructure, financing, and the future of community growth."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <NewsCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <a
            href="#news"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Browse the full archive
            <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
