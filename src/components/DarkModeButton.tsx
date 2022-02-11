import { VFC } from 'react'
import { useTheme } from '@/hooks/theme'

const DarkModeButton: VFC = () => {
  const { isDark, toggleDarkMode } = useTheme()

  return <button onClick={() => toggleDarkMode(!isDark)}>{isDark ? '🌑' : '🌕'}</button>
}

export default DarkModeButton
