'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Download, RotateCcw } from 'lucide-react'
import type { SubService } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function ServiceFlipCard({ service }: { service: SubService }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="h-[35rem] [perspective:1400px] sm:h-[36rem]">
      <div
        className={cn(
          'relative h-full w-full transform-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none',
          isFlipped && '[transform:rotateY(180deg)]',
        )}
      >
        <article
          className={cn(
            'absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_45px_-35px_rgba(47,95,212,0.4)] [backface-visibility:hidden]',
            isFlipped && 'pointer-events-none',
          )}
          aria-hidden={isFlipped}
        >
          <div className="relative h-56 shrink-0 overflow-hidden bg-muted sm:h-60">
            <Image
              src={service.image ?? '/placeholder.svg'}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 360px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
          </div>

          <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 p-6 sm:p-7">
            <h4 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.7rem]">
              {service.title}
            </h4>
            <p className="min-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] sm:text-[0.95rem] xl:[-webkit-line-clamp:5]">
              {service.description}
            </p>

            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="group inline-flex w-fit items-center gap-2 self-end text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore deliverables
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </button>
          </div>
        </article>

        <article
          className={cn(
            'absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-primary/25 bg-card p-6 shadow-[0_18px_45px_-35px_rgba(47,95,212,0.4)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-7',
            !isFlipped && 'pointer-events-none',
          )}
          aria-hidden={!isFlipped}
        >
          <div>
            <div>
              <h4 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                {service.title}
              </h4>
            </div>
          </div>

          <div className="mt-7 min-h-0 flex-1 overflow-y-auto border-t border-border pt-5 pr-1">
            <h5 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Featured deliverables
            </h5>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-3 text-sm leading-snug text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {deliverable}
                </li>
              ))}
            </ul>

            {service.extras?.map((extra) => (
              <div key={extra.label} className="mt-5">
                <h5 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {extra.label}
                </h5>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {extra.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
            <a
              href={service.onePager}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Download className="size-4" />
              Download 1-pager
            </a>
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Return to ${service.title} overview`}
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
