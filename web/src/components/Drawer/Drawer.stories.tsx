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

import Drawer from './Drawer'

const meta: Meta<typeof Drawer> = {
  component: Drawer,
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Primary: Story = {
  args: {
    children: <p>Drawer content</p>,
  },
}
