import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { NotionBlockObject, notNull } from '@/lib/notionApi/types'
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
  const blocksWithChildren = await getChildrenBlocks(page.id)
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

const getChildrenBlocks = async (blockId: string, depth = 0) => {
  let blocks: NotionBlockObject[] = []
  let cursor = null
  do {
    const res: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
      start_cursor: cursor || undefined,
    })
    for (const block of res.results) {
      if ('type' in block) {
        const children = await getChildrenBlocks(block.id, depth + 1)
        blocks.push({ ...block, depth, children })
      }
    }
    cursor = res.has_more ? res.next_cursor : null
  } while (cursor !== null)
  return blocks
}

const toViewModelArticle = (
  blocksWithChildren: NotionBlockObject[],
  isChild: boolean = false,
): BlockObjects => {
  if (!blocksWithChildren) {
    return []
  }
  return blocksWithChildren
    .map((block: NotionBlockObject) => {
      const articleBlock = {
        id: block.id,
        type: block.type as BlockType,
        isChild,
      }
      switch (block.type) {
        case 'heading_1':
          return {
            ...articleBlock,
            texts: block.heading_1.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
            heading_type: block.type,
          } as Heading
        case 'heading_2':
          return {
            ...articleBlock,
            texts: block.heading_2.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
            heading_type: block.type,
          } as Heading
        case 'heading_3':
          return {
            ...articleBlock,
            texts: block.heading_3.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
            heading_type: block.type,
          } as Heading
        case 'paragraph':
          return {
            ...articleBlock,
            texts: block.paragraph.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
          } as Paragraph
        case 'to_do':
          return {
            ...articleBlock,
            isChecked: block.to_do.checked,
            texts: block.to_do.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
          } as ToDo
        case 'quote':
          return {
            ...articleBlock,
            texts: block.quote.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
          } as Quote
        case 'code':
          return {
            ...articleBlock,
            text: block.code.text[0].plain_text || '',
            language: block.code.language,
          } as Code
        case 'bulleted_list_item':
          return {
            ...articleBlock,
            texts: block.bulleted_list_item.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
            listType: 'bulleted',
            hasChildren: block.has_children,
            childrenBlocks:
              block.has_children && block.children?.length
                ? toViewModelArticle(block.children, true)
                : [],
          } as List
        case 'numbered_list_item':
          return {
            ...articleBlock,
            texts: block.numbered_list_item.text.map((text: TODO) => {
              return {
                content: text.plain_text,
                annotations: text.annotations,
                link: text.href,
              } as Text
            }),
            listType: 'numbered',
            hasChildren: block.has_children,
            childrenBlocks:
              block.has_children && block.children?.length
                ? toViewModelArticle(block.children, true)
                : [],
          } as List
        case 'image':
          if (block.image.type === 'file') {
            return {
              ...articleBlock,
              url: block.image.file.url,
              caption: block.image.caption.map((caption: TODO) => {
                return {
                  content: caption.plain_text,
                  annotations: caption.annotations,
                  link: caption.href,
                } as Text
              }),
            } as Image
          }
        default:
          console.warn(`⚠️ unsupported block type: ${block.type}`)
          return null
      }
    })
    .filter(notNull)
}
