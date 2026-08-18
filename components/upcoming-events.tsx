import Image from 'next/image'
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  Clock3,
  MapPin,
  Play,
} from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/section-heading'
import { getUpcomingLumaEvent } from '@/lib/luma'
import { getLatestYoutubeVideo } from '@/lib/youtube'

const primaryCtaClass =
  'shine group inline-flex w-fit items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-8px_rgba(78,114,217,0.45)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_18px_40px_-10px_rgba(78,114,217,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#e7edf5]'

export async function UpcomingEvents() {
  // Pull the live next event from Luma so this section stays in sync with
  // https://luma.com/sunstonecities. If Luma has nothing on the calendar
  // right now, or the fetch fails, the card below falls back to an empty
  // state rather than risk showing a stale hardcoded event.
  const [event, video] = await Promise.all([
    getUpcomingLumaEvent(),
    getLatestYoutubeVideo(),
  ])

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-transparent pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pt-28"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label="Events"
          title="Keep Up With Sunstone Cities"
          className="mb-12 sm:mb-14"
          titleClassName="text-foreground"
          labelClassName="text-primary"
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-18">
          <Reveal className="lg:pt-20">
            <article className="overflow-hidden rounded-lg border border-[#cdd9e8] bg-white/85 shadow-[0_22px_55px_-42px_rgba(15,58,99,0.55)] backdrop-blur-sm transition-colors duration-500 hover:bg-white">
              {event ? (
                <>
                  <div className="group relative aspect-[16/10] overflow-hidden bg-black/20">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={100}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </div>

                  <div className="p-7 sm:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Upcoming Event
                      </p>
                    </div>

                    <h2 className="mt-5 max-w-xl text-balance font-display text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl">
                      {event.title}
                    </h2>

                    <dl className="mt-7 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                        <dd>{event.date}</dd>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <dd>{event.time}</dd>
                      </div>
                      <div className="flex items-start gap-3 sm:col-span-2">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                        <dd>{event.location}</dd>
                      </div>
                    </dl>

                    <a
                      href={event.registerUrl ?? 'https://luma.com/sunstonecities'}
                      target="_blank"
                      rel="noreferrer"
                      className={`${primaryCtaClass} mt-9`}
                    >
                      Register Now
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div
                    role="img"
                    aria-label="More events are coming soon"
                    className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-muted"
                  >
                    <div
                      aria-hidden="true"
                      className="bg-dots absolute inset-0 opacity-60"
                    />
                    <div className="relative flex flex-col items-center gap-4 px-6 text-center">
                      <span className="flex size-14 items-center justify-center rounded-full border border-primary/20 bg-white/90 text-primary shadow-[0_10px_24px_-12px_rgba(15,58,99,0.45)]">
                        <CalendarClock className="size-6" />
                      </span>
                      <p className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        More Events Are Coming
                      </p>
                    </div>
                  </div>

                  <div className="p-7 sm:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Stay Tuned
                      </p>
                    </div>

                    <h2 className="mt-5 max-w-xl text-balance font-display text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl">
                      We&apos;re lining up what&apos;s next
                    </h2>
                    <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                      New Sunstone Cities events are announced regularly on
                      Luma. In the meantime, take a look back at the moments
                      that mattered.
                    </p>

                    <a
                      href="#events-full"
                      className={`${primaryCtaClass} mt-9`}
                    >
                      View Past Events
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </>
              )}
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article
              id="video"
              className="overflow-hidden rounded-lg border border-[#cdd9e8] bg-white/85 shadow-[0_22px_55px_-42px_rgba(15,58,99,0.55)] backdrop-blur-sm transition-colors duration-500 hover:bg-white"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={`Watch ${video.title} on YouTube`}
              >
                <img
                  src={video.thumbnail}
                  alt={`${video.title} video preview`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 bg-[#0F3A63]/10 transition-colors duration-300 group-hover:bg-[#0F3A63]/20" />
                <span className="relative flex size-20 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#0F3A63] shadow-[0_14px_34px_-12px_rgba(15,58,99,0.6)] transition-transform duration-300 group-hover:scale-105">
                  <Play className="ml-1 size-7 fill-current" />
                </span>
              </a>

              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Latest Video
                  </p>
                </div>

                <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl">
                  {video.title}
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                  Watch the latest video from Sunstone Cities.
                </p>

                <a
                  href="https://www.youtube.com/@sunstonecities"
                  target="_blank"
                  rel="noreferrer"
                  className={`${primaryCtaClass} mt-9`}
                >
                  More Videos
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
