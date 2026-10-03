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

export const HOME_META: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: 'Infrastructure Hackathon — The biggest hackathon in Chile',
    description:
      'An infrastructure hackathon in Santiago, 7–8 Nov 2026. Devtools and agents. Teams of 2 to 4, application only.',
    ogLocale: 'en_US',
  },
  es: {
    title: 'Infrastructure Hackathon — La hackathon más grande de Chile',
    description:
      'Una hackathon de infraestructura en Santiago, 7 y 8 de noviembre de 2026. Devtools y agentes. Equipos de 2 a 4, solo por postulación.',
    ogLocale: 'es_CL',
  },
}

export const OG_LOCALE_ALTERNATE: Record<Locale, string> = {
  en: 'es_CL',
  es: 'en_US',
}
