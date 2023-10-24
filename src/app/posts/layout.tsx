'use client'
import '@/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'
import { DefaultSeo } from 'next-seo'

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'container mx-auto max-w-[1200px]'}>
      <div className={'min-h-screen p-3'}>
        <section>
          <DefaultSeo
            openGraph={{
              title: 'nekoze.xyz',
              type: 'website',
              locale: 'ja_JP',
              url: `${process.env.SITE_URL}/posts` || 'https://nekoze.xyz/posts',
              site_name: 'nekoze.xyz',
            }}
            twitter={{
              cardType: 'summary_large_image',
            }}
          />
          {children}
        </section>
      </div>
    </div>
  )
}
