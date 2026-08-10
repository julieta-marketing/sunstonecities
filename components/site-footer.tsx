import { LinkedinIcon, YoutubeIcon } from '@/components/brand-icons'
import { FaqAccordion } from '@/components/faq-accordion'
import { SectionLabel } from '@/components/section-heading'

const nav = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'News', href: '/#news' },
  { label: 'Events', href: '/#events' },
  { label: 'Contact', href: '/#contact' },
]

export function SiteFooter({ showFaq = true }: { showFaq?: boolean }) {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      {showFaq && (
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
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

      {/* Links */}
      <div
        className={`mx-auto max-w-7xl px-6 pb-16 lg:px-8 ${
          showFaq ? '' : 'pt-14 sm:pt-16'
        }`}
      >
        <div className="flex flex-col justify-between gap-8 border-t border-border pt-10 md:flex-row md:items-center">
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
              href="#"
              aria-label="LinkedIn"
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <YoutubeIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 pb-10 text-sm text-muted-foreground/70 sm:flex-row lg:px-8">
        <p>© {new Date().getFullYear()} Sunstone Cities. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
