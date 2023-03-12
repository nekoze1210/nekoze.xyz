import { VFC } from 'react'

import { TextBlock } from '@/components/postBlocks/Text'
import { Paragraph } from '@/types/post'

export const ParagraphBlock: VFC<Paragraph> = ({ id, texts }) => {
  if (!texts) return <p />
  const textBlocks = texts.map((text, index) => {
    return (
      <TextBlock
        content={text.content}
        annotations={text.annotations}
        link={text.link}
        key={`paragraph_${id}_text_${index}`}
      />
    )
  })
  return <p className={'mb-4'}>{textBlocks}</p>
}
