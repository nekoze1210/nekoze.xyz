import dayjs from 'dayjs'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { listPublicPages } from '@/lib/notionApi/useCase'
import { Post } from '@/types/post'

type HomeProps = {
  posts: Post[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Index Page</title>
      </Head>
      <main>
        <ul className='px-3'>
          {posts.map((post, index) => {
            return (
              <li
                className='bg-white rounded-lg border border-aluminium dark:border-abbey dark:bg-black mt-5'
                key={post.id}
              >
                {index < 1 && post.thumbnailImageUrl ? (
                  <Link href={`/posts/${encodeURIComponent(post.slug)}`} key={post.id}>
                    <a href='#'>
                      <img
                        className='rounded-t-lg object-contain h-48 w-[806px] bg-wild-sand dark:bg-cod-gray'
                        src={post.thumbnailImageUrl}
                        alt=''
                      />
                    </a>
                  </Link>
                ) : null}
                <div className='p-5'>
                  <p className='text-lg'>{dayjs(post.date).format('YYYY-MM-DD')}</p>
                  <Link href={`/posts/${encodeURIComponent(post.slug)}`} key={post.id}>
                    <a
                      key={post.id}
                      className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'
                    >
                      {post.title}
                    </a>
                  </Link>
                  <p>
                    {post.tags.map((tag) => {
                      return (
                        <Link href={`/tags/${tag}`} key={post.id + '_' + tag}>
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
