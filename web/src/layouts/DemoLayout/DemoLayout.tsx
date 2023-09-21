import React, { useState, useMemo } from 'react'

import { Footer } from 'src/components/Footer'

// Define a type for the context value
type HistoryContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any[] // Replace 'any[]' with the actual type of your history data
  clearHistory: () => void
}

export const HistoryContext = React.createContext<HistoryContextValue>({
  history: [], // Provide an initial value that matches the type
  clearHistory: () => {}, // Provide an initial function that does nothing
})

type DemoLayoutProps = {
  children?: React.ReactNode
}

const DemoLayout = ({ children }: DemoLayoutProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<any[]>([]) // Replace 'any[]' with your actual data type

  // Create a memoized context value that includes both the history data and a function to clear it.
  const contextValue: HistoryContextValue = useMemo(
    () => ({
      history,
      clearHistory: () => setHistory([]), // Function to clear the history
    }),
    [history]
  )

  return (
    <HistoryContext.Provider value={contextValue}>
      <div>
        {children}
        <Footer />
      </div>
    </HistoryContext.Provider>
  )
}

export default DemoLayout
