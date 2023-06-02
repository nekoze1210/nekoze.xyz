'use client'
import React, { FC } from 'react'

const Profile: FC = () => {
  return (
    <div className={'flex flex-col md:flex-row-reverse md:justify-between w-full'}>
      <div className={'mx-auto md:mx-0'}>
        <img
          src='https://avatars.githubusercontent.com/u/14988862?v=4'
          className={'rounded-[20px] w-[200px] h-[200px]'}
          alt={'logo'}
        />
      </div>
      <div className={'mx-[16px] mt-[20px] md:mt-0 md:mx-0 '}>
        <h2 className={'text-[50px] font-bold leading-[120%]'}>
          Daiki <br className={'md:hidden'} />
          Nagaoka
        </h2>
        <p className={'mt-[10px] md:max-w-[400px] text-[16px]'}>
          Hi, my name is Daiki Nagaoka and I use @nekoze as my nickname across social medias. I’m a
          Software Developer from Japan.
        </p>
      </div>
    </div>
  )
}

export default Profile
