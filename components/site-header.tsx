'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu as MenuIcon, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import { Menu } from '@base-ui/react/menu'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

type NavLink = { type: 'link'; label: string; href: string }
type NavDropdown = {
  type: 'dropdown'
  label: string
  items: { label: string; href: string; external?: boolean }[]
}
type NavEntry = NavLink | NavDropdown

const navEntries: NavEntry[] = [
  { type: 'link', label: 'About', href: '/#about' },
  { type: 'link', label: 'News', href: '/news' },
  {
    type: 'dropdown',
    label: 'Services',
    items: [
      { label: 'Project Consulting', href: '/services/project-consulting' },
      { label: 'Project Financing', href: '/services/project-financing' },
    ],
  },
  { type: 'link', label: 'Team', href: '/team' },
  {
    type: 'dropdown',
    label: 'Events',
    items: [
      { label: 'Upcoming Events', href: 'https://luma.com/sunstonecities', external: true },
      { label: 'USC Partnership', href: '/usc-price-partnership' },
    ],
  },
  { type: 'link', label: 'Gallery', href: '/#events-full' },
]

export function SiteHeader({ darkTop = false }: { darkTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobileOpenLabel, setMobileOpenLabel] = useState<string | null>(null)

  // Text color for the unscrolled (transparent) header. On pages with a dark
  // hero (darkTop), use light text so the nav stays legible; otherwise dark navy.
  const topText = darkTop ? 'text-white/90' : 'text-[#1c2d50]'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) setMobileOpenLabel(null)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={cn(
            'flex w-full max-w-6xl items-center justify-between rounded-2xl border border-transparent px-4 py-2.5 transition-all duration-500 sm:px-5',
            scrolled
              ? 'glass border-border shadow-[0_10px_40px_-20px_rgba(49,80,158,0.35)]'
              : 'bg-transparent shadow-none',
          )}
        >
          <a href="/#top" className="shrink-0" aria-label="Sunstone Cities home">
            <Logo variant={!scrolled && darkTop ? 'dark' : 'default'} />
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navEntries.map((entry) =>
              entry.type === 'link' ? (
                <a
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    'group relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground',
                    scrolled ? 'text-muted-foreground' : topText,
                  )}
                >
                  {entry.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ) : (
                <Menu.Root key={entry.label} modal={false}>
                  <Menu.Trigger
                    openOnHover
                    className={cn(
                      'group relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground data-[popup-open]:text-foreground',
                      scrolled ? 'text-muted-foreground' : topText,
                    )}
                  >
                    {entry.label}
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 group-data-[popup-open]:scale-x-100" />
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner className="z-50" sideOffset={10}>
                      <Menu.Popup className="glass min-w-56 rounded-2xl border border-border p-1.5 shadow-[0_10px_40px_-20px_rgba(49,80,158,0.35)] outline-none transition-[opacity,transform] duration-200 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
                        {entry.items.map((item) => (
                          <Menu.LinkItem
                            key={item.href}
                            href={item.href}
                            closeOnClick
                            {...(item.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="block cursor-pointer rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors data-[highlighted]:bg-muted data-[highlighted]:text-foreground"
                          >
                            {item.label}
                          </Menu.LinkItem>
                        ))}
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#contact"
              className="group hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-light md:inline-flex"
            >
              Contact Us
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-full border md:hidden',
                scrolled
                  ? 'border-border text-foreground'
                  : darkTop
                    ? 'border-white/40 bg-transparent text-white'
                    : 'border-[#1c2d50]/25 bg-transparent text-[#1c2d50]',
              )}
              aria-label="Open menu"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-6"
              aria-label="Mobile primary"
            >
              {[...navEntries, { type: 'link', label: 'Contact', href: '/#contact' } as const].map(
                (entry, i) =>
                  entry.type === 'link' ? (
                    <motion.a
                      key={entry.href}
                      href={entry.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-center justify-between border-b border-border/60 py-5 font-display text-3xl font-medium text-foreground"
                    >
                      {entry.label}
                      <ArrowUpRight className="size-6 text-primary" />
                    </motion.a>
                  ) : (
                    <motion.div
                      key={entry.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="border-b border-border/60"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenLabel((v) => (v === entry.label ? null : entry.label))
                        }
                        aria-expanded={mobileOpenLabel === entry.label}
                        className="flex w-full items-center justify-between py-5 font-display text-3xl font-medium text-foreground"
                      >
                        {entry.label}
                        <ChevronDown
                          className={cn(
                            'size-6 text-primary transition-transform duration-300',
                            mobileOpenLabel === entry.label && 'rotate-180',
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileOpenLabel === entry.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-5">
                              {entry.items.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  {...(item.external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                  className="flex items-center justify-between rounded-xl px-3 py-3 font-display text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  {item.label}
                                  <ArrowUpRight className="size-4 text-primary" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
