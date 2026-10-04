export const TEAM_MIN = 2
export const TEAM_MAX = 4
export const TEAM_SIZES = [2, 3, 4] as const
export type TeamSize = (typeof TEAM_SIZES)[number]

export const GENDERS = ['woman', 'man', 'nonbinary', 'other', 'skip'] as const
export type Gender = (typeof GENDERS)[number]

export const YES_NO = ['yes', 'no'] as const
export type YesNo = (typeof YES_NO)[number]

export type Member = {
  name: string
  gender: Gender | ''
  github: string
  email: string
  linkedin: string
  site: string
  jobs: YesNo | ''
  role: string
  fun: string
  favorite: string
  hacker: string
}

export type FieldKey = keyof Member

export type ErrorKey =
  | 'required'
  | 'email'
  | 'github'
  | 'linkedin'
  | 'site'
  | 'dupEmail'
  | 'dupGithub'

export type MemberErrors = Partial<Record<FieldKey, ErrorKey>>

/** Order the fields appear on screen. Also the order errors get focus. */
export const FIELD_ORDER = [
  'name',
  'email',
  'gender',
  'github',
  'jobs',
  'role',
  'fun',
  'favorite',
  'hacker',
  'linkedin',
  'site',
] as const satisfies readonly FieldKey[]

export function emptyMember(): Member {
  return {
    name: '',
    gender: '',
    github: '',
    email: '',
    linkedin: '',
    site: '',
    jobs: '',
    role: '',
    fun: '',
    favorite: '',
    hacker: '',
  }
}

/** `https://github.com/octocat/`, `@octocat` and `octocat` all become `octocat`. */
export function cleanGithub(value: string): string {
  return value
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?github\.com\//i, '')
    .replace(/^@/, '')
    .replace(/[/?#].*$/, '')
}

/** A pasted profile URL or a bare handle becomes the handle. */
export function cleanLinkedin(value: string): string {
  return value
    .trim()
    .replace(/^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/in\//i, '')
    .replace(/[/?#].*$/, '')
}

/** Adds `https://` when the person typed a bare domain. */
export function cleanSite(value: string): string {
  const v = value.trim()
  if (!v) return ''
  return /^[a-z][a-z\d+.-]*:\/\//i.test(v) ? v : `https://${v}`
}

export const NORMALIZE: Partial<Record<FieldKey, (value: string) => string>> = {
  github: cleanGithub,
  linkedin: cleanLinkedin,
  site: cleanSite,
  email: (value) => value.trim().toLowerCase(),
}

/** DOM id of a member's field. The page uses it to focus the first error. */
export function fieldId(index: number, key: FieldKey): string {
  return `m${index}-${key}`
}

export function firstErrorKey(errors: MemberErrors): FieldKey | null {
  return FIELD_ORDER.find((key) => errors[key]) ?? null
}
