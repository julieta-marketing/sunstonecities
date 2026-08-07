'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'

export interface EventAlbumPhoto {
  id: string
  caption: string
  href: string
  image?: string
}

const TILE_GAP_PX = 16

/* Single tile: real photo when `image` is set and loads, otherwise the
   placeholder. Split out from the carousel since it needs its own
   error-fallback state, which can't live inside a .map() callback. */
function EventAlbumTile({ photo }: { photo: EventAlbumPhoto }) {
  const [errored, setErrored] = useState(false)
  const showImage = Boolean(photo.image) && !errored

  return (
    <a
      href={photo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View photos from ${photo.caption} on Flickr`}
      className="group relative aspect-[4/3] w-56 shrink-0 snap-start overflow-hidden rounded-2xl sm:w-60"
    >
      {showImage ? (
        <Image
          src={photo.image!}
          alt={photo.caption}
          fill
          sizes="240px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          onError={() => setErrored(true)}
        />
      ) : (
        // TODO: replace placeholder with a real photo from this event
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-muted">
          <ImageIcon
            aria-hidden="true"
            className="size-8 text-muted-foreground transition-transform duration-500 ease-out group-hover:scale-110"
            strokeWidth={1.5}
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),transparent)] transition-opacity duration-300 group-hover:opacity-80"
      />
      <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold leading-tight text-white">
        {photo.caption}
      </span>
    </a>
  )
}

/* Horizontally scrolling photo row with scroll-snap and arrow controls.
   Arrow-disabled state is driven directly by scroll position (not a tracked
   tile index) so it stays correct even when most tiles already fit on
   screen and there's little room left to scroll. */
export function EventAlbumCarousel({ photos }: { photos: EventAlbumPhoto[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 1)
    setCanScrollRight(
      track.scrollLeft < track.scrollWidth - track.clientWidth - 1,
    )
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateScrollState()

    const handleScroll = () => {
      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(() => {
        updateScrollState()
        frame.current = null
      })
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      track.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollState)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [updateScrollState])

  const scrollByTile = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const firstTile = track.children[0] as HTMLElement | undefined
    const step = (firstTile?.offsetWidth ?? track.clientWidth * 0.8) + TILE_GAP_PX
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }, [])

  if (!photos.length) return null

  return (
    <div className="mt-10">
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Event album photos"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollByTile(-1)
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollByTile(1)
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pr-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-surface-dark lg:pr-8"
      >
        {photos.map((photo) => (
          <EventAlbumTile key={photo.id} photo={photo} />
        ))}
      </div>

      <div className="mt-6 hidden items-center gap-3 sm:flex">
        <p className="mr-auto text-xs font-medium text-white/60">
          Swipe or use the arrows to explore
        </p>
        <button
          type="button"
          onClick={() => scrollByTile(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll gallery left"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-[border-color,color,transform,opacity] hover:-translate-y-0.5 hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByTile(1)}
          disabled={!canScrollRight}
          aria-label="Scroll gallery right"
          className="inline-flex size-11 items-center justify-center rounded-full bg-white text-[#0F3A63] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)] transition-[transform,opacity] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
