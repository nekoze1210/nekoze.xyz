'use client'
import { HatenaIcon, HatenaShareButton } from 'react-share'

export interface ShareButtonsProps {
  title: string
  url: string
}
export const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  return (
    <HatenaShareButton title={title} url={url}>
      <HatenaIcon size={32}></HatenaIcon>
    </HatenaShareButton>
  )
}
