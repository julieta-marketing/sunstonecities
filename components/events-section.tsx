import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { pastEvents } from '@/lib/site-data'

type EventGalleryRowProps = {
  events: typeof pastEvents
  direction: 'left' | 'right'
}

function EventGalleryRow({ events, direction }: EventGalleryRowProps) {
  return (
    <div
      className="events-gallery-row w-full overflow-hidden"
      aria-label={`Past event photos moving ${direction}`}
    >
      <div
        className={`events-gallery-track events-gallery-track--${direction} flex w-max`}
      >
        {[false, true].map((isDuplicate) => (
          <div
            key={isDuplicate ? 'duplicate' : 'original'}
            className="events-gallery-group flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
            aria-hidden={isDuplicate || undefined}
          >
            {events.map((event) => (
              <figure
                key={`${isDuplicate ? 'duplicate' : 'original'}-${event.image}`}
                className="group relative aspect-[16/10] w-[78vw] max-w-[560px] shrink-0 overflow-hidden rounded-xl bg-muted shadow-[0_18px_50px_-36px_rgba(15,23,42,0.55)] sm:w-[46vw] lg:w-[34vw] xl:w-[30vw]"
              >
                <Image
                  src={event.image}
                  alt={isDuplicate ? '' : event.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, (max-width: 1280px) 34vw, 560px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10182b]/72 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="inline-flex max-w-full rounded-full border border-white/20 bg-[#10182b]/82 px-3.5 py-1.5 text-xs font-medium leading-snug text-white shadow-lg backdrop-blur-md sm:text-sm">
                    {event.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function EventsSection() {
  const firstRow = pastEvents.slice(0, 6)
  const secondRow = pastEvents.slice(6)

  return (
    <section
      id="events-full"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#081f36] py-24 text-white sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(128deg,transparent_0%,transparent_27%,rgba(70,127,247,0.2)_27%,rgba(70,127,247,0.035)_42%,transparent_42%,transparent_62%,rgba(41,176,166,0.14)_62%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-[0.2] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[12%] top-[42%] -z-10 h-px w-[124%] -rotate-[7deg] bg-gradient-to-r from-transparent via-[#73a2ff]/45 to-transparent"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          title="Sunstone Moments That Mattered"
          highlight="Sunstone Moments"
          titleClassName="max-w-none whitespace-nowrap text-white"
        />
      </div>

      <div
        className="events-gallery relative z-10 mt-14 space-y-3 sm:space-y-4"
        aria-label="Photos from past Sunstone Cities events"
      >
        <EventGalleryRow events={firstRow} direction="right" />
        <EventGalleryRow events={secondRow} direction="left" />
      </div>
    </section>
  )
}
