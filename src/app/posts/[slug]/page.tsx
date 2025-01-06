import dayjs from 'dayjs'
import { Metadata } from 'next'
import React from 'react'

import { renderPostBlock } from '@/components/PostBlock'
import { ShareButtons } from '@/components/ShareButtons'
import { getPublicPageContentsBySlug, listPublicPages } from '@/infra/notionApi/client'
import { generatePostOgpImage } from '@/infra/ogp/generator'

const postMetadataMap = new Map<string, { title: string; ogpImagePath: string }>()

export async function generateStaticParams() {
  const posts = await listPublicPages()
  const paths = []
  for (const post of posts) {
    const ogpImagePath = await generatePostOgpImage(post.id, post.title)
    paths.push({
      slug: post.slug,
    })
    postMetadataMap.set(post.slug, {
      title: post.title,
      ogpImagePath,
    })
  }
  return [...paths]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const metadata = postMetadataMap.get(params.slug)

  if (!metadata) {
    throw new Error(`Metadata for slug ${params.slug} not found`)
  }
  return {
    title: metadata.title,
    openGraph: {
      title: metadata.title,
      description: metadata.title,
      siteName: 'nekoze.xyz',
      type: 'article',
      url: `${process.env.SITE_URL}/posts/${params.slug}`,
      images: [
        {
          url: metadata.ogpImagePath,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string; ogpImagePath: string }
}) {
  const data = await getData(params)
  if (!data) {
    return <div>ページが存在しません</div>
  }

  return (
    <div className='break-all p-5'>
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
      <ShareButtons
        title={data.title}
        url={`${process.env.SITE_URL}/posts/${data.slug}`}
      ></ShareButtons>
    </div>
  )
}

const getData = async (params: { slug: string }) => {
  const { slug } = params
  return await getPublicPageContentsBySlug(slug)
}
