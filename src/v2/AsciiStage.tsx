import { type ReactNode } from 'react'
import { AsciiField } from './AsciiField'

/** Previous flag clip: `/brand/stage.mp4` + `/brand/stage.jpg` (Pexels 20452931). */
export const STAGE = {
  src: '/brand/stage-313898.mp4',
  poster: '/brand/stage-313898.jpg',
} as const

export function AsciiStage({
  title,
  subtitle,
}: {
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <AsciiField
      src={STAGE.src}
      poster={STAGE.poster}
      preload="auto"
      className="h-svh min-h-[32rem]"
    >
      <div className="pointer-events-none absolute bottom-8 left-4 z-10">
        <h1 className="font-pixel text-[32px] leading-[1.1] text-[#d6d4d0] sm:text-[48px] md:text-[64px]">
          {title}
        </h1>
        <p className="mt-4 whitespace-nowrap font-mono text-base leading-[18px] text-[#9a9890]">
          {subtitle}
        </p>
      </div>
    </AsciiField>
  )
}
