import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

import { useTailwindTheme } from '@/hooks/theme/tailwind'

export const ThemeLocalStorageKey = 'nekoze_theme'

const Theme = {
  light: 'light',
  dark: 'dark',
}

export type UseTheme = () => {
  isDark: boolean
  toggleDarkMode: (isDark: boolean) => void
}

export const useTheme: UseTheme = () => {
  const [value, setValue] = useLocalStorage<(typeof Theme)['light' | 'dark']>(ThemeLocalStorageKey)
  const { isDark, toggle } = useTailwindTheme()

  const toggleDarkMode = (isDark: boolean) => {
    toggle(isDark)
    setValue(isDark ? Theme.dark : Theme.light)
  }

  useEffect(() => {
    if (
      value === Theme.dark ||
      (!(ThemeLocalStorageKey in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      toggle(true)
      setValue(Theme.dark)
    } else {
      toggle(false)
      setValue(Theme.light)
    }
  }, [value, setValue, toggle])

  return { isDark, toggleDarkMode }
}
