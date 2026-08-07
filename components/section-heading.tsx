import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/primitives'

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary',
        className,
      )}
    >
      <span className="h-px w-8 bg-primary/60" />
      {children}
    </span>
  )
}

export function SectionHeading({
  label,
  title,
  highlight,
  description,
  align = 'left',
  className,
  titleClassName,
  labelClassName,
}: {
  label?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  labelClassName?: string
}) {
  const renderTitle = () => {
    if (!highlight) return title
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-sunstone">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {label && (
        <Reveal>
          <SectionLabel className={labelClassName}>{label}</SectionLabel>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl',
            titleClassName,
          )}
        >
          {renderTitle()}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
