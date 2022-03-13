import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '@/pages/layout'
import 'react-medium-image-zoom/dist/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
