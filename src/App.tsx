import { type ReactNode } from 'react'
import { AsciiField } from './v2/AsciiField'
import { AsciiStage } from './v2/AsciiStage'
import { Highlight } from './v2/Highlight'
import { PicaroFigure } from './v2/PicaroFigure'
import { type Metal } from './v2/metals'

const MAIL = 'mailto:benjamin@velum-labs.com'
const LINKEDIN = 'https://www.linkedin.com/in/benjamzc/'

const INK = 'font-mono text-[#d6d4d0] antialiased'
const MUTED = 'text-[#9a9890]'
const INVERT =
  'no-underline transition-[background-color,color] duration-75 ease-linear hover:bg-[#d6d4d0] hover:text-[#181818] focus-visible:bg-[#d6d4d0] focus-visible:text-[#181818] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d4aff]'

const STATS = [
  ['24', 'Hours'],
  ['~500', 'Participants'],
  ['10k', 'USD already raised'],
  ['3', 'Tracks'],
] as const

const SPONSOR_VALUE = [
  [
    'Product in action',
    'Teams putting your technology to work for 24 hours.',
  ],
  [
    'Talent',
    'Meet selected technical talent before and during the event.',
  ],
  [
    'Real use cases',
    'Prototypes built on your technology to tackle problems in government and business.',
  ],
  [
    'Get involved',
    'Back a challenge or prize, or share your product in a talk or workshop.',
  ],
] as const

const ASKS = [
  [
    '01',
    'Funding',
    'Money for logistics, food, and prizes. We already have $10k.',
  ],
  [
    '02',
    'Credits',
    'For around 500 participants, or for the three winning teams.',
  ],
  ['03', 'Venue', 'A space with tables, internet, and power outlets.'],
] as const

const ORGS = [
  [
    'Velum Labs',
    'San Francisco startup. The 18th Chilean company to join Y Combinator, in 2025.',
  ],
  [
    'Indies',
    'A tech entrepreneurship community in Chile with ~3,000 members. Ran the largest social impact hackathon in Latin America: five countries and ~$50k in prizes.',
  ],
  [
    'Alianza Emprende',
    'Founders from 12 universities. In 2026: ~3,000 signups and over 1,800 attendees.',
  ],
] as const

const TRACKS = [
  [
    '01',
    'Agent-ready government',
    'Public data and systems that agents can access and work with.',
  ],
  [
    '02',
    'Agent-ready business',
    'Agents connected to data and workflows at real businesses.',
  ],
  [
    '03',
    'Agent infrastructure',
    'Tools to build, deploy, and run agents.',
  ],
] as const

