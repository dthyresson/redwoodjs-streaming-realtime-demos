import type { Meta, StoryObj } from '@storybook/react'

import DemoLayout from './DemoLayout'

const meta: Meta<typeof DemoLayout> = {
  component: DemoLayout,
}

export default meta

type Story = StoryObj<typeof DemoLayout>

export const Primary: Story = {}
