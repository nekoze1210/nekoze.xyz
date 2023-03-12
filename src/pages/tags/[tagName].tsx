import dayjs from 'dayjs'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import React from 'react'
import { PostThumbnail } from '@/components/PostThumbnail'
import { listPublicPages, listPublicPagesByTag } from '@/infra/notionApi/client'
import { Post, Tag } from '@/types/post'

type TagsProps = {
  posts: Post[]
  tagName: string
}

const Tags: NextPage<TagsProps> = ({ posts, tagName }) => {
  return (
    <div>
      <Head>
        <title>Tag: #{tagName} - nekoLog</title>
      </Head>
      <NextSeo
        openGraph={{
          title: `#${tagName}`,
          url: `${process.env.SITE_URL}/tags/${tagName}`,
        }}
      />
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

export default Tags

export const getStaticProps = async (context: { params: { tagName: string } }) => {
  const { tagName } = context.params

  const posts = await listPublicPagesByTag(tagName)
  return {
    props: {
      posts,
      tagName,
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
