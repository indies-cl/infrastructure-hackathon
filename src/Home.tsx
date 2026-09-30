import { type ReactNode, useLayoutEffect } from 'react'
import { AsciiField } from './v2/AsciiField'
import { Highlight } from './v2/Highlight'
import { ImageGalaxyField } from './v2/image-galaxy/ImageGalaxyField'
import { AgentTerminal } from './home/AgentTerminal'
import { Boot } from './home/Boot'
import { homeMessages } from './i18n/messages'
import { HOME_META } from './i18n/meta'
import {
  LOCALE_COOKIE,
  homePath,
  htmlLang,
  localePath,
  otherLocale,
  type Locale,
} from './i18n/locale'

const APPLY =
  'mailto:benjamin@velum-labs.com?subject=Infrastructure%20Hackathon%20—%20Application'

const INK = 'font-mono text-[#d6d4d0] antialiased'
const MUTED = 'text-[#9a9890]'
const INVERT =
  'no-underline transition-[background-color,color] duration-75 ease-linear hover:bg-[#d6d4d0] hover:text-[#181818] focus-visible:bg-[#d6d4d0] focus-visible:text-[#181818] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d4aff]'
const BTN =
  'inline-block bg-[#6d4aff] px-3 py-2 font-mono text-base leading-[18px] text-[#f4f2ee] no-underline transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-[#7d5cff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d4aff] active:scale-[0.97]'

