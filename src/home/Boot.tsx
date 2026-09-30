import { useEffect, useState } from 'react'

/** Types a status line char-by-char, then holds. Reduced-motion shows it whole. */
export function Boot({ lines }: { lines: string[] }) {
  const [shown, setShown] = useState<string[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(lines)
      return
    }
    let dead = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((r) => timers.push(setTimeout(r, ms)))

    async function run() {
      for (const line of lines) {
        for (let i = 1; i <= line.length; i++) {
          if (dead) return
          setActive(line.slice(0, i))
          await wait(14)
        }
        if (dead) return
        setShown((s) => [...s, line])
        setActive('')
        await wait(160)
      }
    }
    void run()
    return () => {
      dead = true
      timers.forEach(clearTimeout)
    }
  }, [lines])

  return (
    <div className="font-mono text-[13px] leading-6 text-[#6b6b64] md:text-sm">
      {shown.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
      {active && (
        <p className="text-[#9a9890]">
          {active}
          <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.12em] animate-pulse bg-[#9a9890]" />
        </p>
      )}
    </div>
  )
}
