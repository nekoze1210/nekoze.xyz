import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html lang='ja-JP' className={'dark dark:bg-gray-700 dark:text-white'}>
      <Head>
        <meta name='application-name' content='nekoze.dev' />
      </Head>
      <body className={'w-full dark:bg-gray-700 dark:text-white'}>
        <div className={'container mx-auto w-509'}>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}

export default MyDocument
