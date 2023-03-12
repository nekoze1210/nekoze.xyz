import { ReactNode, VFC } from 'react'

import { TextBlock } from '@/components/postBlocks/Text'
import { List } from '@/types/post'

export type ListProps = {
  children?: ReactNode
} & List

export const ListBlock: VFC<ListProps> = ({
  id,
  listType,
  hasChildren,
  children,
  isChild,
  texts,
}) => {
  switch (listType) {
    case 'bulleted':
    case 'numbered':
      if (isChild) {
        return (
          <li className='ml-4 list-outside'>
            {texts.map((text, index) => {
              return (
                <TextBlock
                  key={`list_${id}_text_${index}`}
                  content={text.content}
                  annotations={text.annotations}
                  link={text.link}
                />
              )
            })}

            {hasChildren ? children : null}
          </li>
        )
      }
      return (
        <ul className='pl-4 list-disc list-outside'>
          <li>
            {texts.map((text, index) => {
              return (
                <TextBlock
                  key={`list_${id}_text_${index}`}
                  content={text.content}
                  annotations={text.annotations}
                  link={text.link}
                />
              )
            })}
          </li>
          {hasChildren ? children : null}
        </ul>
      )
  }
}
