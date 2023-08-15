import { render } from '@redwoodjs/testing/web'

import Drawer from './Drawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Drawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Drawer />)
    }).not.toThrow()
  })
})
