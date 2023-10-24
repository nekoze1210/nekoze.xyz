import { StoryObj } from '@storybook/react'

import { CodeBlock } from '@/components/postBlocks/Code'
import { Code } from '@/types/post'

const meta = {
  title: 'Components/PostBlock/Code',
  component: CodeBlock,
}

export default meta

export const Default: StoryObj<Code> = {
  args: {
    id: 'code-1',
    text: 'const a = 1',
    language: 'javascript',
  },
}
