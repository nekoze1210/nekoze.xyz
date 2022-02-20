import { NextPage } from 'next'
import React from 'react'
import { CodeBlock } from '@/components/postBlocks/Code'
import { HeadingBlock } from '@/components/postBlocks/Heading'
import { ImageBlock } from '@/components/postBlocks/Image'
import { ListBlock } from '@/components/postBlocks/List'
import { ParagraphBlock } from '@/components/postBlocks/Paragraph'
import { QuoteBlock } from '@/components/postBlocks/Quote'
import { TodoBlock } from '@/components/postBlocks/Todo'
import { getPublicPageContentsBySlug, listPublicPages } from '@/lib/notionApi/useCase'
import {
  Paragraph,
  BlockObject,
  Code,
  Heading,
  List,
  Image as PostImage,
  Quote,
  ToDo,
} from '@/types/post'

const renderPostBlock = (block: BlockObject) => {
  switch (block.type) {
    case 'paragraph':
      const paragraph = block as Paragraph
      return (
        <div className='mb-3' key={paragraph.id}>
          <ParagraphBlock
            id={paragraph.id}
            type={paragraph.type}
            texts={paragraph.texts}
            isChild={paragraph.isChild}
            key={paragraph.id}
          />
        </div>
      )
    case 'code':
      const code = block as Code
      return (
        <div className='mb-4' key={code.id}>
          <CodeBlock
            text={code.text}
            language={code.language}
            id={code.id}
            type={code.type}
            isChild={code.isChild}
          />
        </div>
      )
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      const heading = block as Heading
      return (
        <div className='mb-4' key={heading.id}>
          <HeadingBlock
            id={heading.id}
            text={heading.text}
            heading_type={heading.heading_type}
            type={heading.type}
            isChild={heading.isChild}
          />
        </div>
      )
    case 'numbered_list_item':
    case 'bulleted_list_item':
      const list = block as List
      return (
        <div className='mb-3' key={list.id}>
          <ListBlock
            id={list.id}
            text={list.text}
            listType={list.listType}
            childrenBlocks={list.childrenBlocks}
            hasChildren={list.hasChildren}
            isChild={list.isChild}
            type={list.type}
          >
            {list.childrenBlocks.map((child: BlockObject) => {
              if (child.type === 'bulleted_list_item') {
                return renderPostBlock(child)
              }
              return renderPostBlock(child)
            })}
          </ListBlock>
        </div>
      )
    case 'image':
      const image = block as PostImage
      return (
        <div className='mb-3' key={image.id}>
          <ImageBlock
            id={image.id}
            type={image.type}
            url={image.url}
            isChild={image.isChild}
            caption={image.caption}
          />
        </div>
      )
    case 'quote':
      const quote = block as Quote
      return (
        <div className='mb-3' key={quote.id}>
          <QuoteBlock id={quote.id} text={quote.text} type={quote.type} isChild={quote.isChild} />
        </div>
      )
    case 'to_do':
      const todo = block as ToDo
      return (
        <div className='mb-4' key={todo.id}>
          <TodoBlock
            id={todo.id}
            text={todo.text}
            isChild={todo.isChild}
            isChecked={todo.isChecked}
            type={todo.type}
          />
        </div>
      )
  }
}

// @ts-ignore
const Post: NextPage = ({ post }) => {
  if (!post) {
    return <div>ページが存在しません</div>
  }

  return (
    <div className='bg-white rounded-lg border border-aluminium dark:border-abbey dark:bg-black mt-5 p-5 break-all'>
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
