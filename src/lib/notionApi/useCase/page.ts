import { Client } from '@notionhq/client'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { NotionDatabaseObject } from '@/lib/notionApi/types'
import { MatchType } from '@/lib/util/types'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const databaseId = process.env.NOTION_DATABASE_ID

export const listPublicPages = async () => {
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

  return pages.map((page: NotionDatabaseObject) => {
    const props = createPagePropertyMap(page)
    return {
      id: page.id,
      title: props.get('title', 'title')?.title[0]?.plain_text,
      slug: props.get('d%5E%3Ed', 'rich_text')?.rich_text[0]?.plain_text,
      description: props.get('%40ixV', 'rich_text')?.rich_text[0]?.plain_text || '',
      ogImageUrl: props.get('_oVp', 'rich_text')?.rich_text[0]?.plain_text || '',
      thumbnailImageUrl: props.get('3CjCF', 'rich_text')?.rich_text[0]?.plain_text || '',
      tags: props.get('_%3A%3Ey', 'multi_select')?.multi_select.map((tag) => tag.name),
      date: props.get('L%3CK%5E', 'created_time')?.created_time,
      isPublished: !page.archived,
    }
  })
}

export const listPublicPagesByTag = async (tag: string) => {
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
  return pages.map((page: NotionDatabaseObject) => {
    const props = createPagePropertyMap(page)
    return {
      id: page.id,
      title: props.get('title', 'title')?.title[0]?.plain_text,
      slug: props.get('d%5E%3Ed', 'rich_text')?.rich_text[0]?.plain_text,
      description: props.get('%40ixV', 'rich_text')?.rich_text[0]?.plain_text || '',
      ogImageUrl: props.get('_oVp', 'rich_text')?.rich_text[0]?.plain_text || '',
      thumbnailImageUrl: props.get('3CjCF', 'rich_text')?.rich_text[0]?.plain_text || '',
      tags: props.get('_%3A%3Ey', 'multi_select')?.multi_select.map((tag) => tag.name),
      date: props.get('L%3CK%5E', 'created_time')!.created_time,
      isPublished: !page.archived,
    }
  })
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
