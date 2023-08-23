import OpenAI from 'openai'
import type { StoryInput, Story } from 'types/graphql'

import { logger } from 'src/lib/logger'
import { Animals, Colors, Activities } from 'src/lib/stories'
import type { NewStoryChannelType } from 'src/subscriptions/newStory/newStory'

const animals = new Animals()
const colors = new Colors()
const activities = new Activities()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const PROMPT = `Write a short children's bedtime story about an Animal that is a given Color and that does a given Activity.

Give the animal a cute name. The story should teach a lesson and have a happy ending.

The story should be no longer than 3 paragraphs.`

export const tellStory = async (
  { input }: { input: StoryInput },
  { context }: { context: { pubSub: NewStoryChannelType } }
): Promise<Story> => {
  const animal = animals.get(input.animalId)
  const color = colors.get(input.colorId)
  const activity = activities.get(input.activityId)

  const id = [animal.id, color.id, activity.id].join('|')

  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: PROMPT,
      },
      {
        role: 'user',
        content: `Animal: ${animal.name}\nColor: ${color.name}\nActivity: ${activity.name}}`,
      },
    ],
    temperature: 1,
    max_tokens: 256,
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
    title: `The ${color.name} ${animal.name} who ${activity.name}`,
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
