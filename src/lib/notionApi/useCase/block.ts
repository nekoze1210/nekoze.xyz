import { getChildrenBlocks, queryDatabase } from '@/lib/notionApi/endpoint'
import { NotionBlockObject, notNull } from '@/lib/notionApi/types'
import { createPagePropertyMap } from '@/lib/notionApi/useCase/page'
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

const databaseId = process.env.NOTION_DATABASE_ID

export const getPublicPageContentsBySlug = async (slug: string): Promise<Post> => {
  const databases = await queryDatabase({
    database_id: databaseId,
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
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  })
  if (!databases.length) {
    throw new Error('data is not found.')
  }
  const database = databases[0]
  // get blocks
  const blocksWithChildren = await getChildrenBlocks(database.id)
  const props = createPagePropertyMap(database)
  const articleBlocks: BlockObjects = toViewModelArticle(blocksWithChildren)
  return {
    id: database.id,
    title: props.get('title', 'title')?.title[0]?.plain_text || '',
    slug: props.get('d%5E%3Ed', 'rich_text')?.rich_text[0]?.plain_text || '',
    description: props.get('%40ixV', 'rich_text')?.rich_text[0]?.plain_text || '',
    ogImageUrl: props.get('_oVp', 'rich_text')?.rich_text[0]?.plain_text || '',
    thumbnailImageUrl: props.get('3CjCF', 'rich_text')?.rich_text[0]?.plain_text || '',
    tags:
      props.get('_%3A%3Ey', 'multi_select')?.multi_select.map((tag) => {
        return {
          name: tag.name,
        }
      }) || [],
    date: props.get('L%3CK%5E', 'created_time')!.created_time,
    isPublished: !database.archived,
    blocks: articleBlocks,
  }
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
            texts: block.heading_1.rich_text.map((text) => {
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
            texts: block.heading_2.rich_text.map((text) => {
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
            texts: block.heading_3.rich_text.map((text) => {
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
            texts: block.paragraph.rich_text.map((text) => {
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
            texts: block.to_do.rich_text.map((text) => {
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
            texts: block.quote.rich_text.map((text) => {
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
            text: block.code.rich_text[0].plain_text || '',
            language: block.code.language,
          } as Code
        case 'bulleted_list_item':
          return {
            ...articleBlock,
            texts: block.bulleted_list_item.rich_text.map((text) => {
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
            texts: block.numbered_list_item.rich_text.map((text) => {
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
              caption: block.image.caption.map((caption) => {
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
