import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { sleep } from '@/lib/sleep'
import {
  Post,
  BlockObjects,
  BlockType,
  Code,
  Heading,
  Image,
  List,
  Paragraph,
  Quote,
  Text,
  ToDo,
} from '@/types/post'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const databaseId = process.env.NOTION_DATABASE_ID

export const getPublicPageContentsBySlug = async (slug: string) => {
  // query databases record by Slug property
  const database = await notion.databases.query({
    database_id: databaseId as string,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Slug',
          text: {
            equals: slug,
          },
        },
      ],
    },
  })
  if (!database.results.length) {
    throw new Error('data is not found.')
  }
  // get page
  const pageId = database.results[0].id
  const page: TODO = await notion.pages.retrieve({ page_id: pageId })
  if (page.object !== 'page') {
    throw new Error(`id: ${pageId} is not a page object.`)
  }
  // get blocks
  const blocks = await getBlocks(page.id)
  // get recursive content blocks
  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      }),
  )
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children) {
      block[block.type].children = childrenBlocks.find((x) => x.id === block.id)!.children!
    }
    return block
  })
  const articleBlocks: BlockObjects = toViewModelArticle(blocksWithChildren)
  const article: Post = {
    id: page.id,
    slug: slug,
    title: page.properties.Page.title[0]?.plain_text || '',
    description: page.properties.Description.rich_text[0]?.plain_text || '',
    ogImageUrl: page.properties.ogImageUrl.rich_text[0]?.plain_text || '',
    thumbnailImageUrl: page.properties.thumbnailImageUrl.rich_text[0]?.plain_text || '',
    tags: page.properties.Tag.multi_select.map((_: TODO) => _.name || ''),
    date: page.properties.Date.created_time,
    isPublished: true,
    blocks: articleBlocks,
  }
  return article
}

const getBlocks = async (blockId: string) => {
  let results: TODO[] = []
  let hasMore = true
  let cursor: string | undefined = undefined

  while (hasMore) {
    const response: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
      start_cursor: cursor,
    })
    results = results.concat(response.results)
    hasMore = response.has_more
    cursor = response.next_cursor || undefined
    await sleep(300)
  }
  return results
}

const toViewModelArticle = (blocksWithChildren: any, isChild: boolean = false): BlockObjects => {
  if (!blocksWithChildren) {
    return []
  }
  return blocksWithChildren
    .map((block: any) => {
      const articleBlock = {
        id: block.id,
        type: block.type as BlockType,
        isChild,
      }
      switch (articleBlock.type) {
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
          return {
            ...articleBlock,
            text: block[block.type].text[0].plain_text,
            heading_type: block.type,
          } as Heading
        case 'paragraph':
          return {
            ...articleBlock,
            texts: block.paragraph.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: { ...text.annotations },
                link: text.href,
              } as Text
            }),
          } as Paragraph
        case 'to_do':
          return {
            ...articleBlock,
            isChecked: block.to_do.checked,
            text: block.to_do.text[0]?.plain_text || '',
          } as ToDo
        case 'quote':
          return {
            ...articleBlock,
            text: block.quote.text[0].plain_text || '',
          } as Quote
        case 'code':
          return {
            ...articleBlock,
            text: block.code.text[0].plain_text || '',
            language: block.code.language,
          } as Code
        case 'bulleted_list_item':
        case 'numbered_list_item':
          return {
            ...articleBlock,
            texts: block[block.type]?.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: { ...text.annotations },
                link: text.href,
              } as Text
            }),
            listType: block.type === 'bulleted_list_item' ? 'bulleted' : 'numbered',
            hasChildren: block.has_children,
            childrenBlocks: block.has_children
              ? toViewModelArticle(block[block.type]?.children, true)
              : [],
          } as List
        case 'image':
          return {
            ...articleBlock,
            url: block.image.file.url,
            caption: block.image.caption.map((caption: TODO) => caption.plain_text).join(''),
          } as Image
        default:
          console.warn(`⚠️ unsupported block type: ${block.type}`)
          return null
      }
    })
    .filter(notNull)
}

const notNull = <T>(item: T | null): item is T => {
  return item !== null
}
