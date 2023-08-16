// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import { chatMessage } from '../ChatRoomMessage/ChatRoomMessage'

import ChatRoom from './ChatRoom'

const meta: Meta<typeof ChatRoom> = {
  component: ChatRoom,
}

export default meta

type Story = StoryObj<typeof ChatRoom>

export const chatFeed = [
  {
    id: 1,
    message: 'Hello',
    user: {
      name: 'Amy Dutton',
      color: 'vividYellow',
    },
  },
  {
    id: 3,
    message: 'Hey hey!',
    user: {
      name: 'Henry Dutton',
      color: 'orchid',
    },
  },
  {
    id: 3,
    message: 'How are you?',
    user: {
      name: 'Amy Dutton',
      color: 'vividYellow',
    },
  },
  {
    id: 4,
    message: 'Pretty good',
    user: {
      name: 'Henry Dutton',
      color: 'orchid',
    },
  },
] as chatMessage[]

export const Primary: Story = {
  args: {
    chatRoomNumber: 1,
    roomColor: 'coral',
    chatFeed,
  },
}
