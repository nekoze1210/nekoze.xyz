'use client'
import { FC } from 'react'

import { TextBlock } from '@/components/postBlocks/Text'
import { ToDo } from '@/types/post'

export const TodoBlock: FC<ToDo> = ({ id, texts, isChecked }) => {
  return (
    <div className='flex items-start'>
      <div className='flex h-4 items-center'>
        <input
          id={id}
          itemID={id}
          type='checkbox'
          defaultChecked={isChecked}
          className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
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
