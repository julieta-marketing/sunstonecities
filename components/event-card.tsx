import Image from 'next/image'
import { Calendar, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/section-heading'
import type { EventItem } from '@/lib/site-data'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border">
      <div className="absolute inset-0">
        <Image
          src={event.image || '/placeholder.svg'}
          alt={event.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      </div>

      <div className="relative flex flex-col gap-7 p-8 sm:p-12 lg:max-w-2xl lg:p-16">
        <SectionLabel>Next up</SectionLabel>
        <h3 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {event.title}
        </h3>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          {event.excerpt}
        </p>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-3">
            <Calendar className="size-4 text-primary" />
            {event.date}
          </span>
          <span className="flex items-center gap-3">
            <Clock className="size-4 text-primary" />
            {event.time}
          </span>
          <span className="flex items-center gap-3">
            <MapPin className="size-4 text-primary" />
            {event.location}
          </span>
        </div>
        <a
          href="#contact"
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-light"
        >
          Reserve your seat
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  )
}
