import { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={'container mx-auto my-3 p-3'}>
        <Header />
      </div>
      <div className={'min-h-screen'}>{children}</div>
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
