import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: ReactNode
  repeat?: number
}

export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 12,
  ...props
}: MarqueeProps) {
  const items = Array.from({ length: repeat })

  return (
    <div
      {...props}
      className={`group flex overflow-hidden gap-[var(--gap,2rem)] ${className}`}
    >
      {items.map((_, index) => (
        <div
          key={index}
          className={`flex shrink-0 items-center justify-around gap-[var(--gap,2rem)] animate-marquee ${
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          } ${reverse ? '[animation-direction:reverse]' : ''}`}
          aria-hidden={index > 0 ? true : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
