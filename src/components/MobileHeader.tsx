'use client'

import { usePathname } from 'next/navigation'
import React, { FC, useState } from 'react'
import {
  RxCross1,
  RxFileText,
  RxGithubLogo,
  RxHamburgerMenu,
  RxHome,
  RxMoon,
  RxSun,
  RxTwitterLogo,
} from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { useTheme } from '@/hooks/theme'
export const MobileHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()
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
            ? 'md:hidden fixed top-0 z-50 left-0 h-full w-2/3 dark:bg-black bg-gray-50 transition-all'
            : 'md:hidden fixed top-0 z-50 left-[-100%] h-full w-1/2 transition-all'
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
            className={`flex justify-start mx-1 ${
              pathName === '/' && 'bg-gradient-to-br from-[#A8ED91] to-[#CCF7F4] text-black'
            } rounded-[10px]`}
          >
            <HeaderNavigationLink
              href={'/'}
              icon={RxHome}
              popoverText={'Home'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li
            className={`flex justify-start ml-1 ${
              pathName === '/posts' && 'bg-gradient-to-br from-[#A8ED91] to-[#CCF7F4] text-black'
            } rounded-[10px]`}
          >
            <HeaderNavigationLink
              href={'/posts'}
              icon={RxFileText}
              popoverText={'Posts'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={`flex justify-start ml-1 rounded-[10px]}`}>
            <HeaderNavigationLink
              href={'/posts'}
              icon={RxTwitterLogo}
              popoverText={'Twitter'}
              target={'_blank'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={`flex justify-start ml-1 rounded-[10px]`}>
            <HeaderNavigationLink
              href={'/posts'}
              icon={RxGithubLogo}
              popoverText={'GitHub'}
              target={'_blank'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={`flex justify-start ml-1`}>
            <button onClick={() => toggleDarkMode(!isDark)}>
              {isDark ? (
                <HeaderNavigationLink href={`${pathName}/#`} icon={RxSun} />
              ) : (
                <HeaderNavigationLink href={`${pathName}/#`} icon={RxMoon} />
              )}
            </button>
          </li>
        </ul>
      </div>
      <div
        className={
          isOpen
            ? 'md:hidden fixed top-0 z-50 right-0 h-full w-1/3 bg-black opacity-30 delay-100'
            : 'md:hidden fixed top-0 z-50 right-[100%] h-full w-1/2'
        }
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  )
}
