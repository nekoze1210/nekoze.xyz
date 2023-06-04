import { FC, ReactNode } from 'react'

const Tile: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={'mx-[16px] rounded-[20px] bg-[#FEFEFE] p-6 dark:bg-black md:mx-0'}>
      {children}
    </div>
  )
}

export default Tile
