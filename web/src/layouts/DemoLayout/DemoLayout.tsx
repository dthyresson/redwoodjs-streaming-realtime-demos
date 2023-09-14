import React from 'react'

import { Footer } from 'src/components/Footer'
// import { History } from 'src/components/History/History'
export const HistoryContext = React.createContext([])

type DemoLayoutProps = {
  children?: React.ReactNode
}

const DemoLayout = ({ children }: DemoLayoutProps) => {
  return (
    <HistoryContext.Provider value={[]}>
      <div>
        {children}
        <Footer />
      </div>
    </HistoryContext.Provider>
  )
}

export default DemoLayout
