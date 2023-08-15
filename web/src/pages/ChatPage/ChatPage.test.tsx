import { render } from '@redwoodjs/testing/web'

import ChatPage from './ChatPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ChatPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatPage />)
    }).not.toThrow()
  })
})
