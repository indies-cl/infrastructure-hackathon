import { type Locale } from './locale'

export type Messages = {
  skip: string
  sponsorCta: string
  place: string
  subtitle: string
  whyTitle: string
  whyHighlight: string
  whyRest: string
  whyBody: string
  statsLabel: string
  stats: { value: string; label: string }[]
  orgsTitle: string
  orgs: { title: string; copy: string }[]
  tracksTitle: string
  tracks: { n: string; title: string; copy: string }[]
  sponsorsTitle: string
  sponsorsLead: string
  sponsorsHighlight: string
  sponsors: { title: string; copy: string }[]
  asksTitle: string
  asks: { n: string; title: string; copy: string }[]
  tiersTitle: string
  tiers: { title: string; copy: string; label: string }[]
  writeTitle: string
  writeLead: string
  writeHighlight: string
  linkedin: string
  seeOther: string
}

/**
 * World-facing landing page (participants). Concept: an agent keeps hitting
 * real government/business systems and getting locked out — the hackathon is
 * the unlock. Copy is written to that frame, not the sponsor deck.
 */
export type HomeMessages = {
  skip: string
  applyCta: string
  place: string
  heroLine1: string
  heroLine2: string
  heroSub: string
  bootLines: string[]
  thesisLead: string
  thesisHighlight: string
  thesisBody: string
  tracksTitle: string
  tracks: { n: string; code: string; title: string; copy: string }[]
  statsLabel: string
  stats: { value: string; label: string }[]
  whoTitle: string
  orgs: { title: string; copy: string }[]
  formatTitle: string
  format: { n: string; title: string; copy: string }[]
  faqTitle: string
  faq: { q: string; a: string }[]
  applyTitle: string
  applyLead: string
  applyHighlight: string
  sponsorLink: string
  seeOther: string
}

