import dayjs from 'dayjs'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import { renderPostBlock } from '@/components/PostBlock'
import { getPublicPageContentsBySlug, listPublicPages } from '@/lib/notionApi/useCase'
import { Tag, Post } from '@/types/post'

type PostProps = {
  post: Post
}

const Post: NextPage<PostProps> = ({ post }) => {
  if (!post) {
    return <div>ページが存在しません</div>
  }

  return (
    <div className='bg-white rounded-lg border border-aluminium dark:border-abbey dark:bg-black mt-5 p-5 break-all'>
      <NextSeo
        openGraph={{
          title: post.title,
          type: 'article',
          url: `${process.env.SITE_URL}/${post.slug}`,
          article: {
            authors: ['@nekoze_da'],
            publishedTime: dayjs(post.date).format(),
            tags: post.tags.map((tag: Tag) => tag.name),
          },
        }}
      />
      <h1 className='text-2xl font-bold tracking-tight'>{post.title}</h1>
      <article className='mt-3'>
        {post.blocks.map((block: any) => {
          return renderPostBlock(block)
        })}
      </article>
    </div>
  )
}

export default Post

export const getStaticProps = async (context: { params: { slug: string } }) => {
  const { slug } = context.params

  const post = await getPublicPageContentsBySlug(slug)

  return {
    props: {
      post,
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
