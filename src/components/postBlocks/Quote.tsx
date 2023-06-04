'use client'
import { FC } from 'react'

import { TextBlock } from '@/components/postBlocks/Text'
import { Quote } from '@/types/post'

export const QuoteBlock: FC<Quote> = ({ id, texts }) => {
  return (
    <div className='dark:border-gr max-w-4xl border-l-4 border-wild-sand bg-white text-gray-800 dark:bg-cod-gray dark:text-white'>
      <div className='mb-2'>
        <p className='px-4 text-gray-600 dark:text-white'>
          {texts.map((text, number) => (
            <TextBlock
              key={`quote_${id}_text_${number}`}
              annotations={text.annotations}
              link={text.link}
              content={text.content}
            />
          ))}
        </p>
      </div>
    </div>
  )
}