const TIERS: {
  title: string
  copy: string
  metal: Metal
  label: string
}[] = [
  {
    title: 'Bronze',
    copy: 'Your brand on the site and event materials, plus introductions to teams and talent interested in what you do.',
    metal: 'bronze',
    label: 'Bronze Indio Pícaro',
  },
  {
    title: 'Silver',
    copy: 'Everything in Bronze, plus a challenge or prize and a talk or workshop.',
    metal: 'silver',
    label: 'Silver Indio Pícaro',
  },
  {
    title: 'Gold',
    copy: 'Everything in Silver, plus a leading role in a track and priority introductions to selected talent.',
    metal: 'gold',
    label: 'Gold Indio Pícaro',
  },
]

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-20 border-t border-[#2a2a2a] pt-12 first:mt-0 first:border-t-0 first:pt-0 md:mt-28 md:pt-16"
    >
      <h2
        id={`${id}-title`}
        className="font-pixel mb-8 text-[32px] leading-[1.1] text-[#d6d4d0] md:mb-10 md:text-[48px]"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function App() {
  return (
    <div className={`min-h-svh bg-[#181818] ${INK}`}>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-5 focus:left-4 focus:z-[80] focus:bg-[#d6d4d0] focus:px-2 focus:text-base focus:leading-[18px] focus:text-[#181818]"
        href="#contenido"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-5">
        <p className="whitespace-nowrap font-mono text-base leading-[18px] tabular-nums">
          7–8 Nov 2026. Santiago, Chile
        </p>
      </header>

      <div id="top">
        <AsciiStage
          title={
            <>
              Infrastructure
              <span className="mt-1 block">Hackathon</span>
            </>
          }
          subtitle="24 hours, ~500 participants, infrastructure for the AI era."
        />
      </div>

      <main
        id="contenido"
        className="relative z-20 mx-auto w-full max-w-[1060px] px-5 pt-20 pb-28 sm:px-8 md:px-10 md:pt-28 md:pb-36"
      >
        <Section id="por-que" title="Why">
          <div className="max-w-[40rem] space-y-6 font-mono text-base leading-7 text-[#d6d4d0] md:leading-8">
            <p>
              <Highlight>
                An agent gets stuck when it can't access a real system.
              </Highlight>{' '}
              Public data it can't query, business workflows it can't run,
              tools that never make it to production.
            </p>
            <p className={MUTED}>
              On November 7–8, 2026, around 500 participants will spend 24 hours
              building that infrastructure in Santiago. Teams of 2–4,
              selected through applications.
            </p>
          </div>
        </Section>

        <section
          aria-label="By the numbers"
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 md:grid-cols-4 md:gap-x-10"
        >
          {STATS.map(([value, label]) => (
            <div key={label}>
              <p className="font-pixel text-[32px] leading-none text-[#d6d4d0] md:text-[48px]">
                {value}
              </p>
              <p
                className={`mt-3 font-mono text-base leading-[18px] ${MUTED}`}
              >
                {label}
              </p>
            </div>
          ))}
        </section>

        <Section id="organizadores" title="Who’s behind it">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-12">
            {ORGS.map(([title, copy]) => (
              <li key={title}>
                <p className="font-pixel text-base leading-[18px] text-[#d6d4d0]">
                  {title}
                </p>
                <p
                  className={`mt-3 max-w-[28rem] font-mono text-base leading-7 ${MUTED}`}
                >
                  {copy}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="tracks" title="Tracks">
          <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-12">
            <div className="min-h-[28rem] md:min-h-[36rem]">
              <AsciiField
                src="/brand/track-infra-6153725.mp4"
                poster="/brand/track-infra-6153725.jpg"
                invert
                className="h-full"
              />
            </div>
            <ol className="grid content-center gap-12">
              {TRACKS.map(([n, title, copy]) => (
                <li
                  key={title}
                  className="grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-3 md:gap-x-10"
                >
                  <span className={`font-mono text-base leading-none md:text-lg ${MUTED}`}>
                    {n}
                  </span>
                  <p className="font-pixel text-[24px] leading-[1.1] text-[#d6d4d0] md:text-[32px]">
                    {title}
                  </p>
                  <p
                    className={`col-start-2 max-w-[36rem] font-mono text-base leading-7 ${MUTED}`}
                  >
                    {copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="sponsors" title="Why sponsor">
          <p className="max-w-[40rem] font-mono text-base leading-7 text-[#d6d4d0] md:leading-8">
            For 24 hours, selected teams will build with real tools.{' '}
            <Highlight>As a sponsor, you put your technology in their hands.</Highlight>
          </p>
          <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
            {SPONSOR_VALUE.map(([title, copy]) => (
              <li key={title}>
                <p className="font-pixel text-base leading-[18px] text-[#d6d4d0]">
                  {title}
                </p>
                <p
                  className={`mt-3 max-w-[28rem] font-mono text-base leading-7 ${MUTED}`}
                >
                  {copy}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="pedimos" title="What we need">
          <ol className="grid gap-10 md:gap-12">
            {ASKS.map(([n, title, copy]) => (
              <li
                key={title}
                className="grid gap-3 md:grid-cols-[4rem_minmax(0,36rem)] md:gap-10"
              >
                <span className={`font-mono text-base leading-[18px] ${MUTED}`}>
                  {n}
                </span>
                <div>
                  <p className="font-pixel text-base leading-[18px] text-[#d6d4d0]">
                    {title}
                  </p>
                  <p
                    className={`mt-3 max-w-[40rem] font-mono text-base leading-7 ${MUTED}`}
                  >
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="niveles" title="How to sponsor">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-12">
            {TIERS.map(({ title, copy, metal, label }) => (
              <li key={title}>
                <PicaroFigure metal={metal} label={label} />
                <p className="font-pixel mt-6 text-[32px] leading-[1.1] text-[#d6d4d0] md:text-[48px]">
                  {title}
                </p>
                <p
                  className={`mt-3 max-w-[24rem] font-mono text-base leading-7 ${MUTED}`}
                >
                  {copy}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="escribir" title="Talk to Benjamin">
          <p className={`mb-6 max-w-[40rem] font-mono text-base leading-7 ${MUTED}`}>
            <Highlight>
              Sponsors who join early help shape the challenges, prizes,
              and spaces at the event.
            </Highlight>
          </p>
          <p className="max-w-[40rem] font-mono text-base leading-7">
            <a className={INVERT} href={MAIL}>
              benjamin@velum-labs.com
            </a>
          </p>
          <p className={`mt-5 font-mono text-base leading-7 ${MUTED}`}>
            <a className={INVERT} href={LINKEDIN} target="_blank" rel="noreferrer">
              Benjamin’s LinkedIn
            </a>
          </p>
        </Section>
      </main>
    </div>
  )
}
