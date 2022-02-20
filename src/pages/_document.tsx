import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html lang='ja-JP' className={'dark'}>
      <Head>
        <meta name='application-name' content='nekoze.dev' />
      </Head>
      <body className={'bg-wild-sand text-black dark:bg-cod-gray dark:text-white'}>
        <div className={'container mx-auto max-w-806px'}>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}

export default MyDocument
