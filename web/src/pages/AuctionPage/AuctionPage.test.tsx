import { render } from '@redwoodjs/testing/web'

import AuctionPage from './AuctionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AuctionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuctionPage />)
    }).not.toThrow()
  })
})
