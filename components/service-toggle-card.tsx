'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, Check, FileText } from 'lucide-react'
import type { SubService } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function ServiceToggleCard({
  service,
  index,
  defaultOpen = false,
}: {
  service: SubService
  index: number
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        'rounded-3xl border bg-card transition-colors duration-500',
        open ? 'border-primary/50' : 'border-border hover:border-border/80',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-6 text-left sm:gap-6"
        aria-expanded={open}
      >
        <span className="font-display text-sm font-medium tabular-nums text-primary">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {service.title}
        </span>
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            open
              ? 'rotate-45 border-primary bg-primary text-primary-foreground'
              : 'border-border text-foreground',
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 px-6 pb-7 sm:pl-16">
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Featured Deliverables
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {service.extras?.map((extra) => (
                <div key={extra.label}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {extra.label}
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {extra.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <a
                href={service.onePager}
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                <FileText className="size-4 text-primary" />
                Download 1-pager
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
