import { Meta, StoryObj } from '@storybook/react'

import { ImageBlock } from '@/components/postBlocks/Image'
import { Image as PostImage } from '@/types/post'

const meta = {
  title: 'Components/PostBlock/Image',
  component: ImageBlock,
} as Meta<typeof ImageBlock>

export default meta
export const Default: StoryObj<PostImage> = {
  args: {
    id: 'image-1',
    type: 'image',
    url: 'https://placehold.jp/250x250.png',
    caption: [
      {
        content: '',
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
