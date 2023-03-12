import Link from 'next/link'
import { VFC } from 'react'

import { Text } from '@/types/post'

export const TextBlock: VFC<Text> = ({ content, link, annotations }) => {
  const { bold, code, strikethrough, underline, italic } = annotations
  const className =
    [
      'text',
      'text-gray-900 dark:text-white',
      'leading-loose',
      'tracking-wide',
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
  return (
    <span className={className}>
      {link ? (
        <Link href={link} target='_blank' rel='noreferrer' legacyBehavior>
          {content}
        </Link>
      ) : (
        content
      )}
    </span>
  )
}
