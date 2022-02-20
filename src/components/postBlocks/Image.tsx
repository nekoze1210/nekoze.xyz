import Image from 'next/image'
import React, { VFC } from 'react'
import { Image as PostImage } from '@/types/post'

export const ImageBlock: VFC<PostImage> = ({ url, id, caption }) => {
  return (
    <div>
      <div className='relative'>
        <Image
          id={id}
          src={url}
          alt={caption.map((text) => text.content).join('') || undefined}
          width='100%'
          height='100%'
          layout='responsive'
          objectFit='contain'
        />
      </div>
    </div>
  )
}
