'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { faqs, type FaqAnswerPart } from '@/lib/site-data'

function renderAnswer(parts: FaqAnswerPart[]) {
  return parts.map((part, index) => {
    if (typeof part === 'string') return part

    return (
      <a
        key={`${part.href}-${index}`}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {part.label}
      </a>
    )
  })
}

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  const midpoint = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)]

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="space-y-3">
          {column.map((faq, itemIndex) => {
            const index = columnIndex === 0 ? itemIndex : itemIndex + midpoint
            const isOpen = open === index

            return (
              <div
                key={faq.q}
                className={`rounded-lg border bg-white/88 shadow-[0_16px_45px_-40px_rgba(15,58,99,0.42)] transition-colors ${
                  isOpen
                    ? 'border-primary/35 bg-[#f8fbff]'
                    : 'border-border hover:border-primary/25 hover:bg-[#f8fbff]'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium leading-snug text-foreground sm:text-lg">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? 'border-primary/30 bg-primary text-primary-foreground'
                        : 'border-border bg-white text-foreground'
                    }`}
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-relaxed text-muted-foreground sm:px-6">
                        {renderAnswer(faq.a)}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
