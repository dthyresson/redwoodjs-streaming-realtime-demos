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

import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  component: Footer,
}

export default meta

type Story = StoryObj<typeof Footer>

export const Primary: Story = {}
