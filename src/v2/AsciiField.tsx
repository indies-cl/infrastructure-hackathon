import { useEffect, useRef, type ReactNode } from 'react'
import { createAsciiVideo } from './ascii-video'

const RATE = 0.75

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function AsciiField({
  src,
  poster,
  still = false,
  invert = false,
  preload = 'metadata',
  className,
  children,
}: {
  src: string
  poster?: string
  still?: boolean
  invert?: boolean
  preload?: 'auto' | 'metadata' | 'none'
  className?: string
  children?: ReactNode
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const stageEl = stageRef.current
    const fieldEl = fieldRef.current
    const source = still ? imageRef.current : videoRef.current
    if (!stageEl || !fieldEl || !source) return

    const host: HTMLDivElement = stageEl
    const field = createAsciiVideo(fieldEl, source, invert)
    const reduce = prefersReducedMotion()
    let raf = 0
    let visible = true
    let dead = false

    function resize() {
      const width = host.clientWidth
      const height = host.clientHeight
      if (width < 2 || height < 2) return
      field?.resize(width, height)
      field?.draw()
    }

    function loop() {
      if (dead) return
      if (visible && !document.hidden) field?.draw()
      raf = requestAnimationFrame(loop)
    }

    function holdStill() {
      if (!(source instanceof HTMLVideoElement)) return
      source.pause()
      if (Number.isFinite(source.duration) && source.duration > 0) {
        source.currentTime = Math.min(2.4, source.duration * 0.4)
      }
    }

    function playField() {
      if (!(source instanceof HTMLVideoElement)) {
        field?.draw()
        return
      }
      if (reduce || !visible || document.hidden) {
        holdStill()
        return
      }
      source.playbackRate = RATE
      void source.play().catch(() => {})
    }

    if (source instanceof HTMLVideoElement) {
      source.defaultPlaybackRate = RATE
      source.playbackRate = RATE
      source.loop = true
      source.muted = true
      source.playsInline = true
    }

    resize()

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true
        playField()
      },
      { threshold: 0.05 },
    )
    io.observe(host)

    const box = new ResizeObserver(() => resize())
    box.observe(host)

    const onVis = () => playField()
    document.addEventListener('visibilitychange', onVis)
    const onLoaded = () => {
      if (reduce) holdStill()
      field?.draw()
    }
    source.addEventListener('loadeddata', onLoaded)
    source.addEventListener('load', onLoaded)

    playField()
    if (!still && !reduce) raf = requestAnimationFrame(loop)
    else {
      holdStill()
      field?.draw()
    }

    void document.fonts.ready.then(() => {
      if (dead) return
      field?.refreshAtlas()
      field?.draw()
    })

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      io.disconnect()
      box.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      source.removeEventListener('loadeddata', onLoaded)
      source.removeEventListener('load', onLoaded)
      if (source instanceof HTMLVideoElement) source.pause()
      field?.destroy()
    }
  }, [src, still, invert])

  return (
    <div
      ref={stageRef}
      className={`relative isolate overflow-hidden bg-[#181818] ${className ?? ''}`}
    >
      {still ? (
        <img
          ref={imageRef}
          className="pointer-events-none absolute h-px w-px opacity-0"
          src={src}
          alt=""
          aria-hidden
        />
      ) : (
        <video
          ref={videoRef}
          className="pointer-events-none absolute h-px w-px opacity-0"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload={preload}
          aria-hidden
        />
      )}
      <canvas
        ref={fieldRef}
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      />
      {children}
    </div>
  )
}
