import dayjs from 'dayjs'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { listPublicPages } from '@/lib/notionApi/useCase'

// @ts-ignore
const Home: NextPage = ({ posts }) => {
  const articles = posts || []

  return (
    <div>
      <Head>
        <title>Index Page</title>
      </Head>
      <main>
        <ul className='px-3'>
          {articles.map((article: any, index: number) => {
            return (
              <li
                className='bg-white rounded-lg border border-aluminium dark:border-abbey dark:bg-black mt-5'
                key={article.id}
              >
                {index < 1 && article.thumbnailImageUrl ? (
                  <Link href={`/posts/${encodeURIComponent(article.slug)}`} key={article.id}>
                    <a href='#'>
                      <img
                        className='rounded-t-lg object-contain h-48 w-806px bg-wild-sand dark:bg-cod-gray'
                        src={article.thumbnailImageUrl}
                        alt=''
                      />
                    </a>
                  </Link>
                ) : null}
                <div className='p-5'>
                  <p className='text-lg'>{dayjs(article.date).format('YYYY-MM-DD')}</p>
                  <Link href={`/posts/${encodeURIComponent(article.slug)}`} key={article.id}>
                    <a
                      key={article.id}
                      className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'
                    >
                      {article.title}
                    </a>
                  </Link>
                  <p>
                    {article.tags.map((tag: string) => {
                      return (
                        <Link href={`/tags/${tag}`} key={article.id + '_' + tag}>
                          <a className='text-lg'>{`#${tag} `}</a>
                        </Link>
                      )
                    })}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const posts = await listPublicPages()
  return {
    props: {
      posts: posts,
    },
  }
}
