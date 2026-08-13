'use client'

import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'

export interface CaseStudySlide {
  id: string
  title: string
  image: string
  imageAlt: string
  imagePosition?: string
  location?: string
  services: string[]
  challenge: string
  solution: string
  outcomes: string[]
}

export function CaseStudyCarousel({
  caseStudies,
  ariaLabel = 'Case studies',
}: {
  caseStudies: CaseStudySlide[]
  ariaLabel?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLElement | null>>([])
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const pointerIsDown = useRef(false)
  const hasDragged = useRef(false)
  const frame = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current
      const slide = slideRefs.current[index]
      if (!track || !slide) return

      track.scrollTo({ left: slide.offsetLeft, behavior })
      setActiveIndex(index)
    },
    [],
  )

  const syncToHash = useCallback(() => {
    const hash = window.location.hash.slice(1)
    const requestedIndex = caseStudies.findIndex(
      (study) => `case-${study.id}` === hash,
    )

    if (requestedIndex < 0) return undefined

    const animationFrame = window.requestAnimationFrame(() => {
      scrollToIndex(requestedIndex, 'auto')
      document
        .getElementById('case-studies')
        ?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [caseStudies, scrollToIndex])

  useEffect(() => {
    let cancelInitialHashSync = syncToHash()

    const handleHashChange = () => {
      cancelInitialHashSync?.()
      cancelInitialHashSync = syncToHash()
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      cancelInitialHashSync?.()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [syncToHash])

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex(nearestIndex)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(() => {
        updateActiveIndex()
        frame.current = null
      })
    }

    const handleResize = () => scrollToIndex(activeIndex, 'auto')

    track.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      track.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [activeIndex, scrollToIndex, updateActiveIndex])

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
    if (Math.abs(distance) < 6 && !hasDragged.current) return

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
      updateActiveIndex()
      const track = trackRef.current
      if (!track) return

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })
      scrollToIndex(nearestIndex)
      hasDragged.current = false
    }, 0)
  }

  if (!caseStudies.length) return null

  return (
    <div id="case-studies" className="mt-10 scroll-mt-28">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p
          className="font-display text-sm font-semibold tracking-[0.12em] text-[#0F3A63]"
          aria-live="polite"
        >
          {String(activeIndex + 1).padStart(2, '0')}
          <span className="mx-2 text-[#0F3A63]/30">/</span>
          {String(caseStudies.length).padStart(2, '0')}
        </p>

        <div className="flex items-center gap-2" role="group" aria-label={`${ariaLabel} controls`}>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous case study"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#0F3A63]/15 bg-white text-[#0F3A63] shadow-sm transition-[border-color,color,transform,opacity] hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === caseStudies.length - 1}
            aria-label="Next case study"
            className="inline-flex size-11 items-center justify-center rounded-full bg-[#0F3A63] text-white shadow-[0_12px_28px_-14px_rgba(15,58,99,0.8)] transition-[background-color,transform,opacity] hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' && activeIndex > 0) {
            event.preventDefault()
            scrollToIndex(activeIndex - 1)
          }
          if (
            event.key === 'ArrowRight' &&
            activeIndex < caseStudies.length - 1
          ) {
            event.preventDefault()
            scrollToIndex(activeIndex + 1)
          }
        }}
        onPointerDown={startDragging}
        onPointerMove={drag}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onDragStart={(event) => event.preventDefault()}
        className={`no-scrollbar flex w-full gap-5 overflow-x-auto overscroll-x-contain rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:gap-6 ${
          isDragging
            ? 'cursor-grabbing select-none snap-none'
            : 'cursor-grab snap-x snap-mandatory scroll-smooth'
        }`}
      >
        {caseStudies.map((study, index) => (
          <article
            key={study.title}
            id={`case-${study.id}`}
            ref={(node) => {
              slideRefs.current[index] = node
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${caseStudies.length}: ${study.title}`}
            className="grid w-full shrink-0 snap-start scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#0F3A63]/12 bg-white shadow-[0_26px_70px_-42px_rgba(15,58,99,0.5)] lg:grid-cols-[0.46fr_0.54fr]"
          >
            <div className="group/image relative min-h-72 overflow-hidden bg-[#d9dce1] sm:min-h-[25rem] lg:min-h-[34rem]">
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 43vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
                style={{ objectPosition: study.imagePosition ?? 'center' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F3A63]/55 via-transparent to-black/5" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-display text-[0.65rem] font-bold tracking-[0.18em] text-[#0F3A63] backdrop-blur-sm sm:left-6 sm:top-6">
                CASE STUDY
              </span>
              <span className="absolute bottom-5 right-6 font-display text-6xl font-semibold tracking-tighter text-white/90 sm:text-7xl">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
              <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {study.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {study.location && (
                  <span className="rounded-full border border-primary/20 bg-[#edf4ff] px-3 py-1.5 text-xs font-semibold text-[#0F3A63]">
                    {study.location}
                  </span>
                )}
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-primary/20 bg-[#edf4ff] px-3 py-1.5 text-xs font-semibold text-[#0F3A63]"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4">
                <div className="border-l-2 border-primary bg-[#f3f7fb] px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Challenge
                  </p>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.75] text-foreground/75">
                    {study.challenge}
                  </p>
                </div>
                <div className="border-l-2 border-[#79B3DE] bg-[#f6f9fc] px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
                    Solution
                  </p>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.75] text-foreground/75">
                    {study.solution}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2" role="group" aria-label="Choose a case study">
          {caseStudies.map((study, index) => (
            <button
              key={study.title}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`View ${study.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-[#0F3A63]/18 hover:bg-[#0F3A63]/35'
              }`}
            />
          ))}
        </div>
        <p className="text-xs font-medium text-muted-foreground">
          Swipe, drag, or use the arrows to explore
        </p>
      </div>
    </div>
  )
}
