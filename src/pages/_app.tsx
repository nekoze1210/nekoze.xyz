import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import Layout from '@/pages/layout'
import 'react-medium-image-zoom/dist/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo
        openGraph={{
          title: 'nekoLog',
          description: '思ったことや学んだことを書きます',
          type: 'website',
          locale: 'ja_JP',
          url: process.env.SITE_URL || 'https://blog.nekoze.xyz',
          site_name: 'nekolog',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
