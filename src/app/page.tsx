import Head from 'next/head'
import React from 'react'

import { Post } from '@/types/post'

type HomeProps = {
  posts: Post[]
}

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>nekoze.xyz</title>
      </Head>
      <main>
        <h2>Daiki Nagaoka</h2>
      </main>
    </div>
  )
}
