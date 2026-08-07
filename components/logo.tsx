import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'default' | 'dark'
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <Image
      src={isDark ? '/sunstone-cities-logo-dark.png' : '/sunstone-cities-logo.png'}
      alt="Sunstone Cities"
      width={isDark ? 813 : 820}
      height={isDark ? 297 : 280}
      priority
      className={cn('h-9 w-auto', className)}
    />
  )
}
