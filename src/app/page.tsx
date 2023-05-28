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
        <p>TODO</p>
      </main>
    </div>
  )
}
