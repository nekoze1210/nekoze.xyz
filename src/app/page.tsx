import Head from 'next/head'
import React from 'react'

import Biography from '@/components/portfolio/Biography'
import Experiences from '@/components/portfolio/Experiences'
import Profile from '@/components/portfolio/Profile'
import Skills from '@/components/portfolio/Skills'

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>nekoze.xyz</title>
      </Head>
      <main>
        <Profile />
        <Biography />
        <Skills />
        <Experiences />
      </main>
    </div>
  )
}
