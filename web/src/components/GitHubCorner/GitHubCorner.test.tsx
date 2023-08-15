import { render } from '@redwoodjs/testing/web'

import GitHubCorner from './GitHubCorner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GitHubCorner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GitHubCorner />)
    }).not.toThrow()
  })
})
