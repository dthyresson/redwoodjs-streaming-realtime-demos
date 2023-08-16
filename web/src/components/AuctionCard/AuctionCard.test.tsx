import { render } from '@redwoodjs/testing/web'

import AuctionCard from './AuctionCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AuctionCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuctionCard />)
    }).not.toThrow()
  })
})
