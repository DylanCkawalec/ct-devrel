import { useEffect, useRef, useState } from 'react'

export function useComprehensionCue(duration = 1000) {
  const [cueId, setCueId] = useState('')
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current)
      }
    },
    [],
  )

  const cue = (id: string) => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current)
    }

    setCueId('')
    window.requestAnimationFrame(() => setCueId(id))
    timeoutRef.current = window.setTimeout(() => setCueId(''), duration)
  }

  const cueClass = (id: string, baseClass = '') =>
    [baseClass, cueId === id ? 'comprehension-cue' : ''].filter(Boolean).join(' ')

  return { cue, cueClass }
}
