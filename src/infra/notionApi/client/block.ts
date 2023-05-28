import * as fs from 'fs'
import path from 'path'

import axios from 'axios'

import { createPagePropertyMap } from '@/infra/notionApi/client/page'
import { getChildrenBlocks, queryDatabase } from '@/infra/notionApi/endpoint'
import { NotionBlockObject, notNull } from '@/infra/notionApi/types'
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
const internalPostImagesPath = '/post-images'

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
  const articleBlocks: BlockObjects = await toViewModelArticle(blocksWithChildren)
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

const toViewModelArticle = async (
  blocksWithChildren: NotionBlockObject[],
  isChild: boolean = false,
): Promise<BlockObjects> => {
  if (!blocksWithChildren) {
    return []
  }
  const articleBlocks = []
  for (const block of blocksWithChildren) {
    const articleBlock = {
      id: block.id,
      type: block.type as BlockType,
      isChild,
    }
    switch (block.type) {
      case 'heading_1':
        articleBlocks.push({
          ...articleBlock,
          texts: block.heading_1.rich_text.map((text) => {
            return {
              content: text.plain_text,
              annotations: text.annotations,
              link: text.href,
            } as Text
          }),
          heading_type: block.type,
        } as Heading)
        continue
      case 'heading_2':
        articleBlocks.push({
          ...articleBlock,
          texts: block.heading_2.rich_text.map((text) => {
            return {
              content: text.plain_text,
              annotations: text.annotations,
              link: text.href,
            } as Text
          }),
          heading_type: block.type,
        } as Heading)
        continue
      case 'heading_3':
        articleBlocks.push({
          ...articleBlock,
          texts: block.heading_3.rich_text.map((text) => {
            return {
              content: text.plain_text,
              annotations: text.annotations,
              link: text.href,
            } as Text
          }),
          heading_type: block.type,
        } as Heading)
        continue
      case 'paragraph':
        articleBlocks.push({
          ...articleBlock,
          texts: block.paragraph.rich_text.map((text) => {
            return {
              content: text.plain_text,
              annotations: text.annotations,
              link: text.href,
            } as Text
          }),
        } as Paragraph)
        continue
      case 'to_do':
        articleBlocks.push({
          ...articleBlock,
          isChecked: block.to_do.checked,
          texts: block.to_do.rich_text.map((text) => {
            return {
              content: text.plain_text,
              annotations: text.annotations,
              link: text.href,
            } as Text
          }),
        } as ToDo)
        continue
      case 'quote':
        articleBlocks.push({
          ...articleBlock,
          texts: block.quote.rich_text.map((text) => {
            return {
              content: text.plain_text,
              annotations: text.annotations,
              link: text.href,
            } as Text
          }),
        } as Quote)
        continue
      case 'code':
        articleBlocks.push({
          ...articleBlock,
          text: block.code.rich_text[0].plain_text || '',
          language: block.code.language,
        } as Code)
        continue
      case 'bulleted_list_item':
        articleBlocks.push({
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
              ? await toViewModelArticle(block.children, true)
              : [],
        } as List)
        continue
      case 'numbered_list_item':
        articleBlocks.push({
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
              ? await toViewModelArticle(block.children, true)
              : [],
        } as List)
        continue
      case 'image': {
        if (block.image.type === 'file') {
          articleBlocks.push({
            ...articleBlock,
            url: await generateInternalImageUrlFromExternal(block.id, block.image.file.url),
            caption: block.image.caption.map((caption) => {
              return {
                content: caption.plain_text,
                annotations: caption.annotations,
                link: caption.href,
              } as Text
            }),
          } as Image)
          continue
        }
        if (block.image.type === 'external') {
          articleBlocks.push({
            ...articleBlock,
            url: block.image.external.url,
            caption: block.image.caption.map((caption) => {
              return {
                content: caption.plain_text,
                annotations: caption.annotations,
                link: caption.href,
              } as Text
            }),
          } as Image)
        }
      }
      default:
        console.warn(`⚠️ unsupported block type: ${block.type}`)
        continue
    }
  }
  return articleBlocks.filter(notNull)
}

const generateInternalImageUrlFromExternal = async (
  blockId: string,
  imageUrl: string,
): Promise<string> => {
  try {
    const response = await axios.get(imageUrl, {
      headers: {
        'Content-Type': 'image/png',
      },
      responseType: 'arraybuffer',
    })
    const fileName = blockId + path.extname(imageUrl.split('?')[0])
    const imagePath = internalPostImagesPath + '/' + fileName
    const imageExists = fs.existsSync('./public' + imagePath)

    const dirExists = fs.existsSync('./public' + internalPostImagesPath)
    if (!dirExists) {
      fs.mkdirSync('./public' + internalPostImagesPath, { recursive: true })
    }
    if (!imageExists) {
      fs.writeFileSync('./public' + imagePath, response.data)
    }
    return imagePath
  } catch (e) {
    console.error(`failed to download image. imageUrl: ${imageUrl}`)
    console.error(e)
    return imageUrl
  }
}
