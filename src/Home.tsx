import { useLayoutEffect } from 'react'
import { Marquee } from './components/Marquee'
import { OrgLogo } from './components/OrgLogo'
import { uiSound } from './ui-sound'
import { AsciiField } from './v2/AsciiField'
import { homeMessages, type OrgId } from './i18n/messages'
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
  'mailto:benjamin@velum-labs.com?subject=Infrastructure%20Hackathon%20%E2%80%94%20Register%20your%20team'

/** Mixkit 40938, silhouette of hands. Free to use. Center-cropped square. */
const HAND = {
  src: '/brand/hand.mp4',
  poster: '/brand/hand.jpg',
} as const

const ORGS = [
  { id: 'velum', name: 'Velum Labs (YC W26)', logo: '/brand/orgs/velum.webp', size: 512 },
  { id: 'indies', name: 'indies.cl', logo: '/brand/orgs/indies.webp', size: 140 },
  { id: 'ae', name: 'Alianza Emprende', logo: '/brand/orgs/ae.webp', size: 512 },
] as const satisfies readonly { id: OrgId; name: string; logo: string; size: number }[]

const RULE = 'border-[#d6d4d0]'

function Door({
  href,
  action,
  label,
  className,
}: {
  href: string
  action: string
  label: string
  className?: string
}) {
  return (
    <a
      href={href}
      {...uiSound}
      className={`group flex h-full min-h-0 flex-col justify-between no-underline outline-none transition-colors duration-75 ease-linear hover:bg-[#181818] focus-visible:bg-[#181818] focus-visible:outline-2 focus-visible:outline-[#6d4aff] focus-visible:-outline-offset-2 ${className ?? ''}`}
    >
      <span className="w-fit self-start font-mono text-lg leading-7 text-[#181818] transition-colors duration-75 ease-linear group-hover:text-[#f4f2ee] group-focus-visible:text-[#f4f2ee] md:text-xl lg:text-2xl lg:leading-8">
        {action}
      </span>
      <span
        aria-hidden
        className="self-end font-mono text-base leading-[18px] text-[#5a5956] transition-colors duration-75 ease-linear group-hover:text-[#9a9890] group-focus-visible:text-[#9a9890]"
      >
        {label}
      </span>
    </a>
  )
}

export default function Home({ locale }: { locale: Locale }) {
  const t = homeMessages[locale]
  const next = otherLocale(locale)

  useLayoutEffect(() => {
    document.documentElement.lang = htmlLang(locale)
    document.documentElement.style.backgroundColor = '#f4f2ee'
    document.documentElement.style.colorScheme = 'light'
    document.title = HOME_META[locale].title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', HOME_META[locale].description)

    return () => {
      document.documentElement.style.backgroundColor = ''
      document.documentElement.style.colorScheme = ''
    }
  }, [locale])

  return (
    <div className="min-h-svh bg-[#f4f2ee] font-mono text-[#181818] antialiased">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-5 focus:left-4 focus:z-[80] focus:bg-[#181818] focus:px-2 focus:text-base focus:leading-[18px] focus:text-[#f4f2ee]"
        href="#contenido"
      >
        {t.skip}
      </a>

      <section
        id="top"
        aria-labelledby="hero-title"
        className={`grid h-svh grid-cols-1 grid-rows-[auto_auto_minmax(6.5rem,1fr)_minmax(6.5rem,1fr)] border-b md:grid-cols-[minmax(0,1.22fr)_minmax(16.5rem,0.78fr)] md:grid-rows-2 ${RULE}`}
      >
        <div className="min-w-0 px-4 pt-6 md:col-start-1 md:row-start-1 md:px-6 md:pt-10 md:pr-8">
          <p className="mb-2 font-mono text-base leading-7 text-[#5a5956] md:mb-3 md:text-lg md:leading-8">
            {t.heroDate}
          </p>
          <h1
            id="hero-title"
            className="w-full font-pixel text-4xl leading-[1.1] text-balance text-[#181818] sm:text-6xl md:text-7xl"
          >
            {t.heroTitle}
          </h1>
        </div>

        <div className="flex flex-col justify-between gap-6 px-4 pt-6 pb-4 md:col-start-1 md:row-start-2 md:px-6 md:pt-4 md:pr-10">
          <p className="max-w-[36ch] font-mono text-base leading-7 text-[#5a5956] md:text-lg md:leading-8">
            {t.heroSub}
          </p>
          <ul className="flex gap-3 md:gap-4">
            {ORGS.map(({ id, ...org }) => (
              <li key={id}>
                <OrgLogo {...org} description={t.orgs[id]} />
              </li>
            ))}
          </ul>
        </div>

        <Door
          href={APPLY}
          action={t.register}
          label={t.participants}
          className={`border-t px-4 pt-6 pb-3 md:col-start-2 md:row-start-1 md:border-t-0 md:border-b md:border-l md:px-6 md:pt-10 md:pb-3 ${RULE}`}
        />
        <Door
          href={localePath(locale)}
          action={t.sponsor}
          label={t.companies}
          className={`border-t px-4 pt-6 pb-4 md:col-start-2 md:row-start-2 md:border-t-0 md:border-l md:px-6 md:pt-6 md:pb-4 ${RULE}`}
        />
      </section>

      <aside
        aria-label={t.register}
        className={`sticky top-0 z-40 border-b ${RULE}`}
      >
        <a
          href={APPLY}
          {...uiSound}
          className="group block bg-[#f4f2ee] py-3 text-[#181818] no-underline outline-none transition-colors duration-75 ease-linear hover:bg-[#181818] hover:text-[#f4f2ee] focus-visible:bg-[#181818] focus-visible:text-[#f4f2ee] focus-visible:outline-2 focus-visible:outline-[#6d4aff] focus-visible:-outline-offset-2 md:py-3.5"
        >
          <Marquee pauseOnHover className="[--duration:4s] [--gap:3rem]">
            <span className="font-mono text-base uppercase tracking-wider md:text-lg">
              {t.register}
            </span>
            <span
              aria-hidden
              className="font-mono text-base text-[#5a5956] transition-colors duration-75 ease-linear group-hover:text-[#9a9890] md:text-lg"
            >
              {'->'}
            </span>
          </Marquee>
        </a>
      </aside>

      <section
        id="contenido"
        className="flex min-h-svh items-center px-4 py-12 md:px-6 md:py-16"
      >
        <div className="grid w-full items-start gap-8 md:grid-cols-[minmax(16rem,24rem)_minmax(0,1fr)] md:items-stretch md:gap-x-12">
          <figure className={`aspect-square w-full border bg-[#181818] ${RULE}`}>
            <AsciiField
              src={HAND.src}
              poster={HAND.poster}
              invert
              floor={0}
              preload="metadata"
              className="size-full"
            />
            <figcaption className="sr-only">{t.handLabel}</figcaption>
          </figure>
          <div className="flex max-w-[46ch] flex-col gap-10 font-mono text-lg leading-8 text-[#181818] md:h-full md:justify-between md:gap-12 md:py-1 md:text-xl md:leading-9">
            <div className="space-y-4">
              <p>{t.stuckLead}</p>
              <p>{t.stuckBody}</p>
            </div>
            <p className="tabular-nums">{t.facts}</p>
          </div>
        </div>
      </section>

      <footer className="px-4 pt-2 pb-10 md:px-6">
        <a
          className="font-mono text-base leading-7 text-[#5a5956] no-underline transition-[background-color,color] duration-75 ease-linear hover:bg-[#181818] hover:text-[#f4f2ee] focus-visible:bg-[#181818] focus-visible:text-[#f4f2ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d4aff]"
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
