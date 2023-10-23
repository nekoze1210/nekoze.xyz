import { Meta, StoryObj } from '@storybook/react'

import { QuoteBlock } from '@/components/postBlocks/Quote'
import { Quote } from '@/types/post'

const meta = {
  title: 'Components/PostBlock/Quote',
  component: QuoteBlock,
} as Meta<typeof QuoteBlock>

export default meta

export const Default: StoryObj<Quote> = {
  args: {
    id: 'quote-1',
    type: 'quote',
    texts: [
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.',
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
