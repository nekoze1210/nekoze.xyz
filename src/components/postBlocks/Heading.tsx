import { VFC } from 'react'

import { TextBlock } from '@/components/postBlocks/Text'
import { Heading } from '@/types/post'

export const HeadingBlock: VFC<Heading> = ({ id, heading_type, texts }) => {
  const text = texts.map((text, index) => (
    <TextBlock
      key={`heading_${id}_text_${index}`}
      content={text.content}
      annotations={text.annotations}
      link={text.link}
    />
  ))
  switch (heading_type) {
    case 'heading_1':
      return <h1 className='text-2xl font-bold tracking-tight'>{text}</h1>
    case 'heading_2':
      return <h2 className='text-xl font-bold tracking-tight'>{text}</h2>
    case 'heading_3':
      return <h3 className='text-lg font-bold tracking-tight'>{text}</h3>
  }
}
