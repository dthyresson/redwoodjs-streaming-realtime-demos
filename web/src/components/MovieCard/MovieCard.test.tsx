import { render } from '@redwoodjs/testing/web'

import MovieCard from './MovieCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MovieCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MovieCard />)
    }).not.toThrow()
  })
})
