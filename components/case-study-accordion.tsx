'use client'

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowRight, ImageIcon, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FeaturedCaseStudy } from '@/lib/site-data'

const caseStudyThemes = [
  {
    background: '#0F3A63',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.90)',
    placeholder: 'rgba(255, 255, 255, 0.18)',
    placeholderIcon: 'rgba(255, 255, 255, 0.72)',
    outcomeBackground: 'rgba(255, 255, 255, 0.10)',
    outcomeBorder: 'rgba(255, 255, 255, 0.20)',
    outcomeAccent: '#B9DCF0',
  },
  {
    background: '#1D6EAF',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.90)',
    placeholder: 'rgba(255, 255, 255, 0.18)',
    placeholderIcon: 'rgba(255, 255, 255, 0.72)',
    outcomeBackground: 'rgba(255, 255, 255, 0.12)',
    outcomeBorder: 'rgba(255, 255, 255, 0.22)',
    outcomeAccent: '#E6F1FB',
  },
  {
    background: '#E6F1FB',
    foreground: '#000000',
    muted: 'rgba(0, 0, 0, 0.72)',
    placeholder: 'rgba(255, 255, 255, 0.48)',
    placeholderIcon: '#000000',
    outcomeBackground: 'rgba(15, 58, 99, 0.08)',
    outcomeBorder: 'rgba(15, 58, 99, 0.16)',
    outcomeAccent: '#0F3A63',
  },
]

