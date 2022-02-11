import DarkModeButton from '@/components/DarkModeButton'

export const Header = () => {
  return (
    <>
      <nav
        className={
          'container mx-auto flex flex-wrap items-center text-white mt-10 flex justify-between space-x-3'
        }
      >
        <img
          src='https://avatars.githubusercontent.com/u/14988862?v=4'
          className={'rounded-full h-10 w-10'}
          alt={'logo'}
        />
        <h1 className={'flex-1 text-3xl dark:text-white text-black'}>Blog</h1>
        <DarkModeButton />
      </nav>
    </>
  )
}

export default Header
