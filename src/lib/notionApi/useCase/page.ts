import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const databaseId = process.env.NOTION_DATABASE_ID

export const listPublicPages = async () => {
  const result = await notion.databases.query({
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
  return result.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Page.title[0].plain_text,
      slug: page.properties.Slug.rich_text[0]?.plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text || '',
      ogImageUrl: page.properties.ogImageUrl.rich_text[0]?.plain_text || '',
      thumbnailImageUrl: page.properties.thumbnailImageUrl.rich_text[0]?.plain_text || '',
      tags: page.properties.Tag.multi_select.map((_: TODO) => _.name),
      date: page.properties.Date.created_time,
      isPublished: true,
    }
  })
}

export const listPublicPagesByTag = async (tag: string) => {
  const result = await notion.databases.query({
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
          property: 'Tag',
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
  return result.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Page.title[0].plain_text,
      slug: page.properties.Slug.rich_text[0]?.plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text || '',
      ogImageUrl: page.properties.ogImageUrl.rich_text[0]?.plain_text || '',
      thumbnailImageUrl: page.properties.thumbnailImageUrl.rich_text[0]?.plain_text || '',
      tags: page.properties.Tag.multi_select.map((_: TODO) => _.name),
      date: page.properties.Date.created_time,
      isPublished: true,
    }
  })
}
