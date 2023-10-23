import { Meta, StoryObj } from '@storybook/react'

import { ParagraphBlock } from '@/components/postBlocks/Paragraph'
import { Paragraph } from '@/types/post'

const meta = {
  title: 'Components/PostBlock/Paragraph',
  component: ParagraphBlock,
} as Meta<typeof ParagraphBlock>

export default meta

export const Default: StoryObj<Paragraph> = {
  args: {
    id: 'paragraph-1',
    type: 'paragraph',
    texts: [
      {
        content: 'Paragraph 1',
        link: null,
        annotations: {
          bold: false,
          code: false,
          color: 'default',
          italic: false,
          strikethrough: false,
          underline: false,
        },
      },
    ],
  },
}
