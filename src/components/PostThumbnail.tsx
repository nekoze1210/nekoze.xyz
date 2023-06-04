'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'

import { PostPage } from '@/types/post'

export const PostThumbnail: FC<PostPage> = (post: PostPage) => {
  return (
    <li
      className='mt-3 border-t border-aluminium first:border-t-0 dark:border-abbey dark:bg-cod-gray'
      key={post.id}
    >
      {post.thumbnailImageUrl ? (
        <Link href={`/posts/${encodeURIComponent(post.slug)}`} key={post.id}>
          <img
            className='h-48 w-[806px] rounded-t-lg bg-wild-sand object-contain dark:bg-cod-gray'
            src={post.thumbnailImageUrl}
            alt=''
          />
        </Link>
      ) : null}
      <div className='m-5'>
        <Link
          href={`/posts/${encodeURIComponent(post.slug)}`}
          key={post.id}
          className='mb-2 text-lg font-bold tracking-tight tracking-wide text-gray-900 dark:text-white'
        >
          {post.title}
        </Link>
        <div className='text-md text-gray-500 dark:text-gray-300'>
          <p>
            <time>{dayjs(post.date).format('YYYY-MM-DD')} </time>
          </p>
          {post.tags.map((tag) => {
            return (
              <Link
                href={`/posts/tags/${tag}`}
                key={post.id + '_' + tag}
                className='text-md mr-2 hover:underline '
              >
                {`#${tag} `}
              </Link>
            )
          })}
        </div>
      </div>
    </li>
  )
}
