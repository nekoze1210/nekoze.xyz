import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { listPublicPages } from '@/lib/notionApi/useCase'

// @ts-ignore
const Home: NextPage = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Index Page</title>
      </Head>
      <main>
        <ul>
          {posts.map((post: any) => {
            return (
              <Link href={`posts/${encodeURIComponent(post.slug)}`} key={post.id}>
                <li key={post.id}>{post.title}</li>
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
