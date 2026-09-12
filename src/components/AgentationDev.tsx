import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'

export function AgentationDev() {
  const [Agentation, setAgentation] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (!import.meta.env.DEV) return

    let cancelled = false

    void import('agentation').then((module) => {
      if (!cancelled) setAgentation(() => module.Agentation)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (!Agentation) return null

  return <Agentation />
}
