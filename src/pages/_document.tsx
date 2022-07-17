import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html lang='ja-JP' className={'dark'}>
      <Head>
        <meta name='application-name' content='nekoze.dev' />
        <link href='https://fonts.googleapis.com/css?family=Noto+Sans+JP' rel='stylesheet'></link>
      </Head>
      <body className={'bg-wild-sand text-black dark:bg-cod-gray dark:text-white font-notoSansJP'}>
        <div className={'container mx-auto max-w-[806px]'}>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}

export default MyDocument
