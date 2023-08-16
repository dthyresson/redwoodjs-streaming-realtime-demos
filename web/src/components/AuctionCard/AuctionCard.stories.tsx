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

import AuctionCard from './AuctionCard'

const meta: Meta<typeof AuctionCard> = {
  component: AuctionCard,
}

export default meta

type Story = StoryObj<typeof AuctionCard>

export const Primary: Story = {}
