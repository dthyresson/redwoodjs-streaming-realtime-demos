import type { StoryInput, Story } from 'types/graphql'

import { logger } from 'src/lib/logger'
import { openai } from 'src/lib/openai'
import { Animals, Colors, Activities, Adjectives } from 'src/lib/stories'
import { buildStoryId } from 'src/lib/stories'
import type { NewStoryChannelType } from 'src/subscriptions/newStory/newStory'

const animals = new Animals()
const colors = new Colors()
const activities = new Activities()
const adjectives = new Adjectives()

const PROMPT = `Write a short children's bedtime story about an Animal that is a given Color and that does a given Activity.

Give the animal a cute name.

The story should teach a lesson.

The story should be told in a quality, style and feeling of the given Adjective.

The story should be no longer than 3 paragraphs.`

export const tellStory = async (
  { input }: { input: StoryInput },
  { context }: { context: { pubSub: NewStoryChannelType } }
): Promise<Story> => {
  const id = buildStoryId(input)

  const animal = animals.get(input.animalId)
  const color = colors.get(input.colorId)
  const activity = activities.get(input.activityId)
  const adjective = adjectives.get(input.adjectiveId)

  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: PROMPT,
      },
      {
        role: 'user',
        content: `Animal: ${animal.name}\nColor: ${color.name}\nActivity: ${activity.name}}\nAdjective: ${adjective.name}`,
      },
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  })

  let body = ''

  const story = {
    id: '1',
    animal,
    color,
    activity,
    adjective,
    title: `A ${adjective.name} story about a ${color.name} ${animal.name} who ${activity.name}`,
    body,
  }

  for await (const part of stream) {
    const { content } = part.choices[0].delta
    logger.debug({ content }, 'OpenAI stream part')
    body += content ?? ''
    story.body = body
    logger.debug({ body }, 'Stream body')
    logger.debug({ story }, 'New story published')
    context.pubSub.publish('newStory', id, story)
  }

  return story
}
