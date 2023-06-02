import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { RxFileText, RxGithubLogo, RxHome, RxMoon, RxSun, RxTwitterLogo } from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { useTheme } from '@/hooks/theme'

export const DesktopHeader: FC = () => {
  const { isDark, toggleDarkMode } = useTheme()
  const pathName = usePathname()

  return (
    <div className={'flex justify-between items-center mx-auto'}>
      <ul className={'hidden -mx-4 md:flex space-x-3'}>
        <li
          className={`${
            pathName === '/' &&
            'bg-gradient-to-br from-[#A8ED91] to-[#CCF7F4] text-black rounded-[10px]'
          }`}
        >
          <HeaderNavigationLink href={'/'} icon={RxHome} popoverText={'Home'} />
        </li>
        <li
          className={`${
            pathName === '/posts' &&
            'bg-gradient-to-br from-[#A8ED91] to-[#CCF7F4] text-black rounded-[10px]'
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
      <div className='hidden -mx-4 md:flex lg:items-center'>
        <button onClick={() => toggleDarkMode(!isDark)}>
          {isDark ? (
            <HeaderNavigationLink href={'#'} icon={RxSun} />
          ) : (
            <HeaderNavigationLink href={'#'} icon={RxMoon} />
          )}
        </button>
      </div>
    </div>
  )
}
