import { FC, ReactNode } from 'react'

const Tile: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={'bg-[#FEFEFE] dark:bg-black rounded-[20px] mx-[16px] md:mx-0 p-6'}>
      {children}
    </div>
  )
}

export default Tile
