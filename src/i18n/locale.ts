export type Locale = 'en' | 'es'

export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE = 'locale'

export function pathLocale(pathname: string): Locale | null {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/en') return 'en'
  if (path === '/es') return 'es'
  return null
}

export function localePath(locale: Locale): string {
  return `/${locale}`
}

export function htmlLang(locale: Locale): string {
  return locale === 'es' ? 'es-CL' : 'en'
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en'
}

export function cookieLocale(cookieHeader: string | null | undefined): Locale | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(en|es)(?:;|$)`),
  )
  return match?.[1] === 'es' || match?.[1] === 'en' ? match[1] : null
}

export function fromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return DEFAULT_LOCALE
  let best: { locale: Locale; q: number } | null = null
  for (const part of header.split(',')) {
    const [rawTag, ...params] = part.trim().split(';')
    const tag = rawTag.trim().toLowerCase()
    const qParam = params.find((item) => item.trim().startsWith('q='))
    const q = qParam ? Number(qParam.split('=')[1]) : 1
    if (!Number.isFinite(q) || q <= 0) continue
    let locale: Locale | null = null
    if (tag === 'es' || tag.startsWith('es-')) locale = 'es'
    else if (tag === 'en' || tag.startsWith('en-')) locale = 'en'
    if (!locale) continue
    if (!best || q > best.q) best = { locale, q }
  }
  return best?.locale ?? DEFAULT_LOCALE
}

export function negotiateLocale(
  cookieHeader: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  return cookieLocale(cookieHeader) ?? fromAcceptLanguage(acceptLanguage)
}
