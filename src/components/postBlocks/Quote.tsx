import { VFC } from 'react'
import { Quote } from '@/types/post'

export const QuoteBlock: VFC<Quote> = ({ text }) => {
  return (
    <div className='max-w-4xl text-gray-800 dark:text-white bg-white dark:bg-cod-gray border-l-4 border-wild-sand dark:border-gr'>
      <div className='mb-2'>
        <p className='px-4 text-gray-600 dark:text-white'>{text}</p>
      </div>
    </div>
  )
}