export function CaseStudyAccordion({
  caseStudies,
}: {
  caseStudies: FeaturedCaseStudy[]
}) {
  const [openId, setOpenId] = useState(caseStudies[0]?.id ?? '')

  return (
    <div className="relative">
      <div className="relative flex flex-col gap-3 lg:h-[520px] lg:flex-row lg:gap-2">
        {caseStudies.map((cs, index) => {
          const isOpen = cs.id === openId
          const theme = caseStudyThemes[index % caseStudyThemes.length]
          const serviceTags =
            cs.services
              ?.split(',')
              .map((tag) => tag.trim())
              .filter(Boolean) ?? []
          const hasStructuredDetails = Boolean(
            cs.services &&
              (cs.summary || (cs.challenge && cs.solution)),
          )
          return (
            <div
              key={cs.id}
              style={{ backgroundColor: theme.background }}
              className={cn(
                'group relative overflow-hidden rounded-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                'lg:min-w-0',
                isOpen ? 'lg:flex-1' : 'lg:w-14 lg:flex-none xl:w-16',
              )}
            >
              {/* Collapsed tab (md+ only, when not open) */}
              <button
                type="button"
                onClick={() => setOpenId(cs.id)}
                aria-label={`Expand ${cs.headline}`}
                aria-expanded={isOpen}
                className={cn(
                  'absolute inset-0 z-10 hidden w-full flex-col items-center justify-between py-5',
                  isOpen ? 'lg:hidden' : 'lg:flex',
                )}
              >
                <span
                  className="font-mono text-base font-semibold tracking-tight"
                  style={{ color: theme.foreground }}
                >
                  {cs.number}
                </span>
                <span
                  className="rotate-180 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{
                    writingMode: 'vertical-rl',
                    color: theme.foreground,
                  }}
                >
                  {cs.headline}
                </span>
                <Plus
                  className="size-5 opacity-55 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: theme.foreground }}
                  strokeWidth={2}
                />
              </button>

              {/* Expanded content (always on mobile; on md+ only when open) */}
              <div
                className={cn(
                  'flex h-full flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:gap-8 md:p-10',
                  isOpen ? 'lg:flex' : 'lg:hidden',
                )}
              >
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  {cs.inlineNumberTitle ? (
                    <div className="flex items-baseline gap-4">
                      <span
                        className="shrink-0 font-mono text-base font-semibold tracking-tight sm:text-lg"
                        style={{ color: theme.foreground }}
                      >
                        {cs.number}
                      </span>
                      <h4
                        className={cn(
                          'text-pretty font-display font-bold leading-tight tracking-tight',
                          hasStructuredDetails
                            ? 'text-xl sm:text-2xl lg:text-[1.75rem]'
                            : 'text-2xl sm:text-3xl lg:text-4xl',
                        )}
                        style={{ color: theme.foreground }}
                      >
                        {cs.headline}
                      </h4>
                    </div>
                  ) : (
                    <>
                      <span
                        className="font-mono text-lg font-semibold tracking-tight"
                        style={{ color: theme.foreground }}
                      >
                        {cs.number}
                      </span>

                      <h4
                        className={cn(
                          'text-pretty font-display font-bold leading-tight tracking-tight',
                          hasStructuredDetails
                            ? 'mt-4 text-xl sm:text-2xl lg:text-[1.75rem]'
                            : 'mt-6 text-2xl sm:text-3xl',
                          !hasStructuredDetails && 'lg:text-4xl',
                        )}
                        style={{ color: theme.foreground }}
                      >
                        {cs.headline}
                      </h4>
                    </>
                  )}

                  {hasStructuredDetails && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cs.location && (
                        <span
                          className="inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]"
                          style={{
                            color: theme.foreground,
                            borderColor: theme.placeholderIcon,
                          }}
                        >
                          {cs.location}
                        </span>
                      )}
                      {serviceTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex max-w-full rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.11em]"
                          style={{
                            color: theme.foreground,
                            borderColor: theme.placeholderIcon,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {hasStructuredDetails ? (
                    <>
                      {cs.summary ? (
                        <p
                          className="mt-4 max-w-xl text-pretty text-sm leading-relaxed sm:text-[0.95rem]"
                          style={{ color: theme.muted }}
                        >
                          {cs.summary}
                        </p>
                      ) : (
                        <>
                          <div className="mt-4">
                            <span
                              className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                              style={{ color: theme.muted }}
                            >
                              Challenge
                            </span>
                            <p
                              className="mt-1.5 text-pretty text-xs leading-relaxed sm:text-sm"
                              style={{ color: theme.muted }}
                            >
                              {cs.challenge}
                            </p>
                          </div>

                          <div className="mt-4">
                            <span
                              className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                              style={{ color: theme.muted }}
                            >
                              Solution
                            </span>
                            <p
                              className="mt-1.5 text-pretty text-xs leading-relaxed sm:text-sm"
                              style={{ color: theme.muted }}
                            >
                              {cs.solution}
                            </p>
                          </div>
                        </>
                      )}

                    </>
                  ) : (
                    <>
                      <p
                        className="mt-5 max-w-md text-pretty text-sm leading-relaxed sm:text-base"
                        style={{ color: theme.muted }}
                      >
                        {cs.description}
                      </p>
                    </>
                  )}

                  <a
                    href={cs.link}
                    className="group/cta mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold underline decoration-current/35 underline-offset-4 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4"
                    style={{
                      color: theme.foreground,
                      '--tw-ring-offset-color': theme.background,
                    } as CSSProperties}
                  >
                    View more
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </a>
                </div>

                {hasStructuredDetails ? (
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg md:aspect-square md:h-64 md:w-64 lg:h-80 lg:w-80">
                    <Image
                      src={cs.image || '/placeholder.svg'}
                      alt={cs.headline}
                      fill
                      sizes="(max-width: 768px) 100vw, 304px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  /* Image / placeholder */
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg md:aspect-square md:h-64 md:w-64 lg:h-80 lg:w-80">
                    {cs.image ? (
                      <Image
                        src={cs.image || '/placeholder.svg'}
                        alt={cs.headline}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ backgroundColor: theme.placeholder }}
                        aria-hidden="true"
                      >
                        <ImageIcon
                          className="size-10"
                          style={{ color: theme.placeholderIcon }}
                          strokeWidth={1.5}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
