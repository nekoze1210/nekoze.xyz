import { FC, ReactNode } from 'react'

const TileItemHeading: FC<{ children: ReactNode }> = ({ children }) => {
  return <h3>{children}</h3>
}

export default TileItemHeading
