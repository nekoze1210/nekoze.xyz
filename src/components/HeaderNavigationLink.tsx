import Link from 'next/link'
import React, { createElement, FC, useState } from 'react'
import { IconType } from 'react-icons'

import { HeaderPopover } from '@/components/HeaderPopover'

export interface HeaderNavigationLinkProps {
  href: string
  icon: IconType
  popoverText?: string
  target?: string | 'self'
  onClick?: () => void
}

export const HeaderNavigationLink: FC<HeaderNavigationLinkProps> = ({
  href,
  icon,
  popoverText,
  target,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false)
  return (
    <>
      {/* Desktop */}
      <div
        className='hidden w-full items-center md:flex md:flex-col'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href={href}
          className={
            'relative flex h-[45px] w-[45px] items-center justify-center rounded-[10px] hover:bg-gradient-to-br hover:from-[#FF4D6B] hover:to-[#5B69B1] hover:text-black'
          }
          target={target}
          onClick={onClick}
        >
          <>{createElement(icon)}</>
          <HeaderPopover text={popoverText} visible={hovered} />
        </Link>
      </div>
      {/* Mobile */}
      <div className={'rounded-[10px] md:hidden'}>
        <Link href={href} target={target} className={'flex flex-row'} onClick={onClick}>
          <div className={'flex h-[45px] w-[45px] items-center justify-center transition-all'}>
            {createElement(icon)}
          </div>
          <p className={'flex items-center'}>{popoverText}</p>
        </Link>
      </div>
    </>
  )
}
