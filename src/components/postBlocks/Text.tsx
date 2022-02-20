import { VFC } from 'react'
import { Text } from '@/types/post'

export const TextBlock: VFC<Text> = ({ content, link, annotations }) => {
  const { bold, code, strikethrough, underline, italic } = annotations
  return (
    <span
      className={
        [
          'text-gray-900 dark:text-gray-300',
          'whitespace-pre-line',
          bold ? 'font-bold' : '',
          code
            ? 'text-gray-900 bg-gray-300 dark:bg-gray-900 dark:text-gray-200 p-1 font-mono text-sm rounded-sm'
            : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ]
          .filter(String)
          .join(' ')
          .trim() || undefined
      }
    >
      {link ? (
        <a href={link} target='_blank' rel='noreferrer'>
          {content}
        </a>
      ) : (
        content
      )}
    </span>
  )
}
