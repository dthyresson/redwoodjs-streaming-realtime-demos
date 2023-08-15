import type { Meta, StoryObj } from '@storybook/react'

import CountdownPage from './CountdownPage'

const meta: Meta<typeof CountdownPage> = {
  component: CountdownPage,
}

export default meta

type Story = StoryObj<typeof CountdownPage>

export const Primary: Story = {}
