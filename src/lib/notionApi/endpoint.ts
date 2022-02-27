import { Client } from '@notionhq/client'
import {
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionBlockObject, NotionDatabaseObject } from '@/lib/notionApi/types'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const queryDatabase = async (
  params: QueryDatabaseParameters,
): Promise<NotionDatabaseObject[]> => {
  const res = await notion.databases.query(params)
  return res.results.map((result) => {
    return result as NotionDatabaseObject
  })
}

export const getChildrenBlocks = async (blockId: string, depth = 0) => {
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
