import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { RxFileText, RxGithubLogo, RxHome, RxMoon, RxSun, RxTwitterLogo } from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { useTheme } from '@/hooks/theme'

export const DesktopHeader: FC = () => {
  const { isDark, toggleDarkMode } = useTheme()
  const pathName = usePathname()

  return (
    <div className={'mx-auto flex items-center justify-between'}>
      <ul className={'-mx-4 hidden space-x-3 md:flex'}>
        <li
          className={`${
            pathName === '/' &&
            'rounded-[10px] bg-gradient-to-br from-[#A8ED91] to-[#CCF7F4] text-black'
          }`}
        >
          <HeaderNavigationLink href={'/'} icon={RxHome} popoverText={'Home'} />
        </li>
        <li
          className={`${
            pathName === '/posts' &&
            'rounded-[10px] bg-gradient-to-br from-[#A8ED91] to-[#CCF7F4] text-black'
          }`}
        >
          <HeaderNavigationLink href={'/posts'} icon={RxFileText} popoverText={'Posts'} />
        </li>
        <HeaderNavigationLink
          href={'https://twitter.com/nekoze_da'}
          icon={RxTwitterLogo}
          popoverText={'Twitter'}
          target={'_blank'}
        />
        <HeaderNavigationLink
          href={'https://github.com/nekoze1210'}
          icon={RxGithubLogo}
          popoverText={'GitHub'}
          target={'_blank'}
        />
      </ul>
      <div className='-mx-4 hidden md:flex lg:items-center'>
        <button onClick={() => toggleDarkMode(!isDark)}>
          {isDark ? (
            <HeaderNavigationLink href={`${pathName}/#`} icon={RxSun} />
          ) : (
            <HeaderNavigationLink href={`${pathName}/#`} icon={RxMoon} />
          )}
        </button>
      </div>
    </div>
  )
}