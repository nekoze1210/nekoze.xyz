import { Meta, StoryObj } from '@storybook/react'

import { TextBlock } from '@/components/postBlocks/Text'
import { Text } from '@/types/post'

const meta = {
  title: 'Components/PostBlock/Text',
  component: TextBlock,
} as Meta<typeof TextBlock>

export default meta

export const Default: StoryObj<Text> = {
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.',
    annotations: {
      bold: false,
      code: false,
      color: 'default',
      italic: false,
      strikethrough: false,
      underline: false,
    },
  },
}
