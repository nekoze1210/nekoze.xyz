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
} from 'react-icons/rx'

import { HeaderNavigationLink } from '@/components/HeaderNavigationLink'
import { X } from '@/components/icons/X'
import { Zenn } from '@/components/icons/Zenn'
import { useTheme } from '@/hooks/theme'

export const MobileHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()
  const pathName = usePathname()

  return (
    <>
      <div className={'md:hidden'}>
        <button
          className={'flex h-[45px] w-[45px] items-center justify-center'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      <div
        className={
          isOpen
            ? 'fixed left-0 top-0 z-50 h-full w-2/3 bg-gray-50 transition-all dark:bg-black md:hidden'
            : 'fixed left-[-100%] top-0 z-50 h-full w-1/2 transition-all md:hidden'
        }
      >
        <div className={'flex items-center justify-start'}>
          <button
            className={'flex h-[45px] w-[45px] items-center justify-center'}
            onClick={() => setIsOpen(false)}
          >
            <RxCross1 />
          </button>
        </div>
        <ul className={`flex flex-col md:hidden`}>
          <li
            className={`mx-1 flex justify-start ${
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
            className={`ml-1 flex justify-start ${
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
          <li className={`ml-1 flex justify-start rounded-[10px]`}>
            <HeaderNavigationLink
              href={'https://x.com/nekoze_da'}
              icon={X}
              popoverText={'X'}
              target={'_blank'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={`ml-1 flex justify-start rounded-[10px]`}>
            <HeaderNavigationLink
              href={'https://github.com/nekoze1210'}
              icon={RxGithubLogo}
              popoverText={'GitHub'}
              target={'_blank'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={`ml-1 flex justify-start rounded-[10px]`}>
            <HeaderNavigationLink
              href={'https://zenn.dev/nekoze_da'}
              icon={Zenn}
              popoverText={'Zenn'}
              target={'_blank'}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={`ml-1 flex justify-start`}>
            <button onClick={() => toggleDarkMode(!isDark)}>
              {isDark ? (
                <HeaderNavigationLink href={`${pathName}/#`} icon={RxMoon} />
              ) : (
                <HeaderNavigationLink href={`${pathName}/#`} icon={RxSun} />
              )}
            </button>
          </li>
        </ul>
      </div>
      <div
        className={
          isOpen
            ? 'fixed right-0 top-0 z-50 h-full w-1/3 bg-black opacity-30 delay-100 md:hidden'
            : 'fixed right-[100%] top-0 z-50 h-full w-1/2 md:hidden'
        }
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  )
}
