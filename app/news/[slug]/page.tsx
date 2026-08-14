import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getNewsArticle, newsArticles } from '@/lib/news-articles'
import { cn } from '@/lib/utils'

/* Shared with InfoPanel ("News Briefs") so both content cards stay in sync. */
const articleCardClass =
  'rounded-lg border border-border bg-card px-5 py-8 shadow-[0_24px_70px_-56px_rgba(15,58,99,0.45)] sm:px-8 lg:px-10'
const articleListItemClass = 'flex gap-3 text-base leading-relaxed text-muted-foreground'
const inlineLinkClass = 'font-medium text-primary underline-offset-4 hover:underline'
const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>
}

function renderInlineLinks(text: string) {
  const parts = []
  let lastIndex = 0

  for (const match of text.matchAll(markdownLinkPattern)) {
    const [raw, label, href] = match
    const index = match.index ?? 0

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index))
    }

    parts.push(
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={inlineLinkClass}
      >
        {renderInlineLabel(label)}
      </a>,
    )

    lastIndex = index + raw.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length ? parts : text
}

function renderInlineLabel(label: string) {
  const boldMatch = label.match(/^\*\*(.+)\*\*$/)

  if (boldMatch) {
    return <strong>{boldMatch[1]}</strong>
  }

  return label
}

function stripInlineMarkdown(text: string) {
  return text.replace(markdownLinkPattern, '$1').replace(/\*\*/g, '')
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) {
    return {
      title: 'News Article | Sunstone Cities',
    }
  }

  return {
    title: `${article.title} | Sunstone Cities`,
    description: stripInlineMarkdown(article.deck),
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) notFound()

  const relatedArticles = newsArticles.filter((item) => item.slug !== article.slug).slice(0, 3)
  const newsBriefs = article.newsBriefs ?? []
  const hasNewsBriefs = newsBriefs.length > 0

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <article className="relative overflow-hidden">
          <section className="relative overflow-hidden bg-surface pt-32 pb-0 sm:pt-36 lg:pt-40">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                Back to news
              </Link>

              <div className="mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CalendarDays className="size-4 text-primary" />
                    {article.date}
                  </span>
                </div>

                <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
                <p className="mt-6 max-w-4xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                  {renderInlineLinks(article.deck)}
                </p>
              </div>
            </div>

            <div className="relative z-10 mx-auto mt-12 max-w-6xl px-5 sm:px-8">
              <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_16px_36px_-30px_rgba(15,58,99,0.28)]">
                <div className="relative aspect-[16/9] min-h-[18rem] sm:min-h-[24rem] lg:aspect-[21/9]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1152px"
                    className="object-cover"
                  />
                </div>
                {article.imageCaption && (
                  <figcaption className="border-t border-border bg-card/95 px-5 py-3 text-xs text-muted-foreground sm:px-6">
                    {article.imageCaption}
                  </figcaption>
                )}
              </figure>
            </div>
          </section>

          <section className="pt-10 pb-14 sm:pt-12 sm:pb-18">
            <div
              className={cn(
                'mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:items-start',
                hasNewsBriefs &&
                  'lg:grid-cols-[minmax(0,0.72fr)_minmax(17rem,0.28fr)]',
              )}
            >
              <div className={cn(articleCardClass, hasNewsBriefs && 'order-2 lg:order-1')}>
                {article.contentImage && (
                  <figure className="mb-10 overflow-hidden rounded-lg border border-border bg-muted">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={article.contentImage}
                        alt={`${article.title} content image`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                )}

                <div className="space-y-12">
                  {article.sections.map((section) => (
                    <section key={section.heading} className="space-y-5">
                      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {section.heading}
                      </h2>

                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]"
                        >
                          {renderInlineLinks(paragraph)}
                        </p>
                      ))}

                      {section.bullets && (
                        <ul className="space-y-3 pt-1">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className={articleListItemClass}>
                              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{renderInlineLinks(bullet)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </div>

              {hasNewsBriefs && (
                <aside className="order-1 space-y-5 lg:order-2 lg:sticky lg:top-28">
                  <InfoPanel title="News Briefs" items={newsBriefs} />
                </aside>
              )}
            </div>
          </section>

          <section className="border-t border-border bg-surface px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    More News
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Continue reading
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  View all news
                  <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_50px_-32px_rgba(49,80,158,0.3)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {item.date}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {stripInlineMarkdown(item.deck)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter showFaq={false} />
    </div>
  )
}

function InfoPanel({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <section className={articleCardClass}>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className={articleListItemClass}>
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="break-words">{renderInlineLinks(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
