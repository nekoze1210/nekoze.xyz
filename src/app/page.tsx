'use client'

import Head from 'next/head'

import Profile from '@/components/portfolio/Profile'
import Skills from '@/components/portfolio/Skills'
import WorkExperiences from '@/components/portfolio/WorkExperiences'

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>nekoze.xyz</title>
      </Head>
      <main>
        <div className={'mt-10'}>
          <Profile />
        </div>
        <div className={'flex flex-col justify-between md:flex-row'}>
          <div className={'mt-10 drop-shadow md:mr-2 md:basis-2/3'}>
            <Skills />
          </div>
          <div className={'my-10 drop-shadow md:ml-2 md:basis-1/3'}>
            <WorkExperiences />
          </div>
        </div>
      </main>
    </div>
  )
}
