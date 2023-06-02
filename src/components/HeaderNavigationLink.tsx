import Link from 'next/link'
import React, { createElement, FC, useState } from 'react'
import { IconType } from 'react-icons'

import { HeaderPopover } from '@/components/HeaderPopover'

export const HeaderNavigationLink: FC<{
  href: string
  icon: IconType
  popoverText?: string
  target?: string | 'self'
  onClick?: () => void
}> = ({ href, icon, popoverText, target, onClick }) => {
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
            'w-[45px] h-[45px] hover:bg-gradient-to-br hover:text-black hover:from-[#FF4D6B] hover:to-[#5B69B1] rounded-[10px] flex justify-center items-center relative'
          }
          target={target}
          onClick={onClick}
        >
          <>{createElement(icon)}</>
          <HeaderPopover text={popoverText} visible={hovered} />
        </Link>
      </div>
      {/* Mobile */}
      <div className={'md:hidden rounded-[10px]'}>
        <Link href={href} target={target} className={'flex flex-row'} onClick={onClick}>
          <div className={'w-[45px] h-[45px] transition-all flex justify-center items-center'}>
            {createElement(icon)}
          </div>
          <p className={'flex items-center'}>{popoverText}</p>
        </Link>
      </div>
    </>
  )
}
