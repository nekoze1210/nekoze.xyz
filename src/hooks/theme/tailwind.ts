import { useCallback, useEffect, useState } from 'react'

export type UseTailwindTheme = (isDark?: boolean) => {
  isDark: boolean
  toggle: (isDark?: boolean) => void
}

export const useTailwindTheme: UseTailwindTheme = (isInitiallyDarkMode = false) => {
  const [isDark, toggleTheme] = useState<boolean>(isInitiallyDarkMode)
  const toggle = useCallback((isDark?: boolean) => {
    if (typeof isDark === 'undefined') {
      toggleTheme((state: boolean) => !state)
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
