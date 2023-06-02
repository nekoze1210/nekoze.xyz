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
      company: 'XYZ, Inc.',
      employmentStatus: 'Full-Time',
      period: '2021-present',
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
        <div className={'flex justify-end items-end mt-5'}>
          <Link
            href={'/'}
            target={'_blank'}
            className={'flex items-end border-b-[1px] hover:text-blue-400 hover:border-blue-400'}
          >
            <p>Resume(JA)</p>
            <p className={'ml-1'}>
              <RxExternalLink />
            </p>
          </Link>
        </div>
      </Tile>
    </>
  )
}

export default WorkExperiences
