import { useEffect, useRef, type ReactNode } from 'react'
import { createAsciiVideo } from './ascii-video'

const RATE = 0.75

/** Previous flag clip: `/brand/stage.mp4` + `/brand/stage.jpg` (Pexels 20452931). */
const STAGE = {
  src: '/brand/stage-313898.mp4',
  poster: '/brand/stage-313898.jpg',
} as const

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function AsciiStage({
  title,
  subtitle,
}: {
  title: ReactNode
  subtitle: ReactNode
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const stageEl = stageRef.current
    const fieldEl = fieldRef.current
    const video = videoRef.current
    if (!stageEl || !fieldEl || !video) return

    const host: HTMLDivElement = stageEl
    const clip: HTMLVideoElement = video
    const field = createAsciiVideo(fieldEl, clip)
    const reduce = prefersReducedMotion()
    let raf = 0
    let visible = true
    let dead = false

    function resize() {
      field?.resize(host.clientWidth, host.clientHeight)
      field?.draw()
    }

    function loop() {
      if (dead) return
      if (visible && !document.hidden) field?.draw()
      raf = requestAnimationFrame(loop)
    }

    clip.defaultPlaybackRate = RATE
    clip.playbackRate = RATE
    clip.loop = true
    clip.muted = true
    clip.playsInline = true

    function holdStill() {
      clip.pause()
      if (Number.isFinite(clip.duration) && clip.duration > 0) {
        clip.currentTime = Math.min(2.4, clip.duration * 0.4)
      }
    }

    function playField() {
      if (reduce || !visible || document.hidden) {
        holdStill()
        return
      }
      clip.playbackRate = RATE
      void clip.play().catch(() => {})
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

    const onVis = () => playField()
    document.addEventListener('visibilitychange', onVis)
    const onLoaded = () => {
      if (reduce) holdStill()
      field?.draw()
    }
    clip.addEventListener('loadeddata', onLoaded)
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    playField()
    if (!reduce) raf = requestAnimationFrame(loop)
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
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
      clip.removeEventListener('loadeddata', onLoaded)
      clip.pause()
      field?.destroy()
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative isolate h-svh min-h-[32rem] overflow-hidden bg-[#181818]"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute h-px w-px opacity-0"
        src={STAGE.src}
        poster={STAGE.poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <canvas
        ref={fieldRef}
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      />
      <div className="pointer-events-none absolute bottom-8 left-4 z-10">
        <h1 className="font-pixel text-[32px] leading-[1.1] text-[#d6d4d0] sm:text-[48px] md:text-[64px]">
          {title}
        </h1>
        <p className="mt-4 whitespace-nowrap font-mono text-base leading-[18px] text-[#9a9890]">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
