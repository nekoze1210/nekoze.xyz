'use client'

import { useRouter, usePathname } from 'next/navigation'
import React, { FC, useState } from 'react'
import {
  RxCross1,
  RxFileText,
  RxGithubLogo,
  RxHamburgerMenu,
  RxHome,
  RxMoon,
  RxTwitterLogo,
} from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { useTheme } from '@/hooks/theme'
export const MobileHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()
  const router = useRouter()
  const pathName = usePathname()

  return (
    <>
      <div className={'md:hidden'}>
        <button
          className={'w-[45px] h-[45px] flex justify-center items-center'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      <div
        className={
          isOpen
            ? 'md:hidden fixed top-0 left-0 h-full w-1/2 dark:bg-abbey bg-gray-50 transition-all'
            : 'md:hidden fixed top-0 left-[-100%] h-full w-1/2 transition-all'
        }
      >
        <div className={'flex justify-start items-center'}>
          <button
            className={'w-[45px] h-[45px] flex justify-center items-center'}
            onClick={() => setIsOpen(false)}
          >
            <RxCross1 />
          </button>
        </div>
        <ul className={`md:hidden flex flex-col`}>
          <li
            className={`flex justify-start mx-1 ${pathName === '/' && 'bg-red-300'} rounded-[10px]`}
          >
            <HeaderNavigationLink href={'/'} icon={RxHome} popoverText={'Home'} />
          </li>
          <li
            className={`flex justify-start ml-1 ${
              pathName === '/posts' && 'bg-red-300'
            } rounded-[10px]`}
          >
            <HeaderNavigationLink href={'/posts'} icon={RxFileText} popoverText={'Posts'} />
          </li>
          <li className={`flex justify-start ml-1 rounded-[10px]}`}>
            <HeaderNavigationLink
              href={'/posts'}
              icon={RxTwitterLogo}
              popoverText={'Twitter'}
              target={'_blank'}
            />
          </li>
          <li className={`flex justify-start ml-1 rounded-[10px]`}>
            <HeaderNavigationLink
              href={'/posts'}
              icon={RxGithubLogo}
              popoverText={'GitHub'}
              target={'_blank'}
            />
          </li>
          <li className={`flex justify-start ml-1`}>
            <button onClick={() => toggleDarkMode(!isDark)}>
              <HeaderNavigationLink href={'#'} icon={RxMoon} />
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
