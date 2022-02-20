import { VFC } from 'react'
import { TextBlock } from '@/components/postBlocks/Text'
import { Quote } from '@/types/post'

export const QuoteBlock: VFC<Quote> = ({ id, texts }) => {
  return (
    <div className='max-w-4xl text-gray-800 dark:text-white bg-white dark:bg-cod-gray border-l-4 border-wild-sand dark:border-gr'>
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
