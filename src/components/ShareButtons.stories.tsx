import { Meta, StoryObj } from '@storybook/react'

import { ShareButtons, ShareButtonsProps } from '@/components/ShareButtons'

const meta = {
  title: 'Components/ShareButtons',
  component: ShareButtons,
} as Meta<typeof ShareButtons>

export default meta

export const Default: StoryObj<ShareButtonsProps> = {
  args: {
    title: 'nekoze.xyz',
    url: 'https://nekoze.xyz',
  },
}
