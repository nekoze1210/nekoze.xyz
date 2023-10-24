import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ListBlock, ListProps } from '@/components/postBlocks/List'

const meta = {
  title: 'Components/PostBlock/List',
  component: ListBlock,
} as Meta<typeof ListBlock>

export default meta

export const Default: StoryObj<ListProps> = {
  args: listFixture(),
}

function listFixture(): ListProps {
  return {
    id: 'list-1',
    type: 'bulleted_list_item',
    isChild: false,
    listType: 'bulleted',
    texts: [
      {
        content: 'List item 1',
        annotations: {
          bold: false,
          code: false,
          color: 'default',
          italic: false,
          strikethrough: false,
          underline: false,
        },
        link: null,
      },
    ],
    hasChildren: true,
    childrenBlocks: [],
    children: (
      <ListBlock
        id={'list-2'}
        childrenBlocks={[]}
        type='bulleted_list_item'
        listType='bulleted'
        texts={[
          {
            content: 'List item 2',
            annotations: {
              bold: false,
              code: false,
              color: 'default',
              italic: false,
              strikethrough: false,
              underline: false,
            },
            link: null,
          },
        ]}
        hasChildren={false}
        isChild={false}
      />
    ) as React.ReactNode,
  }
}
