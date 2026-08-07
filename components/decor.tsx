import { cn } from '@/lib/utils'

/* Soft blurred brand-colored glow orb for depth */
export function GlowOrb({
  className,
  color = 'primary',
}: {
  className?: string
  color?: 'primary' | 'mint' | 'ember'
}) {
  const bg =
    color === 'mint'
      ? 'bg-mint/20'
      : color === 'ember'
        ? 'bg-ember/20'
        : 'bg-primary/20'
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-0 rounded-full blur-3xl animate-floaty',
        bg,
        className,
      )}
    />
  )
}

/* Dotted field with a radial fade */
export function DotField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-0 bg-dots opacity-[0.5] mask-radial',
        className,
      )}
    />
  )
}

/* Diagonal hairline texture */
export function DiagonalLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-0 bg-diagonal',
        className,
      )}
    />
  )
}

/* A blueprint-style plus/tick marker */
export function PlusMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute text-border', className)}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2v16M2 10h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
