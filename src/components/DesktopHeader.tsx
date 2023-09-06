import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { RxFileText, RxGithubLogo, RxHome, RxMoon, RxSun } from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { X } from '@/components/icons/X'
import { Zenn } from '@/components/icons/Zenn'
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
          href={'https://x.com/nekoze_da'}
          icon={X}
          popoverText={'X'}
          target={'_blank'}
        />
        <HeaderNavigationLink
          href={'https://github.com/nekoze1210'}
          icon={RxGithubLogo}
          popoverText={'GitHub'}
          target={'_blank'}
        />
        <HeaderNavigationLink
          href={'https://zenn.dev/nekoze_da'}
          icon={Zenn}
          popoverText={'Zenn'}
          target={'_blank'}
        />
      </ul>
      <div className='-mx-4 hidden md:flex lg:items-center'>
        <button onClick={() => toggleDarkMode(!isDark)}>
          {isDark ? (
            <HeaderNavigationLink href={`${pathName}/#`} icon={RxMoon} />
          ) : (
            <HeaderNavigationLink href={`${pathName}/#`} icon={RxSun} />
          )}
        </button>
      </div>
    </div>
  )
}
