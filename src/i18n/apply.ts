import type { Locale } from './locale'
import type { ErrorKey, Gender, YesNo } from '../apply/model'

export type ApplyMessages = {
  home: string
  kicker: string
  back: string
  next: string
  edit: string
  optional: string
  progress: { label: string; text: (n: number, total: number) => string }
  size: { title: string; hint: string; people: (n: number) => string }
  member: {
    title: (n: number, total: number) => string
    hintFirst: string
    hintNext: string
    fallback: (n: number) => string
  }
  review: {
    title: string
    hint: string
    submit: string
    sending: string
    failed: string
  }
  done: { title: string; body: string; sentTo: string; home: string }
  fields: {
    name: { label: string }
    gender: { label: string; placeholder: string; options: Record<Gender, string> }
    github: { label: string; prefix: string; placeholder: string }
    email: { label: string; placeholder: string }
    linkedin: { label: string; prefix: string; placeholder: string }
    site: { label: string; placeholder: string }
    jobs: { label: string; options: Record<YesNo, string> }
    role: { label: string; placeholder: string }
    fun: { label: string }
    favorite: { label: string; hint: string }
    hacker: { label: string; hint: string }
  }
  errors: Record<ErrorKey, string>
}

export const applyMessages: Record<Locale, ApplyMessages> = {
  en: {
    home: 'Go home',
    kicker: 'November 7–8, Santiago',
    back: 'Back',
    next: 'Next',
    edit: 'Edit',
    optional: 'optional',
    progress: { label: 'Progress', text: (n, total) => `Step ${n} of ${total}` },
    size: {
      title: 'How many of you?',
      hint: 'Teams of 2 to 4. No solo teams, no teams of 5.',
      people: (n) => `${n} people`,
    },
    member: {
      title: (n, total) => `Person ${n} of ${total}`,
      hintFirst: 'Start with you. Then the rest of the team.',
      hintNext: 'Now the next person on the team.',
      fallback: (n) => `Person ${n}`,
    },
    review: {
      title: 'Check your team',
      hint: "When you register, we email everyone on the team. We'll be in touch soon with details and whether you're in.",
      submit: 'Register team',
      sending: 'Sending…',
      failed: "We couldn't send your registration. Try again.",
    },
    done: {
      title: 'Team registered',
      body: "We emailed everyone on the team. We'll be in touch soon with details and whether you got in.",
      sentTo: 'Sent to',
      home: 'Back to home',
    },
    fields: {
      name: { label: 'Name or nickname' },
      gender: {
        label: 'Gender',
        placeholder: 'Choose',
        options: {
          woman: 'Woman',
          man: 'Man',
          nonbinary: 'Non-binary',
          other: 'Other',
          skip: 'Prefer not to say',
        },
      },
      github: { label: 'GitHub', prefix: 'github.com/', placeholder: 'username' },
      email: { label: 'Email', placeholder: 'you@email.com' },
      linkedin: {
        label: 'LinkedIn',
        prefix: 'linkedin.com/in/',
        placeholder: 'username',
      },
      site: {
        label: 'Personal site, blog or portfolio',
        placeholder: 'yoursite.com',
      },
      jobs: {
        label: 'Do you want to hear about job opportunities?',
        options: { yes: 'Yes', no: 'No' },
      },
      role: {
        label: 'What is your current role?',
        placeholder: 'e.g. student, backend at a fintech',
      },
      fun: { label: 'Fun fact about you' },
      favorite: {
        label: "Of everything you've built, which is your favorite?",
        hint: 'A project, a product, anything. Paste a link if there is one.',
      },
      hacker: {
        label: 'What kind of hacker are you? What do you bring to the hackathon?',
        hint: "Your role, what you're good at, what you add to a team.",
      },
    },
    errors: {
      required: 'This one is required.',
      email: 'Check the email.',
      github: 'Check the GitHub username.',
      linkedin: 'Check the LinkedIn username.',
      site: 'Check the link.',
      dupEmail: 'This email is already on the team.',
      dupGithub: 'This username is already on the team.',
    },
  },
  es: {
    home: 'Ir al inicio',
    kicker: '7 y 8 de noviembre, Santiago',
    back: 'Atrás',
    next: 'Siguiente',
    edit: 'Editar',
    optional: 'opcional',
    progress: { label: 'Progreso', text: (n, total) => `Paso ${n} de ${total}` },
    size: {
      title: '¿Cuántos son?',
      hint: 'Equipos de 2 a 4 personas. No hay equipos solos ni de 5.',
      people: (n) => `${n} personas`,
    },
    member: {
      title: (n, total) => `Persona ${n} de ${total}`,
      hintFirst: 'Empieza por ti. Después, el resto del equipo.',
      hintNext: 'Ahora, la siguiente persona del equipo.',
      fallback: (n) => `Persona ${n}`,
    },
    review: {
      title: 'Revisa tu equipo',
      hint: 'Al inscribir, les enviamos un correo a todos. Les avisamos pronto con los detalles y si quedaron.',
      submit: 'Inscribir equipo',
      sending: 'Enviando…',
      failed: 'No pudimos enviar la inscripción. Intenta de nuevo.',
    },
    done: {
      title: 'Equipo inscrito',
      body: 'Enviamos un correo a cada persona del equipo. Les avisamos pronto con los detalles y si quedaron.',
      sentTo: 'Enviado a',
      home: 'Volver al inicio',
    },
    fields: {
      name: { label: 'Nombre o apodo' },
      gender: {
        label: 'Género',
        placeholder: 'Elige',
        options: {
          woman: 'Mujer',
          man: 'Hombre',
          nonbinary: 'No binario',
          other: 'Otro',
          skip: 'Prefiero no decir',
        },
      },
      github: { label: 'GitHub', prefix: 'github.com/', placeholder: 'usuario' },
      email: { label: 'Email', placeholder: 'tu@correo.com' },
      linkedin: {
        label: 'LinkedIn',
        prefix: 'linkedin.com/in/',
        placeholder: 'usuario',
      },
      site: {
        label: 'Página personal, blog o portafolio',
        placeholder: 'tusitio.com',
      },
      jobs: {
        label: '¿Te interesa recibir oportunidades laborales?',
        options: { yes: 'Sí', no: 'No' },
      },
      role: {
        label: '¿Cuál es tu rol actual?',
        placeholder: 'Ej. estudiante, backend en una fintech',
      },
      fun: { label: 'Dato curioso sobre ti' },
      favorite: {
        label: 'De las cosas que has creado, ¿cuál es tu favorita?',
        hint: 'Un proyecto, un producto, lo que sea. Si hay link, pégalo.',
      },
      hacker: {
        label: '¿Qué tipo de hacker eres? ¿Qué traes a la hackathon?',
        hint: 'Tu rol, lo que sabes hacer, lo que aportas a un equipo.',
      },
    },
    errors: {
      required: 'Falta este dato.',
      email: 'Revisa el email.',
      github: 'Revisa el usuario de GitHub.',
      linkedin: 'Revisa el usuario de LinkedIn.',
      site: 'Revisa el link.',
      dupEmail: 'Este email ya está en el equipo.',
      dupGithub: 'Este usuario ya está en el equipo.',
    },
  },
}
