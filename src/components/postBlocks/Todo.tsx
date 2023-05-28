'use client'
import { FC } from 'react'

import { TextBlock } from '@/components/postBlocks/Text'
import { ToDo } from '@/types/post'

export const TodoBlock: FC<ToDo> = ({ id, texts, isChecked }) => {
  return (
    <div className='flex items-start'>
      <div className='flex items-center h-4'>
        <input
          id={id}
          itemID={id}
          type='checkbox'
          defaultChecked={isChecked}
          className='w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
        />
        <div className='ml-3'>
          <label htmlFor={id}>
            {texts.map((text, number) => (
              <TextBlock
                key={`todo_${id}_text_${number}`}
                annotations={text.annotations}
                link={text.link}
                content={text.content}
              />
            ))}
          </label>
        </div>
      </div>
    </div>
  )
}
