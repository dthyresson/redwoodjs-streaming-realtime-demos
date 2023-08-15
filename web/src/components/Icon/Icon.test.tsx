import { render } from '@redwoodjs/testing/web'

import Icon from './Icon'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Icon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Icon />)
    }).not.toThrow()
  })
})
