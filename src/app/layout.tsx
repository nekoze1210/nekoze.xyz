'use client'

import '@/styles/globals.scss'
import { Noto_Sans_JP } from 'next/font/google'

import { DesktopHeader } from '@/components/DesktopHeader'
import { MobileHeader } from '@/components/MobileHeader'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja-JP'>
      <body
        className={`bg-wild-sand text-black dark:bg-cod-gray dark:text-white ${notoSansJp.className}`}
      >
        <header>
          <nav className={'max-w-[802px] mt-[10px] mx-auto'}>
            <MobileHeader />
            <DesktopHeader />
          </nav>
        </header>

        <div className={'container mx-auto max-w-[806px]'}>{children}</div>
      </body>
    </html>
  )
}
