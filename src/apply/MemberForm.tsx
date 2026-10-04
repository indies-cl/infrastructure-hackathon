import type { ReactNode } from 'react'
import type { ApplyMessages } from '../i18n/apply'
import { ChoiceField, SelectField, TextArea, TextField } from './fields'
import {
  FIELD_ORDER,
  GENDERS,
  NORMALIZE,
  YES_NO,
  fieldId,
  type FieldKey,
  type YesNo,
} from './model'
import { fieldIssue } from './schema'
import { memberPath, shownError, type ApplyForm } from './use-apply-form'

type Props = {
  form: ApplyForm
  index: number
  t: ApplyMessages
}

function messageFor(
  form: ApplyForm,
  index: number,
  key: FieldKey,
  value: string,
  t: ApplyMessages,
): string | undefined {
  const size = form.getFieldValue('size')
  if (size == null) return undefined
  const others = form
    .getFieldValue('members')
    .slice(0, size)
    .filter((_, memberIndex) => memberIndex !== index)
  const code = fieldIssue(key, value, others)
  return code ? t.errors[code] : undefined
}

/**
 * One person's questions. TanStack Form holds the value and the error.
 * Base UI draws the control.
 */
function Bound<K extends FieldKey>({
  form,
  index,
  field,
  t,
  children,
}: {
  form: ApplyForm
  index: number
  field: K
  t: ApplyMessages
  children: (props: {
    id: string
    name: string
    value: string
    error?: string
    onValueChange: (value: string) => void
    onBlur: () => void
  }) => ReactNode
}) {
  return (
    <form.Field
      name={memberPath(index, field)}
      validators={{
        onSubmit: ({ value }) => messageFor(form, index, field, String(value ?? ''), t),
        onChange: ({ value, fieldApi }) => {
          // Stay quiet until Next has been pressed, then keep the message current.
          if (!fieldApi.state.meta.errorMap.onSubmit) return undefined
          return messageFor(form, index, field, String(value ?? ''), t)
        },
      }}
    >
      {(api) =>
        children({
          id: fieldId(index, field),
          name: field,
          value: String(api.state.value ?? ''),
          error: shownError(api.state.meta.errorMap),
          // The field name is a generic union, so the value type does not narrow.
          onValueChange: (next) => api.handleChange(next as never),
          onBlur: () => {
            const normalize = NORMALIZE[field]
            const current = String(api.state.value ?? '')
            if (normalize) {
              const cleaned = normalize(current)
              if (cleaned !== current) api.handleChange(cleaned as never)
            }
            api.handleBlur()
          },
        })
      }
    </form.Field>
  )
}

function Question({
  form,
  index,
  field,
  t,
  self,
}: {
  form: ApplyForm
  index: number
  field: FieldKey
  t: ApplyMessages
  self: boolean
}) {
  const f = t.fields
  switch (field) {
    case 'name':
      return (
        <Bound form={form} index={index} field="name" t={t}>
          {(props) => (
            <TextField {...props} label={f.name.label} autoComplete={self ? 'name' : 'off'} />
          )}
        </Bound>
      )
    case 'email':
      return (
        <Bound form={form} index={index} field="email" t={t}>
          {(props) => (
            <TextField
              {...props}
              inputMode="email"
              label={f.email.label}
              placeholder={f.email.placeholder}
              autoComplete={self ? 'email' : 'off'}
              technical
            />
          )}
        </Bound>
      )
    case 'gender':
      return (
        <Bound form={form} index={index} field="gender" t={t}>
          {(props) => (
            <SelectField
              {...props}
              label={f.gender.label}
              placeholder={f.gender.placeholder}
              options={GENDERS.map((g) => ({ value: g, label: f.gender.options[g] }))}
            />
          )}
        </Bound>
      )
    case 'github':
      return (
        <Bound form={form} index={index} field="github" t={t}>
          {(props) => (
            <TextField
              {...props}
              label={f.github.label}
              prefix={f.github.prefix}
              placeholder={f.github.placeholder}
              technical
            />
          )}
        </Bound>
      )
    case 'jobs':
      return (
        <Bound form={form} index={index} field="jobs" t={t}>
          {(props) => (
            <ChoiceField
              id={props.id}
              name={props.name}
              label={f.jobs.label}
              value={props.value === 'yes' || props.value === 'no' ? props.value : ''}
              error={props.error}
              options={YES_NO.map((v) => ({ value: v, label: f.jobs.options[v] }))}
              onValueChange={(v: YesNo) => props.onValueChange(v)}
            />
          )}
        </Bound>
      )
    case 'role':
      return (
        <Bound form={form} index={index} field="role" t={t}>
          {(props) => (
            <TextField
              {...props}
              label={f.role.label}
              optional={t.optional}
              placeholder={f.role.placeholder}
            />
          )}
        </Bound>
      )
    case 'fun':
      return (
        <Bound form={form} index={index} field="fun" t={t}>
          {(props) => <TextArea {...props} label={f.fun.label} />}
        </Bound>
      )
    case 'favorite':
      return (
        <Bound form={form} index={index} field="favorite" t={t}>
          {(props) => <TextArea {...props} label={f.favorite.label} hint={f.favorite.hint} />}
        </Bound>
      )
    case 'hacker':
      return (
        <Bound form={form} index={index} field="hacker" t={t}>
          {(props) => <TextArea {...props} label={f.hacker.label} hint={f.hacker.hint} />}
        </Bound>
      )
    case 'linkedin':
      return (
        <Bound form={form} index={index} field="linkedin" t={t}>
          {(props) => (
            <TextField
              {...props}
              label={f.linkedin.label}
              optional={t.optional}
              prefix={f.linkedin.prefix}
              placeholder={f.linkedin.placeholder}
              technical
            />
          )}
        </Bound>
      )
    case 'site':
      return (
        <Bound form={form} index={index} field="site" t={t}>
          {(props) => (
            <TextField
              {...props}
              inputMode="url"
              label={f.site.label}
              optional={t.optional}
              placeholder={f.site.placeholder}
              technical
            />
          )}
        </Bound>
      )
  }
}

export function MemberForm({ form, index, t }: Props) {
  // Browsers should fill the first person from the user's profile, not the rest.
  const self = index === 0

  return (
    <div className="flex flex-col gap-8">
      {FIELD_ORDER.map((key) => (
        <Question key={key} form={form} index={index} field={key} t={t} self={self} />
      ))}
    </div>
  )
}
