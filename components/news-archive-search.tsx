'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { NewsCard } from '@/components/news-card'
import type { NewsItem } from '@/lib/site-data'

export function NewsArchiveSearch({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = useMemo(() => {
    if (!normalizedQuery) return items

    return items.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery),
    )
  }, [items, normalizedQuery])

  const articleLabel =
    filteredItems.length === 1 ? '1 article' : `${filteredItems.length} articles`

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            All articles
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Browse the full archive
          </h2>
        </div>

        <div className="w-full max-w-md sm:w-auto sm:min-w-80">
          <label htmlFor="news-search" className="sr-only">
            Search news by title
          </label>
          <div className="flex min-h-12 items-center gap-3 rounded-full border border-border bg-card px-4 shadow-[0_18px_45px_-34px_rgba(15,58,99,0.45)] transition-colors focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              id="news-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search news by title"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <p className="mt-3 text-right text-sm font-medium text-muted-foreground">
            {articleLabel}
          </p>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((article) => (
            <NewsCard key={article.slug} item={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center">
          <p className="font-display text-2xl font-semibold text-foreground">
            No matching news found
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Try searching with a shorter title keyword.
          </p>
        </div>
      )}
    </>
  )
}
