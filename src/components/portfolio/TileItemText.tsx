import { FC, ReactNode } from 'react'

const TileItemText: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={'text-[#585858] dark:text-[#DBDBDB]'}>{children}</p>
}

export default TileItemText
