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

import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  component: Icon,
}

export default meta

type Story = StoryObj<typeof Icon>

export const ChevronDown: Story = {
  args: {
    name: 'ChevronDown',
  },
}
