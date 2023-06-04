import { FC } from 'react'

const TileTitle: FC<{ title: string }> = ({ title }) => {
  return <h2 className={'text-2xl font-bold'}>{title}</h2>
}

export default TileTitle
