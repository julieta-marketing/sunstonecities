'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { NewsCard } from '@/components/news-card'
import { Stagger, StaggerItem } from '@/components/motion/primitives'
import type { NewsItem } from '@/lib/site-data'

export function LatestNews({ items }: { items: NewsItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const pointerIsDown = useRef(false)
  const hasDragged = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateControls = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    setCanScrollLeft(scroller.scrollLeft > 2)
    setCanScrollRight(scroller.scrollLeft < maxScroll - 2)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateControls()
    scroller.addEventListener('scroll', updateControls, { passive: true })
    window.addEventListener('resize', updateControls)

    return () => {
      scroller.removeEventListener('scroll', updateControls)
      window.removeEventListener('resize', updateControls)
    }
  }, [updateControls])

  const scrollGroup = (direction: -1 | 1) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const track = scroller.querySelector<HTMLElement>('.news-carousel-track')
    const card = scroller.querySelector<HTMLElement>('[data-news-slide]')
    if (!track || !card) return

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.getBoundingClientRect().width + gap
    const visibleCards = Math.max(
      1,
      Math.floor((scroller.clientWidth + gap) / step),
    )

    scroller.scrollBy({
      left: direction * visibleCards * step,
      behavior: 'smooth',
    })
  }

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return

    pointerIsDown.current = true
    dragStartX.current = event.clientX
    dragStartScroll.current = event.currentTarget.scrollLeft
    hasDragged.current = false
  }

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerIsDown.current || event.pointerType !== 'mouse') return

    const distance = event.clientX - dragStartX.current
    if (Math.abs(distance) <= 6 && !hasDragged.current) return

    if (!hasDragged.current) {
      hasDragged.current = true
      setIsDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    event.currentTarget.scrollLeft = dragStartScroll.current - distance
  }

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerIsDown.current) return

    pointerIsDown.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
    window.setTimeout(() => {
      hasDragged.current = false
    }, 0)
  }

  return (
    <section
      id="news"
      className="relative overflow-hidden bg-[#e1e6ef] pt-14 pb-16 sm:pt-16 sm:pb-20"
    >
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:linear-gradient(90deg,black,transparent_72%)]"
      />
      <div className="relative w-full">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 sm:flex-row sm:items-end sm:px-8">
          <div>
            <SectionHeading
              label="Latest News"
              title="What we're working on"
              highlight="working on"
            />
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <a
              href="/news"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground"
            >
              View more
              <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
            </a>

            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="News carousel controls"
            >
              <button
                type="button"
                onClick={() => scrollGroup(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous news articles"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollGroup(1)}
                disabled={!canScrollRight}
                aria-label="Next news articles"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onPointerDown={startDragging}
          onPointerMove={drag}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onClickCapture={(event) => {
            if (!hasDragged.current) return
            event.preventDefault()
            event.stopPropagation()
          }}
          onDragStart={(event) => event.preventDefault()}
          className={`no-scrollbar mt-12 w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-5 pb-4 sm:scroll-px-8 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          aria-label="Latest news articles"
        >
          <Stagger
            className="news-carousel-track flex w-max gap-4 px-5 sm:gap-5 sm:px-8"
            once
          >
            {items.map((item) => (
              <StaggerItem
                key={item.id}
                className="w-[calc(100vw-2.5rem)] max-w-[680px] shrink-0 snap-start md:w-[calc((100vw-5.25rem)/2)] xl:w-[38vw]"
              >
                <div data-news-slide>
                  <NewsCard item={item} variant="horizontal" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

      </div>
    </section>
  )
}
