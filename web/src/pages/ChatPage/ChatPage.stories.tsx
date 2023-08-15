import type { Meta, StoryObj } from '@storybook/react'

import ChatPage from './ChatPage'

const meta: Meta<typeof ChatPage> = {
  component: ChatPage,
}

export default meta

type Story = StoryObj<typeof ChatPage>

export const Primary: Story = {}
