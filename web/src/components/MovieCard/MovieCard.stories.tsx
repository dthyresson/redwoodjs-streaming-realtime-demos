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

import MovieCard from './MovieCard'

const meta: Meta<typeof MovieCard> = {
  component: MovieCard,
}

export default meta

type Story = StoryObj<typeof MovieCard>

export const Primary: Story = {
  args: {
    movie: {
      id: '11-star-wars',
      title: 'Star Wars',
      photo: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
    },
  },
}
