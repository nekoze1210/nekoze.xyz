'use client'

import { FC, ReactNode } from 'react'

const TileItem: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={'mt-3'}>{children}</div>
}

export default TileItem
