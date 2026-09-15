import { useEffect, useRef, useState } from 'react'
import { ImageGalaxy, buildParticles, type GalaxyParticle } from './engine'

export const PAST = [
  { src: '/brand/past/past-01.webp', width: 600, height: 800 },
  { src: '/brand/past/past-02.webp', width: 800, height: 600 },
  { src: '/brand/past/past-03.webp', width: 800, height: 600 },
  { src: '/brand/past/past-04.webp', width: 800, height: 533 },
  { src: '/brand/past/past-05.webp', width: 800, height: 600 },
  { src: '/brand/past/past-06.webp', width: 800, height: 370 },
  { src: '/brand/past/past-07.webp', width: 800, height: 600 },
  { src: '/brand/past/past-08.webp', width: 800, height: 600 },
  { src: '/brand/past/past-09.webp', width: 800, height: 533 },
] as const

export function ImageGalaxyField() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const host = root

    let dead = false
    let galaxy: ImageGalaxy | null = null
    let defs: GalaxyParticle[] = []
    let inView = false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const items = [
      ...root.querySelectorAll<HTMLElement>('[data-galaxy-item]'),
    ]
    const overlays = items.map((el) =>
      el.querySelector<HTMLElement>('[data-galaxy-overlay]'),
    )

    function syncMotion() {
      if (!galaxy) return
      const play = inView && !document.hidden && !reduce.matches
      if (play) galaxy.start()
      else galaxy.stop()
    }

    function place() {
      if (!galaxy) return
      galaxy.layout()
      if (!reduce.matches) return
      items.forEach((el, i) => {
        const d = defs[i]
        if (d) el.style.transform = `translate3d(0, 0px, ${d.z}px)`
      })
    }

    async function boot() {
      await Promise.all(
        items.map((el) => {
          const img = el.querySelector('img')
          if (!img) return Promise.resolve()
          if (img.complete) return img.decode().catch(() => undefined)
          return new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
          }).then(() => img.decode().catch(() => undefined))
        }),
      )
      if (dead) return
      defs = buildParticles(items.length)
      galaxy = new ImageGalaxy(host, items, overlays, defs)
      place()
      setReady(true)
      syncMotion()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting)
        syncMotion()
      },
      { rootMargin: '20% 0px' },
    )
    io.observe(host)

    const onWheel = (e: WheelEvent) => {
      if (!inView || reduce.matches || !galaxy) return
      const sign = Math.sign(e.deltaY)
      if (sign === 0) return
      galaxy.addScroll(e.deltaY, sign)
    }

    let lastW = 0
    let lastH = 0
    const ro = new ResizeObserver(() => {
      if (!galaxy) return
      const w = host.clientWidth
      const h = host.clientHeight
      if (w === lastW && h === lastH) return
      lastW = w
      lastH = h
      place()
    })

    const onVis = () => syncMotion()
    window.addEventListener('wheel', onWheel, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    reduce.addEventListener('change', onVis)
    ro.observe(host)
    void boot()

    return () => {
      dead = true
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('visibilitychange', onVis)
      reduce.removeEventListener('change', onVis)
      galaxy?.destroy()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_5rem,black_calc(100%-5rem),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_5rem,black_calc(100%-5rem),transparent)]"
    >
      <div
        ref={rootRef}
        className={`absolute inset-x-0 -top-[max(16rem,50%)] -bottom-[max(16rem,50%)] [perspective:700px] [transform-style:preserve-3d] ${ready ? 'opacity-55' : 'opacity-0'} motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out`}
      >
        {PAST.map((img) => (
          <figure
            key={img.src}
            data-galaxy-item=""
            className="absolute top-0 left-0 w-[min(42vw,9.75rem)] origin-center md:w-[min(16vw,12.5rem)]"
          >
            <img
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              decoding="async"
              draggable={false}
              className="block h-auto w-full"
            />
            <span
              data-galaxy-overlay=""
              className="absolute inset-0 bg-white opacity-0"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
