import type { Meta, StoryObj } from '@storybook/react'

import AuctionPage from './AuctionPage'

const meta: Meta<typeof AuctionPage> = {
  component: AuctionPage,
}

export default meta

type Story = StoryObj<typeof AuctionPage>

export const Primary: Story = {}
