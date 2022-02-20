import { VFC } from 'react'
import { Heading } from '@/types/post'

export const HeadingBlock: VFC<Heading> = ({ heading_type, text }) => {
  switch (heading_type) {
    case 'heading_1':
      return <h1 className='text-2xl font-bold tracking-tight'>{text}</h1>
    case 'heading_2':
      return <h2 className='text-xl font-bold tracking-tight'>{text}</h2>
    case 'heading_3':
      return <h3 className='text-lg font-bold tracking-tight'>{text}</h3>
  }
}
