import { render } from '@redwoodjs/testing/web'

import NavDot from './NavDot'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavDot', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavDot />)
    }).not.toThrow()
  })
})