const ORG_LOGOS = [
  { logo: '/brand/orgs/velum.webp', width: 512, height: 512 },
  { logo: '/brand/orgs/indies.webp', width: 140, height: 140 },
  { logo: '/brand/orgs/ae.webp', width: 512, height: 512 },
] as const

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
      className="mt-24 border-t border-[#2a2a2a] pt-12 md:mt-32 md:pt-16"
    >
      <h2
        id={`${id}-title`}
        className="font-pixel mb-8 max-w-[20ch] text-[32px] leading-[1.05] text-[#d6d4d0] md:mb-10 md:text-[48px]"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function Home({ locale }: { locale: Locale }) {
  const t = homeMessages[locale]
  const next = otherLocale(locale)

  useLayoutEffect(() => {
    document.documentElement.lang = htmlLang(locale)
    document.title = HOME_META[locale].title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', HOME_META[locale].description)
  }, [locale])

  return (
    <div className={`min-h-svh bg-[#181818] ${INK}`}>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-5 focus:left-4 focus:z-[80] focus:bg-[#d6d4d0] focus:px-2 focus:text-base focus:leading-[18px] focus:text-[#181818]"
        href="#contenido"
      >
        {t.skip}
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-5">
        <span className="font-mono text-base leading-[18px] tabular-nums text-[#9a9890]">
          {t.place}
        </span>
        <a className={`pointer-events-auto ${BTN}`} href={APPLY}>
          {t.applyCta}
        </a>
      </header>

      {/* HERO — statement left, live agent session right, ASCII flag behind */}
      <section id="top" className="relative isolate min-h-svh overflow-hidden">
        <AsciiField
          src="/brand/stage-313898.mp4"
          poster="/brand/stage-313898.jpg"
          preload="auto"
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#181818] via-[#181818]/70 to-transparent"
        />
        <div className="mx-auto grid min-h-svh w-full max-w-[1160px] grid-cols-1 content-center items-center gap-10 px-5 pt-32 pb-20 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-10 md:pt-28">
          <div>
            <h1 className="font-pixel text-[40px] leading-[1.02] text-[#d6d4d0] sm:text-[56px] md:text-[76px]">
              {t.heroLine1}
              <span className="mt-1 block text-[#6d4aff]">{t.heroLine2}</span>
            </h1>
            <p className="mt-6 max-w-[42ch] font-mono text-base leading-7 text-[#9a9890] md:text-lg md:leading-8">
              {t.heroSub}
            </p>
            <div className="mt-9">
              <a className={BTN} href={APPLY}>
                {t.applyCta}
              </a>
            </div>
          </div>

          <div className="h-[22rem] w-full md:h-[30rem]">
            <AgentTerminal />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#181818] to-transparent"
        />
      </section>

      <main
        id="contenido"
        className="relative z-20 mx-auto w-full max-w-[1160px] px-5 pb-28 sm:px-8 md:px-10 md:pb-36"
      >
        {/* THESIS — the wall */}
        <section id="muro" aria-label={t.thesisLead} className="pt-20 md:pt-28">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div className="border-l-2 border-[#6d4aff] pl-5">
              <Boot lines={t.bootLines} />
            </div>
            <div className="space-y-6 font-mono text-lg leading-8 text-[#d6d4d0] md:text-xl md:leading-9">
              <p>
                {t.thesisLead} <Highlight>{t.thesisHighlight}</Highlight>
              </p>
              <p className={`text-base leading-7 md:text-lg ${MUTED}`}>
                {t.thesisBody}
              </p>
            </div>
          </div>

          <section
            aria-label={t.statsLabel}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[#2a2a2a] pt-12 md:mt-20 md:grid-cols-4 md:gap-x-10"
          >
            {t.stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-pixel text-[36px] leading-none text-[#d6d4d0] md:text-[56px]">
                  {value}
                </p>
                <p className={`mt-3 font-mono text-base leading-[18px] ${MUTED}`}>
                  {label}
                </p>
              </div>
            ))}
          </section>
        </section>

        {/* TRACKS — three systems to break open */}
        <Section id="tracks" title={t.tracksTitle}>
          <ul className="grid gap-px overflow-hidden border border-[#2a2a2a] bg-[#2a2a2a] md:grid-cols-3">
            {t.tracks.map(({ n, code, title, copy }) => (
              <li
                key={title}
                className="group relative flex flex-col gap-4 bg-[#151515] p-6 transition-colors duration-200 hover:bg-[#1c1830] md:p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className={`font-mono text-base ${MUTED}`}>{n}</span>
                  <code className="font-mono text-[13px] text-[#6d4aff] transition-colors group-hover:text-[#8f74ff]">
                    {code}
                  </code>
                </div>
                <p className="font-pixel text-[22px] leading-[1.1] text-[#d6d4d0] md:text-[26px]">
                  {title}
                </p>
                <p className={`font-mono text-base leading-7 ${MUTED}`}>{copy}</p>
                <span
                  aria-hidden
                  className="mt-auto block h-px w-full origin-left scale-x-0 bg-[#6d4aff] transition-transform duration-300 group-hover:scale-x-100"
                />
              </li>
            ))}
          </ul>
        </Section>

        {/* FORMAT — the 24 hours */}
        <Section id="formato" title={t.formatTitle}>
          <ol className="grid gap-px overflow-hidden border border-[#2a2a2a] bg-[#2a2a2a] md:grid-cols-3">
            {t.format.map(({ n, title, copy }) => (
              <li key={title} className="bg-[#151515] p-6 md:p-8">
                <span className="font-pixel text-[40px] leading-none text-[#6d4aff]/70 md:text-[56px]">
                  {n}
                </span>
                <p className="mt-4 font-pixel text-[18px] leading-[1.15] text-[#d6d4d0] md:text-[20px]">
                  {title}
                </p>
                <p className={`mt-3 font-mono text-base leading-7 ${MUTED}`}>{copy}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      {/* WHO — galaxy of past-event photos behind the organizers */}
      <section
        id="quienes"
        aria-labelledby="quienes-title"
        className="relative isolate mt-24 overflow-hidden border-y border-[#2a2a2a] py-16 md:mt-32 md:py-24"
      >
        <div className="absolute inset-0 -z-10 opacity-90">
          <ImageGalaxyField />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[#181818]/55"
        />
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8 md:px-10">
          <h2
            id="quienes-title"
            className="font-pixel mb-10 text-[32px] leading-[1.05] text-[#d6d4d0] md:mb-12 md:text-[48px]"
          >
            {t.whoTitle}
          </h2>
          <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
            {t.orgs.map((org, i) => (
              <li
                key={org.title}
                className="border border-[#2a2a2a] bg-[#151515]/85 p-6 backdrop-blur-sm md:p-7"
              >
                <img
                  src={ORG_LOGOS[i].logo}
                  alt=""
                  width={ORG_LOGOS[i].width}
                  height={ORG_LOGOS[i].height}
                  decoding="async"
                  loading="lazy"
                  className="mb-5 size-14 rounded-lg object-contain md:size-16"
                />
                <p className="font-pixel text-base leading-[18px] text-[#d6d4d0]">
                  {org.title}
                </p>
                <p className={`mt-3 font-mono text-base leading-7 ${MUTED}`}>
                  {org.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main className="relative z-20 mx-auto w-full max-w-[1160px] px-5 pb-28 sm:px-8 md:px-10 md:pb-36">
        {/* FAQ */}
        <Section id="faq" title={t.faqTitle}>
          <dl className="grid gap-px overflow-hidden border border-[#2a2a2a] bg-[#2a2a2a] md:grid-cols-2">
            {t.faq.map(({ q, a }) => (
              <div key={q} className="bg-[#151515] p-6 md:p-7">
                <dt className="font-pixel text-base leading-[1.3] text-[#d6d4d0]">
                  {q}
                </dt>
                <dd className={`mt-3 font-mono text-base leading-7 ${MUTED}`}>{a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>

      {/* APPLY — purple close */}
      <section
        id="postular"
        aria-labelledby="postular-title"
        className="relative isolate overflow-hidden bg-[#6d4aff] text-[#f4f2ee]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]"
        />
        <div className="relative mx-auto max-w-[1160px] px-5 py-24 sm:px-8 md:px-10 md:py-36">
          <h2
            id="postular-title"
            className="font-pixel max-w-[16ch] text-[44px] leading-[1.02] md:text-[72px]"
          >
            {t.applyTitle}
          </h2>
          <p className="mt-6 max-w-[52ch] font-mono text-lg leading-8 md:text-xl md:leading-9">
            {t.applyLead}
          </p>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <a
              className="inline-block bg-[#f4f2ee] px-4 py-3 font-mono text-lg leading-[18px] text-[#181818] no-underline transition-transform duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#181818] active:scale-[0.97]"
              href={APPLY}
            >
              {t.applyCta}
            </a>
            <span className="font-mono text-base text-[#f4f2ee]/75">
              {t.applyHighlight}
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex w-full max-w-[1160px] flex-wrap items-center justify-between gap-4 px-5 py-12 font-mono text-base sm:px-8 md:px-10">
        <a className={INVERT} href={localePath(locale)}>
          {t.sponsorLink}
        </a>
        <a
          className={INVERT}
          href={`${homePath(next)}${window.location.search}${window.location.hash}`}
          hrefLang={htmlLang(next)}
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
          }}
        >
          {t.seeOther}
        </a>
      </footer>
    </div>
  )
}
