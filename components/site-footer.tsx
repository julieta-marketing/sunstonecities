import { LinkedinIcon, YoutubeIcon } from '@/components/brand-icons'
import { FaqAccordion } from '@/components/faq-accordion'
import { FooterNewsletterForm } from '@/components/footer-newsletter-form'
import { Logo } from '@/components/logo'
import { SectionLabel } from '@/components/section-heading'

const nav = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Team', href: '/team' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/#events' },
  { label: 'Gallery', href: '/#events-full' },
  { label: 'Contact', href: '/#contact' },
  { label: 'FAQ', href: '/#faq' },
]

export function SiteFooter({ showFaq = true }: { showFaq?: boolean }) {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {showFaq && (
        <div id="faq" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24 lg:px-8">
          <div className="space-y-12">
            <div className="max-w-2xl">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:whitespace-nowrap">
                Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </div>
      )}

      {showFaq && <div className="h-px w-full bg-border" />}

      <div
        className={`mx-auto max-w-7xl px-6 pb-10 lg:px-8 ${
          showFaq ? 'pt-12 sm:pt-14' : 'pt-14 sm:pt-16'
        }`}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.8fr)] lg:items-start">
          <div>
            <a href="/#top" className="inline-flex" aria-label="Sunstone Cities home">
              <Logo className="h-11" />
            </a>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Sunstone Cities partners with local governments to unlock growth,
              attract investment, and deliver projects that strengthen
              communities.
            </p>
          </div>
          <FooterNewsletterForm className="lg:justify-self-end" />
        </div>

        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-border pt-10 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/sunstonecities"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Sunstone Cities on LinkedIn (opens in a new tab)"
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href="https://www.youtube.com/@sunstonecities"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Sunstone Cities on YouTube (opens in a new tab)"
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <YoutubeIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 text-sm text-muted-foreground/70 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Sunstone Cities. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
