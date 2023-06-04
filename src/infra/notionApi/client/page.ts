import { Client } from '@notionhq/client'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

import {
  DATE_PROPERTY_ID,
  DESCRIPTION_PROPERTY_ID,
  OG_IMAGE_URL_PROPERTY_ID,
  SLUG_PROPERTY_ID,
  TAGS_PROPERTY_ID,
  THUMBNAIL_IMAGE_URL_PROPERTY_ID,
} from '@/infra/notionApi/client/config'
import { NotionDatabaseObject } from '@/infra/notionApi/types'
import { MatchType } from '@/types'
import { PostPage } from '@/types/post'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const databaseId = process.env.NOTION_DATABASE_ID

export const listPublicPages = async (): Promise<PostPage[]> => {
  const pages = await getPages({
    database_id: databaseId as string,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  return pages.map((page: NotionDatabaseObject) => convertPostPage(page))
}

export const listPublicPagesByTag = async (tag: string): Promise<PostPage[]> => {
  const pages = await getPages({
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
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  return pages.map((page: NotionDatabaseObject) => convertPostPage(page))
}

const convertPostPage = (page: NotionDatabaseObject): PostPage => {
  const props = createPagePropertyMap(page)
  return {
    id: page.id!,
    title: props.get('title', 'title')?.title[0]?.plain_text!,
    slug: props.get(SLUG_PROPERTY_ID, 'rich_text')?.rich_text[0]?.plain_text!,
    description: props.get(DESCRIPTION_PROPERTY_ID, 'rich_text')?.rich_text[0]?.plain_text || null,
    ogImageUrl: props.get(OG_IMAGE_URL_PROPERTY_ID, 'rich_text')?.rich_text[0]?.plain_text || null,
    thumbnailImageUrl:
      props.get(THUMBNAIL_IMAGE_URL_PROPERTY_ID, 'rich_text')?.rich_text[0]?.plain_text || null,
    tags: props.get(TAGS_PROPERTY_ID, 'multi_select')?.multi_select.map((tag) => tag.name) || [],
    date: props.get(DATE_PROPERTY_ID, 'created_time')?.created_time!,
    isPublished: !page.archived,
  }
}

const getPages = async (params: QueryDatabaseParameters): Promise<NotionDatabaseObject[]> => {
  const res = await notion.databases.query(params)
  return res.results.map((result) => {
    return result as NotionDatabaseObject
  })
}

export function createPagePropertyMap(page: NotionDatabaseObject) {
  const properties = Object.fromEntries(
    Object.values(page.properties).map((prop) => [prop.id, prop]),
  )
  return {
    get<PropType extends string>(id: string, type: PropType) {
      const prop = properties[id]
      if (!prop || !matchPropertyType(prop, type)) {
        return null
      }
      return prop
    },
  } as const
}

function matchPropertyType<PropType extends string, Prop extends { type: string }>(
  property: Prop,
  type: PropType,
): property is MatchType<Prop, { type: PropType }> {
  return property.type === type
}
