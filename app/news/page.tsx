import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { NewsArchiveSearch } from '@/components/news-archive-search'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { newsIndex } from '@/lib/news-index'

export const metadata: Metadata = {
  title: 'News | Sunstone Cities',
  description:
    'Browse Sunstone Cities articles, project insights, and public-private partnership updates.',
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-surface pt-32 pb-16 sm:pt-36 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="pointer-events-none absolute right-0 top-0 size-[28rem] rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              Back to homepage
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                News &amp; insights from Sunstone Cities
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Explore the full collection of articles covering public-private partnerships,
                infrastructure financing, economic development, and community growth.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-background px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <NewsArchiveSearch items={newsIndex} />
          </div>
        </section>
      </main>
      <SiteFooter showFaq={false} />
    </div>
  )
}
