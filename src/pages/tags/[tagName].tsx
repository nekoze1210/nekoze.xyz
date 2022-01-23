import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { listPublicPages, listPublicPagesByTag } from '@/lib/notionApi/useCase'

// @ts-ignore
const Tags: NextPage = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Tag page</title>
      </Head>
      <main>
        <ul>
          {posts.map((post: any) => {
            return (
              <Link href={`/posts/${encodeURIComponent(post.slug)}`} key={post.id}>
                <li key={post.id}>{post.title}</li>
              </Link>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default Tags

export const getStaticProps = async (context: { params: { tagName: string } }) => {
  const { tagName } = context.params

  const posts = await listPublicPagesByTag(tagName)
  return {
    props: {
      posts,
    },
  }
}

export const getStaticPaths = async () => {
  const posts = await listPublicPages()
  let duplicateTagArray: any[] = []
  let tagArray = []
  posts.map((post) => {
    duplicateTagArray = duplicateTagArray.concat(post.tags)
  })
  tagArray = duplicateTagArray.filter(function (x, i, self) {
    return self.indexOf(x) === i
  })
  return {
    paths: tagArray.map((tag) => ({
      params: {
        tagName: tag,
      },
    })),
    fallback: false,
  }
}
