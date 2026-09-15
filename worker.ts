import { META, OG_LOCALE_ALTERNATE } from './src/i18n/meta'
import {
  htmlLang,
  negotiateLocale,
  pathLocale,
  type Locale,
} from './src/i18n/locale'

const WHATSAPP = /WhatsApp|facebookexternalhit|Facebot/i
const SLACK = /Slackbot/i

interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
}

function applyLocaleHtml(html: string, locale: Locale, origin: string): string {
  const meta = META[locale]
  const page = `${origin}/${locale}`
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const ua = request.headers.get('user-agent') ?? ''
    const isFile = /\.[a-zA-Z0-9]+$/.test(url.pathname)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (isFile || path === '/flag') {
      return env.ASSETS.fetch(request)
    }

    if (path === '/') {
      const locale = negotiateLocale(
        request.headers.get('cookie'),
        request.headers.get('accept-language'),
      )
      const location = new URL(`/${locale}${url.search}`, url.origin)
      return new Response(null, {
        status: 302,
        headers: {
          Location: location.toString(),
          'Cache-Control': 'private, no-store',
          Vary: 'Accept-Language, Cookie',
        },
      })
    }

    const locale = pathLocale(path)
    if (!locale) {
      return env.ASSETS.fetch(request)
    }

    const page = await env.ASSETS.fetch(new URL('/index.html', url.origin))
    let html = await page.text()
    html = applyLocaleHtml(html, locale, url.origin)
    html = applyShareImages(html, ua)

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
        vary: 'Accept-Language, User-Agent',
      },
    })
  },
}
