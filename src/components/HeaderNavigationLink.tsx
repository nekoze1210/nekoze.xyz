import Link from 'next/link'
import React, { createElement, FC, useState } from 'react'
import { IconType } from 'react-icons'

import { HeaderPopover } from '@/components/HeaderPopover'

export const HeaderNavigationLink: FC<{
  href: string
  icon: IconType
  popoverText?: string
  target?: string | 'self'
}> = ({ href, icon, popoverText, target }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <>
      {/* Desktop */}
      <div
        className='hidden md:flex md:flex-col items-center w-full'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href={href}
          className={
            'w-[45px] h-[45px] hover:bg-gray-400 transition-all rounded-[10px] flex justify-center items-center relative'
          }
          target={target}
        >
          <>{createElement(icon)}</>
          <HeaderPopover text={popoverText} visible={hovered} />
        </Link>
      </div>
      {/* Mobile */}
      <div className={'md:hidden rounded-[10px]'}>
        <Link href={href} target={target} className={'flex flex-row'}>
          <div className={'w-[45px] h-[45px] transition-all flex justify-center items-center'}>
            {createElement(icon)}
          </div>
          <p className={'flex items-center'}>{popoverText}</p>
        </Link>
      </div>
    </>
  )
}
