import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

function swipeMs(children: ReactNode) {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.filter((part) => typeof part === 'string').join('')
        : ''
  if (!text.trim()) return 700
  return Math.min(900, Math.max(520, 400 + text.trim().length * 8))
}

export function Highlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setOn(true)
        io.disconnect()
      },
      { threshold: 0.45, rootMargin: '0px 0px -10% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <mark
      ref={ref}
      data-hl=""
      data-on={on ? '' : undefined}
      style={{ '--hl-ms': `${swipeMs(children)}ms` } as CSSProperties}
    >
      {children}
    </mark>
  )
}
