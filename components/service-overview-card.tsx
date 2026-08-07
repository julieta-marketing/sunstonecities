import Image from 'next/image'

import type { SubService } from '@/lib/site-data'

interface ServiceOverviewCardProps {
  service: SubService
}

export function ServiceOverviewCard({ service }: ServiceOverviewCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_45px_rgba(15,58,99,0.08)]">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-muted">
        <Image
          src={service.image ?? '/placeholder.svg'}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h4 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.75rem]">
          {service.title}
        </h4>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {service.description}
        </p>
      </div>
    </article>
  )
}
