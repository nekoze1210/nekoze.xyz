import { hrefTo } from '@storybook/addon-links'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import { renderPostBlock } from '@/components/PostBlock'
import { getPublicPageContentsBySlug, listPublicPages } from '@/infra/notionApi/client'
import { Tag, Post } from '@/types/post'

type PostProps = {
  post: Post
}

const Post: NextPage<PostProps> = ({ post }) => {
  if (!post) {
    return <div>ページが存在しません</div>
  }

  return (
    <div className='p-5 break-all'>
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
      <article>
        <h1 className='text-2xl font-bold tracking-tight'>{post.title}</h1>
        <time>
          <span className='text-gray-500'>{dayjs(post.date).format('YYYY-MM-DD')} </span>
        </time>
        <div className='pt-12'>
          {post.blocks.map((block: any) => {
            return renderPostBlock(block)
          })}
        </div>
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
