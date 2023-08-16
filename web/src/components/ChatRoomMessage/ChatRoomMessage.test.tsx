import { render } from '@redwoodjs/testing/web'

import ChatRoomMessage from './ChatRoomMessage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatRoomMessage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatRoomMessage />)
    }).not.toThrow()
  })
})
