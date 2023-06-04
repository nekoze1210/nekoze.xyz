'use client'
import React, { FC } from 'react'

const Profile: FC = () => {
  return (
    <div className={'flex w-full flex-col md:flex-row-reverse md:justify-between'}>
      <div className={'mx-auto md:mx-0'}>
        <img
          src='https://avatars.githubusercontent.com/u/14988862?v=4'
          className={'h-[200px] w-[200px] rounded-[20px]'}
          alt={'logo'}
        />
      </div>
      <div className={'mx-[16px] mt-[20px] md:mx-0 md:mt-0 '}>
        <h2 className={'text-[50px] font-bold leading-[120%]'}>
          Daiki <br className={'md:hidden'} />
          Nagaoka
        </h2>
        <p className={'mt-[10px] text-[16px] md:max-w-[400px]'}>
          Hi, my name is Daiki Nagaoka and I use @nekoze as my nickname across social medias. I’m a
          Software Developer from Japan.
        </p>
      </div>
    </div>
  )
}

export default Profile
