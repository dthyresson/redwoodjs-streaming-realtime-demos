import { render } from '@redwoodjs/testing/web'

import CountdownPage from './CountdownPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CountdownPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CountdownPage />)
    }).not.toThrow()
  })
})
