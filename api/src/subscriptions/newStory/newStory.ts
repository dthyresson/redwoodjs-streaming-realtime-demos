import gql from 'graphql-tag'
import type { Story, StoryInput } from 'types/graphql'

import type { PubSub } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'
import { buildStoryId } from 'src/lib/stories'

export const schema = gql`
  type Subscription {
    newStory(input: StoryInput!): Story! @skipAuth
  }
`
export type NewStoryChannel = {
  newStory: [id: string, payload: Story]
}

export type NewStoryChannelType = PubSub<NewStoryChannel>

const newStory = {
  newStory: {
    subscribe: (
      _,
      { input }: { input: StoryInput },
      { pubSub }: { pubSub: NewStoryChannelType }
    ) => {
      logger.debug({ input }, 'newStory subscription')

      const id = buildStoryId(input)

      return pubSub.subscribe('newStory', id)
    },
    resolve: (payload) => {
      logger.debug({ payload }, 'newStory subscription resolve')

      return payload
    },
  },
}

export default newStory
