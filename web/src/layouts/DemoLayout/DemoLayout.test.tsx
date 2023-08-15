import { render } from '@redwoodjs/testing/web'

import DemoLayout from './DemoLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DemoLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DemoLayout />)
    }).not.toThrow()
  })
})
