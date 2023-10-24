'use client'

import '@/styles/globals.css'
import { Noto_Sans_JP } from 'next/font/google'

import { DesktopHeader } from '@/components/DesktopHeader'
import { MobileHeader } from '@/components/MobileHeader'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja-JP'>
      <body
        className={`bg-wild-sand text-black dark:bg-cod-gray dark:text-white ${notoSansJp.className}`}
      >
        <header>
          <nav className={'mx-auto mt-[10px] max-w-[1200px]'}>
            <MobileHeader />
            <DesktopHeader />
          </nav>
        </header>
        <div className={'container mx-auto max-w-[1200px]'}>{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
