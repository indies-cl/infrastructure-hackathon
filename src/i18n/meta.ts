import { type Locale } from './locale'

export const META: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: 'Infrastructure Hackathon — 7–8 November 2026, Santiago',
    description:
      '24 hours, about 500 people, infrastructure agents can actually use. Santiago, 7–8 Nov 2026.',
    ogLocale: 'en_US',
  },
  es: {
    title: 'Infrastructure Hackathon — 7–8 de noviembre 2026, Santiago',
    description:
      '24 horas, unas 500 personas, infraestructura que un agente pueda usar de verdad. Santiago, 7–8 de noviembre de 2026.',
    ogLocale: 'es_CL',
  },
}

export const OG_LOCALE_ALTERNATE: Record<Locale, string> = {
  en: 'es_CL',
  es: 'en_US',
}
