import { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={'my-3 container mx-auto p-3'}>
        <Header />
      </div>
      <div className={'h-screen'}>{children}</div>
      <div className={'bottom-0 container mx-auto '}>
        <Footer />
      </div>
    </>
  )
}

type Props = {
  children: ReactNode
}

export default Layout