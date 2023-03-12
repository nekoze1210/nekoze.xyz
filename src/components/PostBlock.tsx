import React from 'react'
import { CodeBlock } from '@/components/postBlocks/Code'
import { HeadingBlock } from '@/components/postBlocks/Heading'
import { ImageBlock } from '@/components/postBlocks/Image'
import { ListBlock } from '@/components/postBlocks/List'
import { ParagraphBlock } from '@/components/postBlocks/Paragraph'
import { QuoteBlock } from '@/components/postBlocks/Quote'
import { TodoBlock } from '@/components/postBlocks/Todo'
import {
  BlockObjectBase,
  Code,
  Heading,
  Image as PostImage,
  List,
  Paragraph,
  Quote,
  ToDo,
} from '@/types/post'

export const renderPostBlock = (block: BlockObjectBase) => {
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
            texts={heading.texts}
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
            texts={list.texts}
            listType={list.listType}
            childrenBlocks={list.childrenBlocks}
            hasChildren={list.hasChildren}
            isChild={list.isChild}
            type={list.type}
          >
            {list.childrenBlocks.map((child: BlockObjectBase) => {
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
          <QuoteBlock id={quote.id} texts={quote.texts} type={quote.type} isChild={quote.isChild} />
        </div>
      )
    case 'to_do':
      const todo = block as ToDo
      return (
        <div className='mb-4' key={todo.id}>
          <TodoBlock
            id={todo.id}
            texts={todo.texts}
            isChild={todo.isChild}
            isChecked={todo.isChecked}
            type={todo.type}
          />
        </div>
      )
  }
}
