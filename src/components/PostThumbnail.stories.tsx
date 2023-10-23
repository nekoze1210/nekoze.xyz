import { Meta, StoryObj } from '@storybook/react'

import { PostThumbnail } from '@/components/PostThumbnail'
import { PostPage } from '@/types/post'

const meta = {
  title: 'Components/PostThumbnail',
  component: PostThumbnail,
} as Meta<typeof PostThumbnail>

export default meta

export const Default: StoryObj<PostPage> = {
  args: {
    id: 'post-1',
    title: 'Post 1',
    slug: 'post-1',
    date: '2021-01-01',
    tags: [],
  },
}
