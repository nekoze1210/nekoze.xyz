import { FC } from 'react'

export const HeaderPopover: FC<{ text?: string; visible: boolean }> = ({ text, visible }) => {
  return (
    <div
      className={`${
        visible && 'md:block'
      } absolute bottom-0 top-full hidden w-auto transition duration-150 ease-in-out md:mt-2`}
    >
      {text && (
        <div className={'rounded-[5px] bg-[#FF4D6B] p-2'}>
          <p>{text}</p>
        </div>
      )}
    </div>
  )
}
