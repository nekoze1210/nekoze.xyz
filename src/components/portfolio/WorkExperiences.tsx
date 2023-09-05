'use client'

import Link from 'next/link'
import React from 'react'
import { RxExternalLink } from 'react-icons/rx'

import Tile from '@/components/portfolio/Tile'
import TileItem from '@/components/portfolio/TileItem'
import TileItemHeading from '@/components/portfolio/TileItemHeading'
import TileItemText from '@/components/portfolio/TileItemText'
import TileTitle from '@/components/portfolio/TileTitle'

const WorkExperiences = () => {
  const workExperiences = [
    {
      company: 'Gaudiy Inc.',
      employmentStatus: 'Full-Time',
      period: '2023-present',
    },
    {
      company: 'XYZ, Inc.',
      employmentStatus: 'Full-Time',
      period: '2021-2023',
    },
    {
      company: 'GO Inc. (ex: JapanTaxi Co.,Ltd.)',
      employmentStatus: 'Full-Time',
      period: '2018-2021',
    },
    {
      company: 'Gurunavi, Inc.',
      employmentStatus: 'Full-Time',
      period: '2017-2018',
    },
    {
      company: 'div Inc.',
      employmentStatus: 'Internship',
      period: '2016-2017',
    },
  ]

  return (
    <>
      <Tile>
        <TileTitle title={'Work Experiences'} />
        {workExperiences.map((workExperience, index) => (
          <TileItem key={index}>
            <TileItemHeading>{workExperience.company}</TileItemHeading>
            <TileItemText>
              {workExperience.employmentStatus}
              <br />
              {workExperience.period}
            </TileItemText>
          </TileItem>
        ))}
        <div className={'mt-5 flex items-end justify-end'}>
          <Link
            href={'https://nekoze-dev.notion.site/2af1ff5ca435412dabaaf576a8a6a923'}
            target={'_blank'}
            className={
              'flex items-end border-b-[1px] hover:bg-gradient-to-br hover:from-[#FF4D6B] hover:to-[#5B69B1] hover:bg-clip-text hover:text-transparent'
            }
          >
            <p>Resume(JA)</p>
            <p className={'ml-1 text-black'}>
              <RxExternalLink />
            </p>
          </Link>
        </div>
      </Tile>
    </>
  )
}

export default WorkExperiences
