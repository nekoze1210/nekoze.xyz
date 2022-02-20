import { ReactNode, VFC } from 'react'
import { List } from '@/types/post'

export type ListProps = {
  children?: ReactNode
} & List

export const ListBlock: VFC<ListProps> = ({
  id,
  listType,
  text,
  hasChildren,
  children,
  isChild,
}) => {
  switch (listType) {
    case 'bulleted':
    case 'numbered':
      if (isChild) {
        return (
          <li className='ml-4 list-outside'>
            {text}
            {hasChildren ? children : null}
          </li>
        )
      }
      return (
        <ul className='pl-4 list-disc list-outside'>
          <li>{text}</li>
          {hasChildren ? children : null}
        </ul>
      )
  }
}
