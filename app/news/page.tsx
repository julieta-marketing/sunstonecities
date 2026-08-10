import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { newsArticles } from '@/lib/news-articles'

export const metadata: Metadata = {
  title: 'News | Sunstone Cities',
  description:
    'Browse Sunstone Cities articles, project insights, and public-private partnership updates.',
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
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
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  All articles
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Browse the full archive
                </h2>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {newsArticles.length} articles
              </p>
            </div>

            <div className="grid gap-6">
              {newsArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_70px_-54px_rgba(15,58,99,0.45)] transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_30px_80px_-52px_rgba(49,128,246,0.28)] lg:grid-cols-[0.42fr_0.58fr]"
                >
                  <div className="relative min-h-[235px] overflow-hidden bg-muted lg:min-h-[310px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      priority={index === 0}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-primary/10" />
                  </div>

                  <article className="flex min-h-[300px] flex-col justify-between p-7 sm:p-9 lg:p-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          {article.category}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          <CalendarDays className="size-4" />
                          {article.date}
                        </span>
                      </div>

                      <h3 className="mt-7 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                        {article.title}
                      </h3>
                      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                        {article.deck}
                      </p>
                    </div>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      Read article
                      <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter showFaq={false} />
    </div>
  )
}
