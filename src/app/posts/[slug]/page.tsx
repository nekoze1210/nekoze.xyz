import dayjs from 'dayjs'
// import { NextSeo } from 'next-seo'
import React from 'react'

import { renderPostBlock } from '@/components/PostBlock'
import { getPublicPageContentsBySlug, listPublicPages } from '@/infra/notionApi/client'

export async function generateStaticParams() {
  const posts = await listPublicPages()
  const paths = posts.map((post) => {
    return {
      slug: post.slug,
    }
  })
  return [...paths]
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const data = await getData(params)
  if (!data) {
    return <div>ページが存在しません</div>
  }

  return (
    <div className='break-all p-5'>
      {/*<NextSeo*/}
      {/*  openGraph={{*/}
      {/*    title: post.title,*/}
      {/*    type: 'article',*/}
      {/*    url: `${process.env.BLOG_SITE_URL}/${post.slug}`,*/}
      {/*    article: {*/}
      {/*      authors: ['@nekoze_da'],*/}
      {/*      publishedTime: dayjs(post.date).format(),*/}
      {/*      tags: post.tags.map((tag: Tag) => tag.name),*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
      <article>
        <h1 className='text-2xl font-bold tracking-tight'>{data.title}</h1>
        <time>
          <span className='text-gray-500'>{dayjs(data.date).format('YYYY-MM-DD')} </span>
        </time>
        <div className='pt-12'>
          {data.blocks.map((block) => {
            return renderPostBlock(block)
          })}
        </div>
      </article>
    </div>
  )
}

// export default Post

const getData = async (params: { slug: string }) => {
  const { slug } = params
  return await getPublicPageContentsBySlug(slug)
}
