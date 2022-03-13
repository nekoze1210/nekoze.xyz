import '@/styles/globals.scss'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Layout from '@/pages/layout'
import 'react-medium-image-zoom/dist/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo
        openGraph={{
          title: '@nekoze_da Blog',
          description: '思ったことや学んだことを書きます',
          type: 'website',
          locale: 'ja_JP',
          url: process.env.SITE_URL || 'https://blog.nekoze.xyz',
          site_name: '@nekoze_da Blog',
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
