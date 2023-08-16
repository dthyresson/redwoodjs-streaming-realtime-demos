import { render } from '@redwoodjs/testing/web'

import ChatRoom from './ChatRoom'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatRoom', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatRoom />)
    }).not.toThrow()
  })
})
