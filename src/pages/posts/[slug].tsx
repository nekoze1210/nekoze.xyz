import { NextPage } from 'next'
import React from 'react'
import { getPublicPageContentsBySlug, listPublicPages } from '@/lib/notionApi/useCase'

const Post: NextPage = ({ post }) => {
  if (!post) {
    return <div>ページが存在しません</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <pre>
        <code>{JSON.stringify(post.blocks)}</code>
        <style jsx>{`
          code {
            vertical-align: middle;
            white-space: pre;
            word-break: break-all;
            max-width: 100%;
            display: block;
            font-size: 0.8rem;
            line-height: 1.4;
            padding: 1.25rem 1.5rem;
            margin: 0.85rem 0;
            background-color: #282c34;
            color: #ccc;
            border-radius: 6px;
            overflow: auto;
          }
        `}</style>
      </pre>
    </div>
  )
}

export default Post
export const getStaticProps = async (context) => {
  const { slug } = context.params

  const article = await getPublicPageContentsBySlug(slug)

  return {
    props: {
      post: article,
    },
    revalidate: 600,
  }
}

export const getStaticPaths = async () => {
  const posts = await listPublicPages()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  }
}
