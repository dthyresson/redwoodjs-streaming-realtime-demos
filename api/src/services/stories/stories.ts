import type { StoryInput, Story } from 'types/graphql'

import type { NewStoryChannelType } from 'src/subscriptions/newStory/newStory'

export const tellStory = (
  { input }: { input: StoryInput },
  { context }: { context: { pubSub: NewStoryChannelType } }
): Story => {
  const story = {
    id: '1',
    title: 'adfsada',
    body: 'adsas',
    animal: {
      id: input.animalId,
      name: 'Penguin',
    },
    color: {
      id: input.colorId,
      name: 'orange',
    },
    activity: {
      id: input.activityId,
      name: 'First Day of School',
    },
  }

  const id = [input.animalId, input.colorId, input.activityId].join('|')

  context.pubSub.publish('newStory', id, story)

  return story
}
