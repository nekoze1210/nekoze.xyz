import { FC } from 'react'
import { RxFileText, RxGithubLogo, RxHome, RxMoon, RxTwitterLogo } from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { useTheme } from '@/hooks/theme'

export const DesktopHeader: FC = () => {
  const { isDark, toggleDarkMode } = useTheme()

  return (
    <div className={'flex justify-between items-center mx-auto'}>
      <ul className={'hidden -mx-4 md:flex space-x-3'}>
        <HeaderNavigationLink href={'/'} icon={RxHome} popoverText={'Home'} />
        <HeaderNavigationLink href={'/posts'} icon={RxFileText} popoverText={'Posts'} />
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
          <HeaderNavigationLink href={'#'} icon={RxMoon} />
        </button>
      </div>
    </div>
  )
}
