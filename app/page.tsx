import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { LatestNews } from '@/components/latest-news'
import { UpcomingEvents } from '@/components/upcoming-events'
import { UscSunstoneChallenge } from '@/components/usc-sunstone-challenge'
import { About } from '@/components/about'
import { TeamSection } from '@/components/team-section'
import { Services } from '@/components/services'
import { EventsSection } from '@/components/events-section'
import { NewsletterSubscribe } from '@/components/newsletter-subscribe'
import { ContactForm } from '@/components/contact-form'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <LatestNews />
        <div className="home-capabilities-background relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="bg-dots pointer-events-none absolute inset-0 opacity-[0.16] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
          <Services />
          <TeamSection />
        </div>
        <div className="home-community-background relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="bg-dots pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:linear-gradient(to_bottom,black,transparent_64%)]"
          />
          <UpcomingEvents />
          <UscSunstoneChallenge />
        </div>
        <NewsletterSubscribe />
        <EventsSection />
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  )
}