export const homeMessages: Record<Locale, HomeMessages> = {
  en: {
    skip: 'Skip to content',
    applyCta: 'Apply to build',
    place: '7–8 Nov 2026 · Santiago, Chile',
    heroLine1: 'Agents keep',
    heroLine2: 'hitting the wall.',
    heroSub:
      'Real systems say no to machines. 24 hours in Santiago to build the way through.',
    bootLines: [
      '// the agent is ready. the world is not.',
      '// public data nobody can query.',
      '// company systems nobody can reach.',
      '> loading the fix: 7–8 nov 2026, santiago …',
    ],
    thesisLead: 'An agent is only as good as what it can reach.',
    thesisHighlight: 'Right now it can barely reach anything real.',
    thesisBody:
      'For 24 hours, teams of 2 to 4 build the missing layer: data an agent can query, systems it can act on, tools that actually ship.',
    tracksTitle: 'Three systems to break open',
    tracks: [
      {
        n: '01',
        code: 'GET  gov/*',
        title: 'Agent-ready government',
        copy: 'Public data and systems an agent can actually look up and act on.',
      },
      {
        n: '02',
        code: 'POST business/*',
        title: 'Agent-ready business',
        copy: 'Agents wired into real company data and workflows.',
      },
      {
        n: '03',
        code: 'RUN  agents/*',
        title: 'Agent infrastructure',
        copy: 'The tools for building, shipping, and running agents.',
      },
    ],
    statsLabel: 'Numbers',
    stats: [
      { value: '24', label: 'Hours straight' },
      { value: '~500', label: 'Builders' },
      { value: '2–4', label: 'Per team' },
      { value: '3', label: 'Tracks' },
    ],
    whoTitle: 'Who opens the door',
    orgs: [
      {
        title: 'Velum Labs (YC W26)',
        copy: 'AI startup, Chilean founders. First into YC in almost three years.',
      },
      {
        title: 'indies.cl',
        copy: 'Startup community running in-person events. Last hackathon was the biggest social-impact one in Latin America, five countries.',
      },
      {
        title: 'Alianza Emprende',
        copy: 'Every university entrepreneurship club in Chile. In 2026: ~3000 signed up, 1800+ showed up.',
      },
    ],
    formatTitle: 'How the 24 hours run',
    format: [
      {
        n: '01',
        title: 'Apply with your team',
        copy: 'Tell us who you are and what you want to break open. We pick the teams.',
      },
      {
        n: '02',
        title: 'Build on site',
        copy: 'Two days in Santiago, 7–8 Nov 2026. Food, space, and mentors covered.',
      },
      {
        n: '03',
        title: 'Ship and demo',
        copy: 'Show what an agent can now do that it couldn’t before. Best per track wins.',
      },
    ],
    faqTitle: 'Before you apply',
    faq: [
      {
        q: 'Who can come?',
        a: 'Anyone who can build: students, engineers, founders, designers. You apply, we pick teams of 2 to 4.',
      },
      {
        q: 'How much does it cost?',
        a: 'Nothing to take part. If you’re selected, food and space are covered.',
      },
      {
        q: 'Do I need a team already?',
        a: 'Apply with 2 to 4 people. Coming solo? Tell us and we help you find one.',
      },
      {
        q: 'What do I bring?',
        a: 'Your laptop and whatever you code with. We handle the rest.',
      },
    ],
    applyTitle: 'Get in',
    applyLead:
      'Applications are open. Grab your team, pick a system, tell us what you’ll break open. Spots are limited and we pick the teams.',
    applyHighlight: 'Applications reviewed as they come in.',
    sponsorLink: 'Here to sponsor instead?',
    seeOther: 'En español',
  },
  es: {
    skip: 'Saltar al contenido',
    applyCta: 'Postula para construir',
    place: '7–8 nov 2026 · Santiago, Chile',
    heroLine1: 'Los agentes',
    heroLine2: 'chocan con el muro.',
    heroSub:
      'Los sistemas reales le dicen que no a las máquinas. 24 horas en Santiago para abrir el paso.',
    bootLines: [
      '// el agente está listo. el mundo no.',
      '// datos públicos que nadie puede consultar.',
      '// sistemas de empresa que nadie puede alcanzar.',
      '> cargando la solución: 7–8 nov 2026, santiago …',
    ],
    thesisLead: 'Un agente vale lo que puede alcanzar.',
    thesisHighlight: 'Hoy casi no puede alcanzar nada real.',
    thesisBody:
      'Durante 24 horas, equipos de 2 a 4 construyen la capa que falta: datos que un agente pueda consultar, sistemas donde pueda actuar, herramientas que de verdad salgan.',
    tracksTitle: 'Tres sistemas para abrir',
    tracks: [
      {
        n: '01',
        code: 'GET  gov/*',
        title: 'Agent-ready government',
        copy: 'Datos y sistemas públicos que un agente pueda consultar y usar de verdad.',
      },
      {
        n: '02',
        code: 'POST business/*',
        title: 'Agent-ready business',
        copy: 'Agentes conectados a los datos y procesos de empresas reales.',
      },
      {
        n: '03',
        code: 'RUN  agents/*',
        title: 'Agent infrastructure',
        copy: 'Las herramientas para armar, publicar y correr agentes.',
      },
    ],
    statsLabel: 'Números',
    stats: [
      { value: '24', label: 'Horas seguidas' },
      { value: '~500', label: 'Builders' },
      { value: '2–4', label: 'Por equipo' },
      { value: '3', label: 'Tracks' },
    ],
    whoTitle: 'Quién abre la puerta',
    orgs: [
      {
        title: 'Velum Labs (YC W26)',
        copy: 'Startup de IA, founders chilenos. Los primeros en entrar a YC en casi tres años.',
      },
      {
        title: 'indies.cl',
        copy: 'Comunidad de startups con eventos presenciales. La última hackathon fue la de impacto social más grande de Latinoamérica, en cinco países.',
      },
      {
        title: 'Alianza Emprende',
        copy: 'Todos los clubes de emprendimiento universitarios de Chile. En 2026: ~3000 inscritos, 1800+ asistentes.',
      },
    ],
    formatTitle: 'Cómo corren las 24 horas',
    format: [
      {
        n: '01',
        title: 'Postula con tu equipo',
        copy: 'Cuéntanos quién eres y qué quieres abrir. Nosotros elegimos los equipos.',
      },
      {
        n: '02',
        title: 'Construye en el lugar',
        copy: 'Dos días en Santiago, 7–8 nov 2026. Comida, espacio y mentores cubiertos.',
      },
      {
        n: '03',
        title: 'Publica y muestra',
        copy: 'Muestra lo que un agente ahora puede hacer y antes no. Gana el mejor por track.',
      },
    ],
    faqTitle: 'Antes de postular',
    faq: [
      {
        q: '¿Quién puede ir?',
        a: 'Cualquiera que construya: estudiantes, ingenieros, founders, diseñadores. Se postula y elegimos equipos de 2 a 4.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Participar no cuesta nada. Si te seleccionan, la comida y el espacio están cubiertos.',
      },
      {
        q: '¿Necesito equipo ya?',
        a: 'Postula con 2 a 4 personas. ¿Vas solo? Avísanos y te ayudamos a armar uno.',
      },
      {
        q: '¿Qué llevo?',
        a: 'Tu notebook y con lo que programes. El resto lo ponemos nosotros.',
      },
    ],
    applyTitle: 'Entra',
    applyLead:
      'Las postulaciones están abiertas. Arma tu equipo, elige un sistema y cuéntanos qué vas a abrir. Los cupos son limitados y elegimos los equipos.',
    applyHighlight: 'Revisamos postulaciones a medida que llegan.',
    sponsorLink: '¿Vienes a auspiciar?',
    seeOther: 'In English',
  },
}

