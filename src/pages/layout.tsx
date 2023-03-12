import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={'container mx-auto my-3 p-3'}>
        <Header />
      </div>
      <div className={'container min-h-screen p-3'}>{children}</div>
      <div className={'container mx-auto my-3'}>
        <Footer />
      </div>
    </>
  )
}

type Props = {
  children: ReactNode
}

export default Layout
