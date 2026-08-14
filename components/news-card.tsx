'use client'

import { useRef, type MouseEvent as ReactMouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { NewsItem } from '@/lib/site-data'
import { cn } from '@/lib/utils'

function stripExcerptMarkup(text: string) {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')
    .replace(/\*\*/g, '')
}

export function NewsCard({
  item,
  variant = 'vertical',
}: {
  item: NewsItem
  variant?: 'vertical' | 'horizontal'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isHorizontal = variant === 'horizontal'

  function onMove(e: ReactMouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={ref}
      onMouseMove={onMove}
      href={`/news/${item.slug}`}
      aria-label={`Read ${item.title}`}
      className={cn(
        'spotlight group flex overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_50px_-24px_rgba(49,80,158,0.35)]',
        isHorizontal
          ? 'h-52 flex-row rounded-2xl sm:h-56 lg:h-60'
          : 'h-full flex-col rounded-3xl',
      )}
    >
      <div
        className={cn(
          'shine relative shrink-0 overflow-hidden',
          isHorizontal
            ? 'w-[44%] min-w-32 max-w-[18rem] sm:w-[46%] lg:max-w-[21rem]'
            : 'aspect-[16/10] w-full',
        )}
      >
        <Image
          src={item.image || '/placeholder.svg'}
          alt={item.title}
          draggable={false}
          fill
          sizes={
            isHorizontal
              ? '(max-width: 640px) 44vw, (max-width: 1200px) 46vw, 336px'
              : '(max-width: 768px) 100vw, 33vw'
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className={cn(
            'absolute inset-0',
            isHorizontal
              ? 'bg-gradient-to-r from-transparent via-transparent to-card/20'
              : 'bg-gradient-to-t from-card/70 via-transparent to-transparent',
          )}
        />
      </div>

      <div
        className={cn(
          'relative z-10 flex min-w-0 flex-1 flex-col',
          isHorizontal ? 'gap-2.5 p-4 sm:gap-3 sm:p-6' : 'gap-3 p-6',
        )}
      >
        {isHorizontal ? (
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-[0.7rem]">
            {item.date}
          </span>
        ) : (
          <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-mint" />
            {item.date}
          </span>
        )}
        <h3
          className={cn(
            'text-pretty font-display font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary',
            isHorizontal ? 'text-base sm:text-xl' : 'text-xl',
          )}
        >
          {item.title}
        </h3>
        {!isHorizontal && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {stripExcerptMarkup(item.excerpt)}
          </p>
        )}
        <span
          className={cn(
            'mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground',
            !isHorizontal && 'pt-3',
          )}
        >
          Read article
          <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
