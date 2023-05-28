'use client'
import '@/styles/globals.scss'
import 'react-medium-image-zoom/dist/styles.css'
import { Noto_Sans_JP } from 'next/font/google'
import { DefaultSeo } from 'next-seo'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] })

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <body
      className={`bg-wild-sand text-black dark:bg-cod-gray dark:text-white ${notoSansJp.className}`}
    >
      <div className={'container mx-auto max-w-[806px]'}>
        <div className={'mx-auto my-3 p-3'}>
          <Header />
        </div>
        <div className={'min-h-screen p-3'}>
          <section>
            <DefaultSeo
              openGraph={{
                title: 'nekoLog',
                description: '思ったことや学んだことを書きます',
                type: 'website',
                locale: 'ja_JP',
                url: process.env.BLOG_SITE_URL || 'https://blog.nekoze.xyz',
                site_name: 'nekolog',
              }}
              twitter={{
                cardType: 'summary_large_image',
              }}
            />
            {children}
          </section>
        </div>
        <div className={'mx-auto my-3'}>
          <Footer />
        </div>
      </div>
    </body>
  )
}
