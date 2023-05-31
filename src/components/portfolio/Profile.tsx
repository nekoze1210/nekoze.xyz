import React, { FC } from 'react'

const Profile: FC = () => {
  return (
    <div className={'mt-10 flex justify-between'}>
      <div>
        <h2 className={'text-[50px] font-bold'}>Daiki Nagaoka</h2>
        <p className={'text-[16px]'}>Software Developer</p>
      </div>
      <div>
        <img
          src='https://avatars.githubusercontent.com/u/14988862?v=4'
          className={'rounded-[20px] w-[200px] h-[200px]'}
          alt={'logo'}
        />
      </div>
    </div>
  )
}

export default Profile
