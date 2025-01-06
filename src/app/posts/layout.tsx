'use client'
import '@/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'container mx-auto max-w-[1200px]'}>
      <div className={'min-h-screen p-3'}>
        <section>{children}</section>
      </div>
    </div>
  )
}
