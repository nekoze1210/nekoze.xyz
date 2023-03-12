import { Client } from '@notionhq/client'

import { ElementType, MatchType } from '@/types'

export type NotionDatabaseObject = MatchType<
  ElementType<Awaited<ReturnType<Client['databases']['query']>>['results']>,
  {
    properties: unknown
  }
>

export type NotionBlockObject = MatchType<
  ElementType<Awaited<ReturnType<Client['blocks']['children']['list']>>['results']>,
  { type: unknown }
> & {
  depth: number
  children?: NotionBlockObject[]
}
export const notNull = <T>(item: T | null): item is T => {
  return item !== null
}
