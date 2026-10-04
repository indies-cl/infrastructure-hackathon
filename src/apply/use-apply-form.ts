import { useForm } from '@tanstack/react-form'
import type { FieldKey, Member, TeamSize } from './model'

export type ApplyValues = {
  size: TeamSize | null
  members: Member[]
}

export function useApplyForm(initial: ApplyValues) {
  return useForm({
    defaultValues: {
      size: initial.size,
      members: initial.members,
    },
  })
}

export type ApplyForm = ReturnType<typeof useApplyForm>

export function memberAt(index: number) {
  return `members[${index}]` as `members[${number}]`
}

export function memberPath<K extends FieldKey>(index: number, key: K) {
  return `members[${index}].${key}` as `members[${number}].${K}`
}

/** Prefer the message from the latest edit. A submit error stays until the value is valid. */
export function shownError(errorMap: { onChange?: unknown; onSubmit?: unknown }): string | undefined {
  const error = errorMap.onChange ?? errorMap.onSubmit
  return typeof error === 'string' ? error : undefined
}
