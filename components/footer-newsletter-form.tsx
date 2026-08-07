'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FooterNewsletterForm({ className }: { className?: string }) {
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
    <div
      className={cn(
        'w-full max-w-xl rounded-lg border border-[#d9e2f3] bg-[#f7faff] p-5 shadow-[0_18px_55px_-44px_rgba(15,58,99,0.55)] sm:p-6',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Newsletter
      </p>
      <form
        onSubmit={handleSubmit}
        aria-busy={status === 'loading'}
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-[#c7d4eb] bg-white/80 px-4 py-3 ring-1 ring-white/60 transition-colors focus-within:border-primary/60 focus-within:bg-white">
          <Mail className="size-4 shrink-0 text-primary" />
          <input
            id="footer-newsletter-email"
            name="email"
            type="email"
            required
            aria-describedby={message ? 'footer-newsletter-status' : undefined}
            placeholder="Enter your email"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/65"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shine group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_12px_28px_-12px_rgba(78,114,217,0.65)] ring-1 ring-primary-dark/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-7"
        >
          {status === 'loading'
            ? 'Subscribing'
            : status === 'success'
              ? 'Subscribed'
              : 'Subscribe'}
          {status === 'success' ? (
            <Check className="size-4" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </form>
      {message ? (
        <p
          id="footer-newsletter-status"
          className={`mt-3 text-sm ${
            status === 'error' ? 'text-red-600' : 'text-muted-foreground'
          }`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
