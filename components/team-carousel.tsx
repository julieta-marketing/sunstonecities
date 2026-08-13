'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { LinkedinIcon } from '@/components/brand-icons'
import { cn } from '@/lib/utils'
import type { TeamMember } from '@/lib/site-data'

type TeamCarouselVariant = 'light' | 'dark'

/* Reusable flip card: front photo + name pill, back bio + LinkedIn. */
function TeamCard({
  member,
  variant = 'light',
}: {
  member: TeamMember
  variant?: TeamCarouselVariant
}) {
  const [flipped, setFlipped] = useState(false)
  const isDark = variant === 'dark'
  const photoFocus = member.focus ?? '50% 24%'
  const photoZoom = member.zoom ?? 1.12

  return (
    <div className="[perspective:1400px]">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${member.name}, ${member.title}. Show bio.`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setFlipped((f) => !f)
          }
        }}
        className={cn(
          'group relative block aspect-[3/4] w-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isDark ? 'focus-visible:ring-offset-[#172033]' : 'focus-visible:ring-offset-background',
        )}
      >
        <div
          className="relative h-full w-full transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* FRONT */}
          <div
            className={cn(
              'absolute inset-0 overflow-hidden rounded-3xl bg-muted shadow-[0_10px_30px_-12px_rgba(49,80,158,0.35)] [backface-visibility:hidden]',
              isDark ? 'border border-white/15 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]' : 'border border-border',
            )}
          >
            <Image
              src={member.photo || '/placeholder.svg'}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 28vw"
              className="object-cover transition-[filter,transform] duration-500 ease-out group-hover:brightness-[1.02]"
              style={{
                objectPosition: photoFocus,
                transform: `scale(${photoZoom})`,
                transformOrigin: photoFocus,
                filter: 'saturate(0.92) contrast(1.04)',
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-foreground/35 to-transparent" />
            <div className="absolute inset-x-4 bottom-4">
              <div className="inline-block max-w-full rounded-2xl bg-card/95 px-4 py-3 shadow-sm backdrop-blur-sm">
                <h4 className="truncate font-display text-base font-semibold tracking-tight text-foreground">
                  {member.name}
                </h4>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {member.title}
                </p>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col rounded-3xl bg-card p-6 shadow-[0_10px_30px_-12px_rgba(49,80,158,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]',
              isDark ? 'border border-white/15 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]' : 'border border-border',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-pretty font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
                  {member.name}
                </h4>
                <p className="mt-1 text-sm font-medium leading-snug text-primary">
                  {member.title}
                </p>
              </div>
            </div>
            <span className="mt-4 h-px w-full bg-border" />
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              {member.bio}
            </p>
            <div className="mt-auto flex items-center justify-start gap-2 pt-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${member.name} on LinkedIn (opens in a new window)`}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Email ${member.name}`}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TeamCarousel({
  members,
  variant = 'light',
  footerHref,
}: {
  members: TeamMember[]
  variant?: TeamCarouselVariant
  footerHref?: string
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isDark = variant === 'dark'

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const children = Array.from(scroller.children) as HTMLElement[]
    const center = scroller.scrollLeft + scroller.clientWidth / 2
    let closest = 0
    let closestDist = Infinity
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(childCenter - center)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })
    setActive(closest)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.addEventListener('scroll', handleScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const blockVerticalWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
    }

    scroller.addEventListener('wheel', blockVerticalWheel, { passive: false })
    return () => scroller.removeEventListener('wheel', blockVerticalWheel)
  }, [])

  const scrollTo = (index: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const child = scroller.children[index] as HTMLElement | undefined
    child?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  return (
    <div className="mt-12">
      <div
        ref={scrollerRef}
        className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {members.map((member) => (
          <div
            key={member.id}
            className="w-[78%] shrink-0 snap-center sm:w-[52%] md:w-[38%] lg:w-[30%] xl:w-[27%]"
          >
            <TeamCard member={member} variant={variant} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        {/* Dot pagination */}
        <div className="flex items-center gap-2.5" role="group" aria-label="Team carousel controls">
          {members.map((member, i) => (
            <button
              key={member.id}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${member.name}`}
              aria-current={active === i}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                active === i
                  ? isDark
                    ? 'w-6 bg-primary-light'
                    : 'w-6 bg-primary'
                  : isDark
                    ? 'w-2 bg-white/25 hover:bg-white/45'
                    : 'w-2 bg-border hover:bg-muted-foreground/40',
              )}
            />
          ))}
        </div>

        {footerHref && (
          <Link
            href={footerHref}
            className={cn(
              'group inline-flex shrink-0 items-center gap-2 text-sm font-semibold transition-colors',
              isDark
                ? 'text-white hover:text-[#a9c8ff]'
                : 'text-foreground hover:text-primary',
            )}
          >
            View more
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-primary transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    </div>
  )
}
