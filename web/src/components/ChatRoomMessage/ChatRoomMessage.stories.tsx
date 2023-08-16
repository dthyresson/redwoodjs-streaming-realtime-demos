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

import ChatRoomMessage from './ChatRoomMessage'

const meta: Meta<typeof ChatRoomMessage> = {
  component: ChatRoomMessage,
}

export default meta

type Story = StoryObj<typeof ChatRoomMessage>

export const Primary: Story = {
  args: {
    chatMessage: {
      id: 1,
      message: 'Hello',
      user: {
        name: 'Amy Dutton',
        color: 'vividYellow',
      },
    },
  },
}
