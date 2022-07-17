import dayjs from 'dayjs'
import Link from 'next/link'
import { VFC } from 'react'
import { Post } from '@/types/post'

export const PostThumbnail: VFC<Post> = (post: Post) => {
  return (
    <li
      className='border-t border-aluminium dark:border-abbey dark:bg-cod-gray mt-3 first:border-t-0'
      key={post.id}
    >
      {post.thumbnailImageUrl ? (
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
      <div className='m-5'>
        <Link href={`/posts/${encodeURIComponent(post.slug)}`} key={post.id}>
          <a
            key={post.id}
            className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'
          >
            {post.title}
          </a>
        </Link>
        <p className='text-md text-gray-500 dark:text-gray-300'>
          <p>
            <time>{dayjs(post.date).format('YYYY-MM-DD')} </time>
          </p>
          {post.tags.map((tag) => {
            return (
              <Link href={`/tags/${tag}`} key={post.id + '_' + tag}>
                <a className='text-md hover:underline mr-2 '>{`#${tag} `}</a>
              </Link>
            )
          })}
        </p>
      </div>
    </li>
  )
}
