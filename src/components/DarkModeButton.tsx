'use client'
import { FC } from 'react'

import { useTheme } from '@/hooks/theme'

const DarkModeButton: FC = () => {
  const { isDark, toggleDarkMode } = useTheme()

  return <button onClick={() => toggleDarkMode(!isDark)}>{isDark ? '🌑' : '🌕'}</button>
}

export default DarkModeButton
