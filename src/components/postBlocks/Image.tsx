'use client'

import React, { FC } from 'react'
import Zoom from 'react-medium-image-zoom'

import { Image as PostImage } from '@/types/post'

export const ImageBlock: FC<PostImage> = ({ url, id, caption }) => {
  return (
    <div>
      <figure className={'mx-auto'}>
        <Zoom>
          <img src={url} alt={caption.map((text) => text.content).join('') || undefined} />
        </Zoom>
        <figcaption>{caption.map((text) => text.content).join('') || undefined}</figcaption>
      </figure>
    </div>
  )
}
