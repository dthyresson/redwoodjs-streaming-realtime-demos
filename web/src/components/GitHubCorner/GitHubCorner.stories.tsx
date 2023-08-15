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

import GitHubCorner from './GitHubCorner'

const meta: Meta<typeof GitHubCorner> = {
  component: GitHubCorner,
}

export default meta

type Story = StoryObj<typeof GitHubCorner>

export const Primary: Story = {}