export const messages: Record<Locale, Messages> = {
  en: {
    skip: 'Skip to content',
    sponsorCta: 'Be a sponsor',
    place: '7–8 Nov 2026. Santiago, Chile',
    subtitle: '24 hours, ~500 people, infrastructure agents can actually use.',
    whyTitle: 'Why',
    whyHighlight: "Agents get stuck when they can't get into a real system.",
    whyRest:
      'Public data nobody can query, company processes nobody can run, tools that never make it out.',
    whyBody:
      'On 7–8 Nov 2026 in Santiago, about 500 people will spend 24 hours on that. Teams of 2–4. You apply to get in.',
    statsLabel: 'Numbers',
    stats: [
      { value: '24', label: 'Hours' },
      { value: '~500', label: 'People' },
      { value: '10k', label: 'USD in so far' },
      { value: '3', label: 'Tracks' },
    ],
    orgsTitle: "Who's behind this",
    orgs: [
      {
        title: 'Velum Labs (YC W26)',
        copy: 'AI startup, Chilean founders. First ones into YC in almost three years.',
      },
      {
        title: 'indies.cl',
        copy: 'Startup community. They run in-person events. The last hackathon was the biggest social-impact one in Latin America, five countries.',
      },
      {
        title: 'Alianza Emprende',
        copy: 'Every university entrepreneurship club in Chile. In 2026: ~3000 signed up, over 1800 showed up.',
      },
    ],
    tracksTitle: 'Tracks',
    tracks: [
      {
        n: '01',
        title: 'Agent-ready government',
        copy: 'Public data and systems an agent can look up and act on.',
      },
      {
        n: '02',
        title: 'Agent-ready business',
        copy: 'Agents wired into real company data and workflows.',
      },
      {
        n: '03',
        title: 'Agent infrastructure',
        copy: 'Tools for building, shipping, and running agents.',
      },
    ],
    sponsorsTitle: 'Why sponsor this',
    sponsorsLead: 'For 24 hours, teams we pick will build on real products.',
    sponsorsHighlight: 'You put your tech in their hands.',
    sponsors: [
      {
        title: 'They use it',
        copy: 'Teams spend 24 hours on your product, not a slide.',
      },
      {
        title: 'Talent',
        copy: 'You meet technical people we already filtered, before and during the event.',
      },
      {
        title: 'Real work',
        copy: 'Prototypes on your stack, for actual government and company problems.',
      },
      {
        title: 'Take part',
        copy: 'Back a challenge or a prize, or do a talk or a workshop.',
      },
    ],
    asksTitle: 'What we need',
    asks: [
      {
        n: '01',
        title: 'Money',
        copy: "Cash for ops, food, and prizes. There's already 10k USD.",
      },
      {
        n: '02',
        title: 'Credits',
        copy: 'For about 500 people, or for the three winning teams.',
      },
      {
        n: '03',
        title: 'A venue',
        copy: 'Tables, internet, outlets.',
      },
    ],
    tiersTitle: 'How to sponsor',
    tiers: [
      {
        title: 'Bronze',
        copy: 'Your name on the site and at the event, plus intros to teams and people who want to talk.',
        label: 'Bronze cup',
      },
      {
        title: 'Silver',
        copy: 'Bronze, plus a challenge or prize and a talk or workshop.',
        label: 'Silver cup',
      },
      {
        title: 'Gold',
        copy: 'Silver, plus you own a track, and you meet the people we already picked first.',
        label: 'Gold cup',
      },
    ],
    writeTitle: 'Be a sponsor',
    writeLead:
      'Tell him what you can bring (money, credits, or a venue) and why this one matters to you.',
    writeHighlight:
      'Come in early and we build the challenges, prizes, and space around you.',
    linkedin: "Benjamin's LinkedIn",
    seeOther: 'En español',
  },
  es: {
    skip: 'Saltar al contenido',
    sponsorCta: 'Súmate como sponsor',
    place: '7–8 nov 2026. Santiago, Chile',
    subtitle:
      '24 horas, ~500 personas, infraestructura que un agente pueda usar de verdad.',
    whyTitle: 'Por qué',
    whyHighlight: 'Un agente se traba cuando no puede entrar a un sistema real.',
    whyRest:
      'Datos públicos que nadie puede consultar, procesos de empresa que nadie puede correr, herramientas que nunca salen.',
    whyBody:
      'El 7 y 8 de noviembre de 2026, en Santiago, unas 500 personas van a pasar 24 horas en eso. Equipos de 2 a 4. Se entra por postulación.',
    statsLabel: 'Números',
    stats: [
      { value: '24', label: 'Horas' },
      { value: '~500', label: 'Personas' },
      { value: '10 mil', label: 'USD ya levantados' },
      { value: '3', label: 'Tracks' },
    ],
    orgsTitle: 'Quién lo organiza',
    orgs: [
      {
        title: 'Velum Labs (YC W26)',
        copy: 'Startup de IA, founders chilenos. Los primeros en entrar a YC en casi tres años.',
      },
      {
        title: 'indies.cl',
        copy: 'Comunidad de gente que arma startups. Hacen eventos presenciales. El último fue la hackathon de impacto social más grande de Latinoamérica, en cinco países.',
      },
      {
        title: 'Alianza Emprende',
        copy: 'Todos los clubes de emprendimiento universitarios de Chile. En 2026: ~3000 inscritos y más de 1800 asistentes.',
      },
    ],
    tracksTitle: 'Tracks',
    tracks: [
      {
        n: '01',
        title: 'Agent-ready government',
        copy: 'Datos y sistemas públicos que un agente pueda consultar y usar.',
      },
      {
        n: '02',
        title: 'Agent-ready business',
        copy: 'Agentes conectados a los datos y procesos de empresas reales.',
      },
      {
        n: '03',
        title: 'Agent infrastructure',
        copy: 'Herramientas para armar, publicar y correr agentes.',
      },
    ],
    sponsorsTitle: 'Por qué ser sponsor',
    sponsorsLead:
      'Durante 24 horas, equipos que ya escogimos van a construir con productos reales.',
    sponsorsHighlight: 'Un sponsor pone su tecnología en esas manos.',
    sponsors: [
      {
        title: 'Lo usan',
        copy: 'Los equipos pasan 24 horas en tu producto, no en una slide.',
      },
      {
        title: 'Talento',
        copy: 'Conoces a gente técnica que ya escogimos, antes y durante el evento.',
      },
      {
        title: 'Trabajo real',
        copy: 'Prototipos en tu stack, para problemas reales de gobierno y empresa.',
      },
      {
        title: 'Participa',
        copy: 'Auspicia un desafío o un premio, o arma una charla o un workshop.',
      },
    ],
    asksTitle: 'Qué pedimos',
    asks: [
      {
        n: '01',
        title: 'Dinero',
        copy: 'Dinero para el evento, comida y premios. Ya hay 10 mil USD.',
      },
      {
        n: '02',
        title: 'Créditos',
        copy: 'Para unas 500 personas, o para los tres equipos ganadores.',
      },
      {
        n: '03',
        title: 'Espacio',
        copy: 'Un espacio con mesas, internet y enchufes.',
      },
    ],
    tiersTitle: 'Cómo ser sponsor',
    tiers: [
      {
        title: 'Bronce',
        copy: 'Tu nombre en el sitio y en el evento, más intros con equipos y gente que quiere conversar.',
        label: 'Copa de bronce',
      },
      {
        title: 'Plata',
        copy: 'Bronce, más un desafío o premio y una charla o workshop.',
        label: 'Copa de plata',
      },
      {
        title: 'Oro',
        copy: 'Plata, más un track a tu nombre, y conoces primero a la gente que ya escogimos.',
        label: 'Copa de oro',
      },
    ],
    writeTitle: 'Súmate como sponsor',
    writeLead:
      'Escríbele qué puedes poner (dinero, créditos o un espacio) y por qué te interesa esta hackathon.',
    writeHighlight:
      'Si te sumas temprano, armamos los desafíos, los premios y el espacio alrededor tuyo.',
    linkedin: 'LinkedIn de Benjamin',
    seeOther: 'In English',
  },
}
