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

export type BlockObject = {
  id: string
  type: BlockType
  isChild: boolean
}

export type BlockObjects = (Heading | Divider | Quote | ToDo | List)[]

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
} & BlockObject

export type Heading = {
  type: 'heading_1' | 'heading_2' | 'heading_3'
  text: string | '' // TODO: type alias "Text" に変換できるようにする
  heading_type: 'heading_1' | 'heading_2' | 'heading_3'
} & BlockObject

export type Quote = {
  text: string | '' // TODO: type alias "Text" に変換できるようにする
} & BlockObject

export type ToDo = {
  text: string | '' // TODO: type alias "Text" に変換できるようにする
  isChecked: boolean
} & BlockObject

export type Code = {
  text: string
  language: string
} & BlockObject

export type Image = {
  url: string
  caption: string | '' // TODO: type alias "Text" に変換できるようにする
} & BlockObject

export type List = {
  type: 'numbered_list_item' | 'bulleted_list_item'
  listType: 'bulleted' | 'numbered'
  texts: Text[]
  hasChildren: boolean
  childrenBlocks: BlockObjects | []
} & BlockObject

export type Post = {
  id: string
  slug: string
  title: string
  tags: Tag[]
  date: Date
  isPublished: boolean
  ogImageUrl: string
  thumbnailImageUrl: string
  description: string
  blocks: BlockObjects
}
