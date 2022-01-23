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
        <ul>
          {articles.map((article: any) => {
            return (
              <Link href={`posts/${encodeURIComponent(article.slug)}`} key={article.id}>
                <li key={article.id}>{article.title}</li>
              </Link>
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
