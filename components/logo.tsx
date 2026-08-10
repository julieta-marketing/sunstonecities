import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/sunstone-cities-logo.png"
      alt="Sunstone Cities"
      width={820}
      height={280}
      priority
      className={cn('h-9 w-auto', className)}
    />
  )
}
