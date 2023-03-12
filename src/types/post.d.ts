import { Block } from '@babel/types'

export type Tag = {
  name: string
}

export const BLOCK_TYPES = [
  'paragraph',
  'heading_1',
  'heading_2',
  'heading_3',
  'bulleted_list_item',
  'numbered_list_item',
  'to_do',
  'toggle',
  'child_page',
  'child_database',
  'embed',
  'image',
  'video',
  'file',
  'pdf',
  'bookmark',
  'callout',
  'quote',
  'equation',
  'divider',
  'table_of_contents',
  'column',
  'column_list',
  'link_preview',
  'synced_block',
  'template',
  'link_to_page',
  'table',
  'table_row',
  'code',
  'unsupported',
] as const
export type BlockTuple = typeof BLOCK_TYPES
export type BlockType = BlockTuple[number]

export type BlockObjectBase = {
  id: string
  type: BlockType
  isChild: boolean
}

export type BlockObject = Heading | Divider | Quote | ToDo | List
export type BlockObjects = BlockObject[]

export type Annotations = {
  bold: false
  italic: false
  strikethrough: false
  underline: false
  code: false
  color: 'default'
}

export type Text = {
  content: string | ''
  annotations: Annotations
  link: string | null
}

export type Paragraph = {
  type: 'paragraph'
  texts: Text[] | []
} & BlockObjectBase

export type Heading = {
  type: 'heading_1' | 'heading_2' | 'heading_3'
  texts: Text[] | []
  heading_type: 'heading_1' | 'heading_2' | 'heading_3'
} & BlockObjectBase

export type Quote = {
  texts: Text[] | []
} & BlockObjectBase

export type ToDo = {
  texts: Text[] | []
  isChecked: boolean
} & BlockObjectBase

export type Code = {
  text: string
  language: string
} & BlockObjectBase

export type Image = {
  url: string
  caption: Text[] | []
} & BlockObjectBase

export type List = {
  type: 'numbered_list_item' | 'bulleted_list_item'
  listType: 'bulleted' | 'numbered'
  texts: Text[] | []
  hasChildren: boolean
  childrenBlocks: BlockObjects | []
} & BlockObjectBase

export type Post = {
  id: string
  slug: string
  title: string
  tags: Tag[]
  date: string | Date
  isPublished: boolean
  ogImageUrl: string
  thumbnailImageUrl: string
  description: string
  blocks: BlockObjects
}
