import { FC } from 'react'

export const HeaderPopover: FC<{ text?: string; visible: boolean }> = ({ text, visible }) => {
  return (
    <div
      className={`${
        visible && 'md:block'
      } hidden transition duration-150 ease-in-out md:mt-2 w-auto absolute top-full bottom-0`}
    >
      {text && (
        <div className={'bg-gray-400 p-2 rounded-[5px]'}>
          <p>{text}</p>
        </div>
      )}
    </div>
  )
}
