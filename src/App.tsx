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
  ['24', 'Horas'],
  ['~500', 'Participantes'],
  ['10 mil', 'USD ya levantados'],
  ['3', 'Tracks'],
] as const

const SPONSOR_VALUE = [
  [
    'Uso de producto',
    'Tu tecnología puesta a prueba por equipos que construyen durante 24 horas.',
  ],
  [
    'Talento',
    'Conexión directa con talento técnico seleccionado antes y durante el evento.',
  ],
  [
    'Casos reales',
    'Prototipos construidos sobre tu tecnología para problemas de gobierno y empresa.',
  ],
  [
    'Participación',
    'Auspicia un desafío o premio, o comparte tu producto en una charla o workshop.',
  ],
] as const

const ASKS = [
  [
    '01',
    'Financiamiento',
    'Efectivo para operación, comida y premios. Ya hay 10 mil USD.',
  ],
  [
    '02',
    'Créditos',
    'Para unos 500 participantes, o para los tres equipos ganadores.',
  ],
  ['03', 'Sede', 'Un espacio con mesas, internet y enchufes.'],
] as const

const ORGS = [
  [
    'Velum Labs',
    'Startup de San Francisco. 18ª chilena en Y Combinator, 2025.',
  ],
  [
    'Indies',
    'Comunidad de emprendimiento tech en Chile, ~3000 miembros. Organizó el hackathon de impacto social más grande de LatAm: cinco países y ~50 mil USD en premios.',
  ],
  [
    'Alianza Emprende',
    'Founders de 12 universidades. En 2026: ~3000 inscritos y más de 1800 asistentes.',
  ],
] as const

const TRACKS = [
  [
    '01',
    'Agent-ready government',
    'Datos y sistemas públicos que un agente pueda consultar y operar.',
  ],
  [
    '02',
    'Agent-ready business',
    'Agentes conectados a los datos y procesos de empresas reales.',
  ],
  [
    '03',
    'Agent infrastructure',
    'Herramientas para crear, desplegar y operar agentes.',
  ],
] as const

const TIERS: {
  title: string
  copy: string
  metal: Metal
  label: string
}[] = [
  {
    title: 'Bronce',
    copy: 'Marca en el sitio y materiales del evento, y conexión con equipos y talento interesado.',
    metal: 'bronze',
    label: 'Indio Pícaro en bronce',
  },
  {
    title: 'Plata',
    copy: 'Todo Bronce, más un desafío o premio y una charla o workshop.',
    metal: 'silver',
    label: 'Indio Pícaro en plata',
  },
  {
    title: 'Oro',
    copy: 'Todo Plata, más protagonismo en un track y conexión prioritaria con talento seleccionado.',
    metal: 'gold',
    label: 'Indio Pícaro en oro',
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
        Ir al contenido
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-5">
        <p className="whitespace-nowrap font-mono text-base leading-[18px] tabular-nums">
          7–8 Nov 2026. Santiago de Chile
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
          subtitle="24 horas, ~500 participantes, infraestructura para la era de la IA."
        />
      </div>

      <main
        id="contenido"
        className="relative z-20 mx-auto w-full max-w-[1060px] px-5 pt-20 pb-28 sm:px-8 md:px-10 md:pt-28 md:pb-36"
      >
        <Section id="por-que" title="Por qué">
          <div className="max-w-[40rem] space-y-6 font-mono text-base leading-7 text-[#d6d4d0] md:leading-8">
            <p>
              <Highlight>
                Un agente se frena cuando no puede entrar a un sistema real.
              </Highlight>{' '}
              Datos públicos que no se consultan, procesos de empresa que no se
              operan, herramientas que no llegan a producción.
            </p>
            <p className={MUTED}>
              El 7 y 8 de noviembre de 2026, en Santiago, unos 500 participantes
              van a trabajar 24 horas sobre esa infraestructura. Equipos de 2
              a 4, seleccionados por postulación.
            </p>
          </div>
        </Section>

        <section
          aria-label="Cifras"
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

        <Section id="organizadores" title="Quién lo organiza">
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

        <Section id="sponsors" title="Por qué patrocinar">
          <p className="max-w-[40rem] font-mono text-base leading-7 text-[#d6d4d0] md:leading-8">
            Durante 24 horas, equipos seleccionados van a construir sobre
            herramientas reales.{' '}
            <Highlight>Un sponsor pone su tecnología en esas manos.</Highlight>
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

        <Section id="pedimos" title="Qué pedimos">
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

        <Section id="niveles" title="Cómo patrocinar">
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

        <Section id="escribir" title="Escribir a Benjamin">
          <p className={`mb-6 max-w-[40rem] font-mono text-base leading-7 ${MUTED}`}>
            <Highlight>
              Los desafíos, premios y espacios del evento se definen junto a
              los sponsors que se suman temprano.
            </Highlight>
          </p>
          <p className="max-w-[40rem] font-mono text-base leading-7">
            <a className={INVERT} href={MAIL}>
              benjamin@velum-labs.com
            </a>
          </p>
          <p className={`mt-5 font-mono text-base leading-7 ${MUTED}`}>
            <a className={INVERT} href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn de Benjamin
            </a>
          </p>
        </Section>
      </main>
    </div>
  )
}
