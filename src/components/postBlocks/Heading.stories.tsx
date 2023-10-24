import { Meta, StoryObj } from '@storybook/react'

import { HeadingBlock } from '@/components/postBlocks/Heading'
import { Heading } from '@/types/post'

const meta = {
  title: 'Components/PostBlock/Heading',
  component: HeadingBlock,
} as Meta<typeof HeadingBlock>

export default meta

export const Default: StoryObj<Heading> = {
  args: headingFixture(),
}

export const Heading1: StoryObj<Heading> = {
  args: {
    ...headingFixture(),
    texts: [
      {
        content: 'Heading 1',
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        link: null,
      },
    ],
  },
}

export const Heading2: StoryObj<Heading> = {
  args: {
    ...headingFixture(),
    type: 'heading_2',
    heading_type: 'heading_2',
    texts: [
      {
        content: 'Heading 2',
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        link: null,
      },
    ],
  },
}

export const Heading3: StoryObj<Heading> = {
  args: {
    ...headingFixture(),
    type: 'heading_3',
    heading_type: 'heading_3',
    texts: [
      {
        content: 'Heading 3',
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        link: null,
      },
    ],
  },
}

function headingFixture(): Heading {
  return {
    id: 'heading',
    type: 'heading_1',
    heading_type: 'heading_1',
    isChild: false,
    texts: [
      {
        content: 'Heading',
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        link: null,
      },
    ],
  }
}
