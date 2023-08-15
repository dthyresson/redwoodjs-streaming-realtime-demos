import { Footer } from 'src/components/Footer'

type DemoLayoutProps = {
  children?: React.ReactNode
}

const DemoLayout = ({ children }: DemoLayoutProps) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default DemoLayout
