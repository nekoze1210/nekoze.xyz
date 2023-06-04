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
        <div className={'flex flex-col md:flex-row justify-between'}>
          <div className={'drop-shadow mt-10 md:mr-2 md:basis-2/3'}>
            <Skills />
          </div>
          <div className={'drop-shadow my-10 md:ml-2 md:basis-1/3'}>
            <WorkExperiences />
          </div>
        </div>
      </main>
    </div>
  )
}
