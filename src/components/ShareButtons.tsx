'use client'
import { HatenaIcon, HatenaShareButton } from 'react-share'

type Props = {
  title: string
  url: string
}
export const ShareButtons = ({ title, url }: Props) => {
  return (
    <HatenaShareButton title={title} url={url}>
      <HatenaIcon size={32}></HatenaIcon>
    </HatenaShareButton>
  )
}
