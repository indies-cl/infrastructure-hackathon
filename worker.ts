import { APPLY_META, HOME_META, META, OG_LOCALE_ALTERNATE } from './src/i18n/meta'
import {
  APPLY,
  HOME,
  SPONSOR,
  cookieHeader,
  htmlLang,
  legacyPath,
  negotiateLocale,
  type Locale,
} from './src/i18n/locale'

const WHATSAPP = /WhatsApp|facebookexternalhit|Facebot/i
const SLACK = /Slackbot/i

interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
}

function applyLocaleHtml(
  html: string,
  locale: Locale,
  page: string,
  meta: { title: string; description: string; ogLocale: string },
): string {
  const alt = OG_LOCALE_ALTERNATE[locale]
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang(locale)}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/,
      `$1${meta.description}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/,
      `$1${meta.title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/,
      `$1${meta.description}$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/,
      `$1${page}$2`,
    )
    .replace(
      /(<meta\s+property="og:locale"\s+content=")[^"]*("\s*\/>)/,
      `$1${meta.ogLocale}$2`,
    )
    .replace(
      /(<meta\s+property="og:locale:alternate"\s+content=")[^"]*("\s*\/>)/,
      `$1${alt}$2`,
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/,
      `$1${page}$2`,
    )
    .replace(
      /(<link\s+rel="alternate"\s+hreflang="en"\s+href=")[^"]*("\s*\/>)/,
      `$1${page}$2`,
    )
    .replace(
      /(<link\s+rel="alternate"\s+hreflang="es"\s+href=")[^"]*("\s*\/>)/,
      `$1${page}$2`,
    )
    .replace(
      /(<link\s+rel="alternate"\s+hreflang="x-default"\s+href=")[^"]*("\s*\/>)/,
      `$1${page}$2`,
    )
}

function applyShareImages(html: string, ua: string): string {
  if (WHATSAPP.test(ua)) {
    return html
      .replaceAll(
        'https://infra.indies.cl/og.webp',
        'https://infra.indies.cl/og-wa.webp',
      )
      .replace(
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:width" content="800" />',
      )
      .replace(
        '<meta property="og:image:height" content="630" />',
        '<meta property="og:image:height" content="420" />',
      )
  }
  if (SLACK.test(ua)) {
    return html
      .replaceAll(
        'https://infra.indies.cl/og.webp',
        'https://infra.indies.cl/og.gif',
      )
      .replace('content="image/webp"', 'content="image/gif"')
  }
  return html
}

async function pageHtml(
  request: Request,
  env: Env,
  locale: Locale,
  path: string,
  meta: { title: string; description: string; ogLocale: string },
): Promise<Response> {
  const url = new URL(request.url)
  const page = await env.ASSETS.fetch(new URL('/index.html', url.origin))
  let html = await page.text()
  html = applyLocaleHtml(html, locale, `${url.origin}${path === '/' ? '/' : path}`, meta)
  html = applyShareImages(html, request.headers.get('user-agent') ?? '')

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      vary: 'Accept-Language, Cookie, User-Agent',
    },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const isFile = /\.[a-zA-Z0-9]+$/.test(url.pathname)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (isFile || path === '/flag') {
      return env.ASSETS.fetch(request)
    }

    const legacy = legacyPath(path)
    if (legacy) {
      const location = new URL(`${legacy.dest}${url.search}`, url.origin)
      return new Response(null, {
        status: 302,
        headers: {
          Location: location.toString(),
          'Set-Cookie': cookieHeader(legacy.locale),
          'Cache-Control': 'private, no-store',
        },
      })
    }

    const locale = negotiateLocale(
      request.headers.get('cookie'),
      request.headers.get('accept-language'),
    )

    if (path === HOME || path === '/home') {
      return pageHtml(request, env, locale, HOME, HOME_META[locale])
    }
    if (path === APPLY) {
      return pageHtml(request, env, locale, APPLY, APPLY_META[locale])
    }
    if (path === SPONSOR) {
      return pageHtml(request, env, locale, SPONSOR, META[locale])
    }

    return env.ASSETS.fetch(request)
  },
}
