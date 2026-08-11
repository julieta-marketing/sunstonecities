'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react'
import { FadeIn } from '@/components/motion/primitives'
import { SectionLabel } from '@/components/section-heading'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const isSubmitting = status === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json().catch(() => ({}))) as {
        message?: string
      }

      if (!response.ok) {
        throw new Error(data.message || 'We could not send your message.')
      }

      form.reset()
      setStatus('success')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'We could not send your message. Please try again.',
      )
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-[#f4f7fb] py-24 md:py-36">
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 opacity-[0.1] [mask-image:linear-gradient(90deg,black,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(132deg,rgba(255,255,255,0.66),transparent_48%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionLabel>Start a conversation</SectionLabel>
          <FadeIn>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Ready to Move Your Project Forward?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Whether you&apos;re exploring a new initiative, seeking additional capacity, or
              looking for funding solutions, our team is here to help.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 space-y-4 border-t border-border pt-8">
              <a
                href="mailto:contact@sunstonecities.com"
                className="block font-display text-2xl font-semibold text-foreground transition-colors hover:text-primary"
              >
                contact@sunstonecities.com
              </a>
              <p className="text-muted-foreground">+1 (949) 771-1764</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="relative">
            {status === 'success' ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-lg border border-border/80 bg-white/88 p-8 text-center shadow-[0_28px_80px_-58px_rgba(15,58,99,0.5)] backdrop-blur">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-8" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">Message received.</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Thanks for reaching out. A member of our team will be in touch within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle')
                    setError('')
                  }}
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-border/80 bg-white/88 p-5 shadow-[0_28px_80px_-58px_rgba(15,58,99,0.5)] backdrop-blur sm:p-8"
              >
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="companyWebsite"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    name="fullName"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                  />
                  <Field
                    label="Organization name or company"
                    name="organization"
                    placeholder="City of Cedar Falls"
                    autoComplete="organization"
                  />
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Job title"
                    name="jobTitle"
                    placeholder="City Manager"
                    autoComplete="organization-title"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jane@city.gov"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="mt-5">
                  <Field
                    label="Phone number"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    What can we help you with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    placeholder="Tell us about your project or goal…"
                    required
                    className="w-full resize-none rounded-lg border border-border/90 bg-white px-4 py-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-5 flex gap-3 rounded-lg border border-[#f1c7bf] bg-[#fff7f5] p-4 text-sm leading-relaxed text-[#8b352c]"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shine group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_12px_28px_-10px_rgba(78,114,217,0.6)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? 'Sending message' : 'Send message'}
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-lg border border-border/90 bg-white px-4 py-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
      />
    </div>
  )
}
