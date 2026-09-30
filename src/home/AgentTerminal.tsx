import { useEffect, useRef, useState } from 'react'

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'ok'; text: string }
  | { kind: 'err'; text: string }
  | { kind: 'dim'; text: string }

/**
 * A live agent session that keeps hitting real-world systems and getting
 * locked out — the problem the hackathon exists to fix. Types itself out,
 * loops forever, respects reduced-motion (renders the full transcript still).
 */
const SCRIPT: { prompt: string; lines: Line[] }[] = [
  {
    prompt: 'agent> GET api.gov/permits?owner=me',
    lines: [
      { kind: 'dim', text: 'resolving host ................ ok' },
      { kind: 'dim', text: 'negotiating auth .............. ok' },
      { kind: 'err', text: '403  no machine access. humans only.' },
    ],
  },
  {
    prompt: 'agent> POST erp.acme/orders  {sku:"A-19"}',
    lines: [
      { kind: 'dim', text: 'reading openapi spec .......... 404' },
      { kind: 'err', text: 'ERR  no schema. this system was never meant for you.' },
    ],
  },
  {
    prompt: 'agent> QUERY registro-civil/status',
    lines: [
      { kind: 'dim', text: 'connecting ................... timeout' },
      { kind: 'err', text: 'ERR  the data exists. you just can\u2019t reach it.' },
    ],
  },
]

const UNLOCK: Line[] = [
  { kind: 'dim', text: '// 7\u20138 nov 2026 \u00b7 santiago \u00b7 24h' },
  { kind: 'ok', text: 'BUILD  the infrastructure the agent was missing.' },
  { kind: 'ok', text: 'STATUS  applications open \u2014 teams of 2\u20134.' },
]

const CHAR_MS = 22
const LINE_MS = 320
const HOLD_MS = 1400

export function AgentTerminal() {
  const [rendered, setRendered] = useState<Line[]>([])
  const [typing, setTyping] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const all: Line[] = [
        ...SCRIPT.flatMap((s) => [
          { kind: 'cmd', text: s.prompt } as Line,
          ...s.lines,
        ]),
        ...UNLOCK,
      ]
      setRendered(all)
      setUnlocked(true)
      return
    }

    let dead = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((r) => timers.push(setTimeout(r, ms)))

    async function typeLine(text: string) {
      for (let i = 1; i <= text.length; i++) {
        if (dead) return
        setTyping(text.slice(0, i))
        await wait(CHAR_MS)
      }
    }

    async function run() {
      // eslint-disable-next-line no-constant-condition
      while (!dead) {
        setRendered([])
        setUnlocked(false)
        for (const step of SCRIPT) {
          if (dead) return
          await typeLine(step.prompt)
          if (dead) return
          setRendered((r) => [...r, { kind: 'cmd', text: step.prompt }])
          setTyping('')
          for (const line of step.lines) {
            if (dead) return
            await wait(LINE_MS)
            setRendered((r) => [...r, line])
          }
          await wait(HOLD_MS)
        }
        if (dead) return
        await wait(600)
        setUnlocked(true)
        for (const line of UNLOCK) {
          if (dead) return
          await wait(LINE_MS)
          setRendered((r) => [...r, line])
        }
        await wait(HOLD_MS * 3)
      }
    }

    void run()
    return () => {
      dead = true
      timers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [rendered, typing])

  return (
    <div
      className={`relative h-full w-full overflow-hidden border bg-[#101010]/80 backdrop-blur-[1px] transition-colors duration-700 ${
        unlocked ? 'border-[#6d4aff]/60' : 'border-[#2a2a2a]'
      }`}
    >
      <div
        ref={scrollRef}
        aria-hidden
        className="h-full space-y-1 overflow-hidden px-4 py-4 font-mono text-[13px] leading-6 md:text-sm"
      >
        {rendered.map((line, i) => (
          <p
            key={i}
            className={
              line.kind === 'cmd'
                ? 'text-[#d6d4d0]'
                : line.kind === 'err'
                  ? 'text-[#ff5f56]'
                  : line.kind === 'ok'
                    ? 'text-[#6d4aff]'
                    : 'text-[#6b6b64]'
            }
          >
            {line.text}
          </p>
        ))}
        {typing && (
          <p className="text-[#d6d4d0]">
            {typing}
            <span className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] animate-pulse bg-[#d6d4d0]" />
          </p>
        )}
      </div>
    </div>
  )
}
