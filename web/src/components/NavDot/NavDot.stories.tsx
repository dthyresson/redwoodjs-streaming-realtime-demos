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

import NavDot from './NavDot'

const meta: Meta<typeof NavDot> = {
  component: NavDot,
}

export default meta

type Story = StoryObj<typeof NavDot>

export const Primary: Story = {}
