import { useCallback, useEffect, useState } from 'react'

export type TailwindTheme = (isDark?: boolean) => {
  isDark: Boolean
  toggle: (isDark?: boolean) => void
}

export const useTailwindTheme: TailwindTheme = (isInitiallyDarkMode = false) => {
  const [isDark, toggleTheme] = useState<Boolean>(isInitiallyDarkMode)
  const toggle = useCallback((isDark?) => {
    if (typeof isDark === 'undefined') {
      toggleTheme((state: Boolean) => !state)
      return
    }
    toggleTheme(isDark)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])
  return { isDark, toggle }
}
