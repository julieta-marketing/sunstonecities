import Image from 'next/image'
import { SectionLabel } from '@/components/section-heading'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'

const aboutColumns = [
  {
    title: 'Who We Are',
    body: 'Sunstone Cities is an economic development firm that provides project financing and project consulting services.',
    highlights: ['project financing', 'project consulting services'],
    image: '/about/who-we-are.png',
    alt: 'Sunstone Cities panel discussion with John Keisler and Fiona Ma',
  },
  {
    title: 'Our Mission',
    body: 'Help governments unlock growth, attract businesses & investment, and create resilient communities.',
    highlights: [
      'unlock growth, attract businesses & investment',
      'create resilient communities',
    ],
    image: '/about/our-mission-community-event.jpg',
    alt: 'Sunstone Cities community leaders gathered at an outdoor event',
  },
  {
    title: 'Why Cities Choose Us',
    body: 'Our services blend strategic consulting, staff support, and capital solutions tailored to the evolving needs of the public sector.',
    highlights: ['strategic consulting, staff support', 'capital solutions'],
    image: '/about/why-cities-choose-us-long-beach.jpg',
    alt: 'Aerial view of the Long Beach waterfront, marina, and downtown skyline',
  },
]

/* Wraps highlighted phrases in the body copy with the same blue used for the
   underline accent below each title, matching SectionHeading's pattern. */
function renderHighlightedBody(body: string, highlights: string[]) {
  const matches = highlights
    .map((text) => ({ text, index: body.indexOf(text) }))
    .filter((match) => match.index >= 0)
    .sort((a, b) => a.index - b.index)

  if (!matches.length) return body

  const parts = []
  let cursor = 0

  matches.forEach(({ text, index }) => {
    if (index > cursor) {
      parts.push(body.slice(cursor, index))
    }

    parts.push(
      <strong key={`${text}-${index}`} className="font-semibold text-primary">
        {text}
      </strong>,
    )

    cursor = index + text.length
  })

  if (cursor < body.length) {
    parts.push(body.slice(cursor))
  }

  return parts
}

export function About() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#fbfcfe] pb-20 pt-12 sm:pb-24 sm:pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-70 [background-position:center_top] [background-size:130px_130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#e9edf2]/80"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>About Us</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Built for <span className="text-primary">growth</span>
          </h2>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-10"
          staggerChildren={0.1}
          delayChildren={0.05}
          viewportMargin="-60px"
        >
          {aboutColumns.map((column) => (
            <StaggerItem key={column.title} className="h-full">
              <div className="group flex h-full flex-col transition-transform duration-500 ease-out hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_50px_-38px_rgba(15,58,99,0.55)] transition-shadow duration-500 group-hover:shadow-[0_24px_58px_-34px_rgba(70,127,247,0.42)]">
                  <Image
                    src={column.image}
                    alt={column.alt}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 30vw, 340px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(70,127,247,0.16),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {column.title}
                </h3>
                <span className="mt-3 h-0.5 w-8 bg-primary/45 transition-all duration-500 group-hover:w-16 group-hover:bg-primary motion-reduce:transition-none" />
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
                  {renderHighlightedBody(column.body, column.highlights)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
