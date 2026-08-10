import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail, Network } from 'lucide-react'
import { LinkedinIcon } from '@/components/brand-icons'
import { DotField } from '@/components/decor'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives'
import { SectionLabel } from '@/components/section-heading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TeamPhotoCard } from '@/components/team-photo-card'

export const metadata: Metadata = {
  title: 'Our Team | Sunstone Cities',
  description:
    'Meet the public-sector leaders, economic development professionals, analysts, and communications specialists behind Sunstone Cities.',
}

// All five photos are pre-cropped to the same 3:4 head-and-shoulders framing
// (see components/team-photo-card.tsx), so no focus/zoom overrides are needed.
const managingMembers = [
  { name: 'John Keisler', image: '/team/ownership-john.jpg' },
  { name: 'Mike Stone', image: '/team/ownership-mike.jpg' },
  { name: 'Jessica Dela Rosa', image: '/team/ownership-jessica.jpg' },
  { name: 'Jayro Sandoval', image: '/team/ownership-jayro.jpg' },
  { name: 'Ryan Phong', image: '/team/ownership-ryan.jpg' },
]

const profiles = [
  {
    name: 'John Keisler',
    title: 'Chief Executive Officer & Managing Member',
    image: '/team-headshots/John-Keisler-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/jpkeisler/',
    email: 'John.Keisler@SunstoneCities.com',
    description:
      'John P. Keisler is an experienced economic development leader with a proven track record in both the public and private sectors. As CEO and Managing Member of Sunstone Cities, he leads efforts to advance inclusive economic growth through strategic investment, public-private partnerships, and entrepreneurial ecosystem development. With more than two decades of public service, including his tenure as Economic Development Director for the City of Long Beach, John played a key role in driving private investment, launching the city’s first Economic Development Blueprint, and establishing the Economic Development Commission. He also founded the Long Beach Economic Partnership and helped create the Long Beach Accelerator through a collaborative public-private-education model. Through Sunstone, John continues to support cities in designing forward-looking strategies that promote sustainable economic development and job creation.',
  },
  {
    name: 'Jayro Sandoval',
    title: 'Economic Development Manager & Managing Member',
    image: '/team-headshots/Jayro-Sandoval-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/jayrosandoval/',
    email: 'Jayro.Sandoval@SunstoneCities.com',
    description:
      'Jayro Sandoval has led and advised public and nonprofit initiatives focused on racial justice, arts equity, and economic inclusion across Southern California. As a Commissioner on the City of Long Beach Economic Development Commission, Jayro has helped shape policy recommendations that center small businesses and historically underserved communities. His leadership with organizations including the Arts Council for Long Beach and the Long Beach Economic Partnership has advanced strategies to close equity gaps in access to public funding, creative spaces, and workforce development.',
  },
  {
    name: 'Ryan Phong',
    title: 'Project Manager & Managing Member',
    image: '/team-headshots/Ryan-Phong-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/ryanphong/',
    email: 'Ryan.Phong@SunstoneCities.com',
    description:
      'Ryan cultivates partnerships with local governments and manages consulting projects that advance economic development, infrastructure planning, and public-sector initiatives. He develops research reports, policy memos, and presentations that provide actionable insights to public agencies, and supports communities in securing funding through clean energy retrofits, government grants and loans, and public-private partnership financing. Ryan also serves as program advisor for the annual USC Economic Development Challenge.',
  },
  {
    name: 'Jennifer Huang',
    title: 'Director of Marketing, Communications & Community Engagement',
    image: '/team-headshots/Jennifer-Huang-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/jenniferehuang/',
    email: 'Jennifer.Huang@SunstoneInvestment.com',
    description:
      'Jennifer Huang brings more than a decade of enterprise-wide communications and strategic engagement experience. She leads organizational branding, messaging strategy, and community partnerships across multiple sectors. Her public-private partnership work includes helping coordinate the Long Beach Accelerator and developing the inaugural Irvine Tech Day with City of Irvine councilmembers and UC Irvine. Jennifer’s P3 Strategy Series was recognized by the California State Treasurer for highlighting best practices in public-private partnerships.',
  },
  {
    name: 'Harry Saltzgaver',
    title: 'Managing Editor',
    image: '/team-headshots/Harry-Saltzgaver-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/harry-saltzgaver-442498268/',
    email: 'Harry.Saltzgaver@SunstoneInvestment.com',
    description:
      'With more than 45 years of experience as a journalist, editor, and civic advocate, Harry Saltzgaver has long used storytelling to illuminate issues of justice, reconciliation, and community resilience. During his tenure as Executive Editor of the Grunion Gazette, he published in-depth coverage of restorative justice programs, youth leadership initiatives, and interfaith healing efforts. At Sunstone Cities, Harry writes feature stories, public narratives, and op-eds that center voices often left out of traditional media coverage.',
  },
  {
    name: 'Julie Ta',
    title: 'Marketing Associate',
    image: '/team-headshots/Julie-Ta-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/julieta02/',
    email: 'Julie.Ta@SunstoneInvestment.com',
    description:
      'Julie Ta brings a versatile background in social media management, marketing, website design, content creation, and event planning. Focused on using creativity to create meaningful change, she develops innovative marketing strategies that support community impact. At Sunstone Cities, Julie elevates the firm’s presence across platforms by showcasing key projects and initiatives that advance economic development.',
  },
  {
    name: 'Giselle Melendez-Cruz',
    title: 'Research & Management Analyst',
    image: '/team-headshots/Giselle-Melendez-Cruz-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/giselle-melendez/',
    email: 'Giselle.Melendez-Cruz@SunstoneCities.com',
    description:
      'Giselle Melendez-Cruz brings hands-on experience coordinating nonprofit operations and supporting economic stability initiatives across Los Angeles County. Her work has included community outreach, housing workshops, and connecting residents to resources in partnership with the Housing Authority of the City of Los Angeles. She is committed to improving economic quality of life for underserved communities through strategic services and public-private partnerships.',
  },
  {
    name: 'Hannah Cruz',
    title: 'Research & Management Analyst',
    image: '/team-headshots/Hannah-Cruz-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/hannahacruz/',
    email: 'Hannah.Cruz@SunstoneCities.com',
    description:
      'Hannah Cruz holds a Master of Public Administration from the University of Southern California and brings cross-sector experience spanning nonprofit and private organizations. Her background includes fundraising, marketing, educational initiatives, product development, process improvement, and community-focused work. Hannah develops innovative, data-informed solutions that help cities and nonprofits strengthen operations and serve their communities more equitably.',
  },
  {
    name: 'Jade Le',
    title: 'Project Financing Analyst',
    image: '/team-headshots/Jade-Le-unified-gray.jpg',
    linkedin: 'https://www.linkedin.com/in/jade-le-6401431a2/',
    email: 'Jade.Le@Sunstonecities.com',
    description:
      'Jade Le holds a Master of Public Policy from the University of California, Riverside, with a concentration in business and environmental policy. Drawing on public-sector experience, she brings policy knowledge, practical problem solving, and a commitment to sustainable innovation to Sunstone Cities. As part of the Public Infrastructure Financing Solutions team, Jade specializes in public-private partnerships and bringing capital to infrastructure development projects.',
  },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-primary/10 px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
        <DotField className="opacity-[0.16]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-10 size-[28rem] rounded-full bg-primary/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-[-12rem] size-[34rem] rounded-full bg-[#79B3DE]/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <Link
              href="/#about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-x-1"
              />
              Back to About
            </Link>
          </Reveal>

          <Reveal className="mt-12" delay={0.06}>
            <SectionLabel>Team</SectionLabel>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
              Public-sector experience.{' '}
              <span className="text-primary">Shared purpose.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
              Our team includes former public agency leaders, economic
              development professionals, and communications specialists. We
              understand municipal processes and work as an extension of our
              clients’ teams to move important work forward.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-[#0F3A63] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(121,179,222,0.22),transparent_38%),radial-gradient(circle_at_85%_75%,rgba(73,128,246,0.2),transparent_36%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B9DCF0]">
                <Network aria-hidden="true" className="size-4" />
                Ownership
              </span>
              <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Sunstone Cities is owned and operated by five managing members.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/72 lg:justify-self-end">
              Shared ownership brings complementary experience and direct
              accountability to every client relationship and project.
            </p>
          </Reveal>

          <Stagger
            className="mt-10 grid grid-cols-2 gap-1 overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5"
            staggerChildren={0.08}
          >
            {managingMembers.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <TeamPhotoCard name={member.name} image={member.image} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative isolate px-5 py-20 sm:px-8 sm:py-28">
        <DotField className="opacity-[0.11]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>People</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              The expertise behind{' '}
              <span className="text-primary">every engagement</span>
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-primary/12 border-y border-primary/12 sm:mt-16">
            {profiles.map((profile, index) => (
              <Reveal
                key={profile.name}
                className="group grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-14"
                x={index % 2 === 0 ? -20 : 20}
                y={16}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#d9dce0] shadow-[0_28px_65px_-42px_rgba(15,58,99,0.65)] lg:col-span-4 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={profile.image}
                      alt={`${profile.name}, ${profile.title}`}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-top saturate-[0.86] transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0F3A63]/24 to-transparent"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-8 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {profile.name}
                  </h3>
                  <p className="mt-2 max-w-2xl font-display text-base font-medium leading-relaxed text-primary sm:text-lg">
                    {profile.title}
                  </p>
                  <p className="mt-6 max-w-3xl text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
                    {profile.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/action inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-20px_rgba(73,128,246,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={`View ${profile.name} on LinkedIn (opens in a new tab)`}
                    >
                      <LinkedinIcon className="size-4" />
                      LinkedIn
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
                      />
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Mail aria-hidden="true" className="size-4" />
                      Email
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter showFaq={false} />
    </main>
  )
}
