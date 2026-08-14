'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { SectionLabel } from '@/components/section-heading'
import { FadeIn } from '@/components/motion/primitives'

export function NewsletterSubscribe() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(data.message || 'Please try again.')
      }

      setStatus('success')
      setMessage('Thanks for subscribing.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not subscribe that email. Please try again.',
      )
    }
  }

  return (
    <section className="relative overflow-hidden border-t border-primary/10 bg-[#f4f7fb] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(70,127,247,0.07),transparent_36%,rgba(121,179,222,0.08))]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 border-t border-border/70 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <SectionLabel>Newsletter</SectionLabel>
            <FadeIn>
              <h2 className="mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Subscribe to our newsletter
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Get Sunstone Cities updates, event invitations, and project
                insights delivered to your inbox.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 rounded-[2rem] border border-border bg-white/90 p-3 shadow-[0_18px_55px_-38px_rgba(15,58,99,0.55)] backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full sm:p-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-5 py-3 ring-1 ring-border/70 sm:min-h-0 sm:bg-transparent sm:ring-0">
                <Mail className="size-5 shrink-0 text-muted-foreground" />
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/65"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shine group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-[0_12px_28px_-10px_rgba(78,114,217,0.65)] ring-1 ring-primary-dark/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-0 sm:w-auto sm:px-8"
              >
                {status === 'loading'
                  ? 'Submitting'
                  : status === 'success'
                    ? 'Subscribed'
                    : 'Submit'}
                {status === 'success' ? (
                  <Check className="size-4" />
                ) : (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
            {message ? (
              <p
                className={`mt-3 text-sm ${
                  status === 'error' ? 'text-red-600' : 'text-muted-foreground'
                }`}
                role="status"
              >
                {message}
              </p>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
