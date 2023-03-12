import Link from 'next/link'

import DarkModeButton from '@/components/DarkModeButton'

export const Header = () => {
  return (
    <>
      <nav
        className={
          'text-black dark:text-white flex flex-wrap items-center justify-between space-x-3'
        }
      >
        <Link href={'/'} legacyBehavior>
          <img
            src='https://avatars.githubusercontent.com/u/14988862?v=4'
            className={'rounded-full h-10 w-10'}
            alt={'logo'}
          />
        </Link>
        <Link href={'/'} className={'flex-1 text-3xl'}>
          nekoLog
        </Link>
        <div>
          <DarkModeButton />
        </div>
      </nav>
    </>
  )
}

export default Header
