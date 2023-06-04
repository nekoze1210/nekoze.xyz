import Head from 'next/head'
import React from 'react'

import { PostThumbnail } from '@/components/PostThumbnail'
import { listPublicPages, listPublicPagesByTag } from '@/infra/notionApi/client'

export default async function Tags({ params }: { params: { tagName: string } }) {
  const { posts, tagName } = await getData(params)
  return (
    <div>
      <Head>
        <title>Tag: #{tagName} - nekoLog</title>
      </Head>
      {/*<NextSeo*/}
      {/*  openGraph={{*/}
      {/*    title: `#${tagName}`,*/}
      {/*    url: `${process.env.BLOG_SITE_URL}/posts/tags/${tagName}`,*/}
      {/*  }}*/}
      {/*/>*/}
      <main>
        <h1 className='text-2xl font-bold tracking-tight'>#{tagName}</h1>
        <ul className='px-3'>
          {posts.map((post) => {
            return <PostThumbnail {...post} key={post.id} />
          })}
        </ul>
      </main>
    </div>
  )
}

const getData = async (params: { tagName: string }) => {
  const { tagName } = params
  const posts = await listPublicPagesByTag(tagName)
  return {
    posts,
    tagName,
  }
}

export async function generateStaticParams() {
  const posts = await listPublicPages()
  let duplicateTagArray: string[][] = []
  let tagArray = []
  posts.map((post) => {
    if (!post.tags) {
      return
    }
    duplicateTagArray = duplicateTagArray.concat(post.tags)
  })
  tagArray = duplicateTagArray.filter(function (x, i, self) {
    return self.indexOf(x) === i
  })
  const paths = tagArray.map((tag) => ({
    tagName: tag,
  }))
  return [...paths]
}
