import { Footer } from 'src/components/Footer'

type DemoLayoutProps = {
  children?: React.ReactNode
}

const DemoLayout = ({ children }: DemoLayoutProps) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}

export default DemoLayout
