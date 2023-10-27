import type {
  Animal,
  Color,
  Activity,
  Adjective,
  StoryInput,
  Story,
} from 'types/graphql'

import { SyntaxError } from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'
import { openai } from 'src/lib/openai'
import { Animals, Colors, Activities, Adjectives } from 'src/lib/stories'
import { buildStoryId } from 'src/lib/stories'
import type { NewStoryChannelType } from 'src/subscriptions/newStory/newStory'

const animalsManager = new Animals()
const colorsManager = new Colors()
const activitiesManager = new Activities()
const adjectivesManager = new Adjectives()

export const PROMPT = `Write a short children's bedtime story about an Animal that is a given Color and that does a given Activity.

Give the animal a cute descriptive and memorable name.

The story should teach a lesson.

The story should be told in a quality, style and feeling of the given Adjective.

The story should be no longer than 3 paragraphs.
`

const MARKDOWN = `
Format the story using Markdown.`

export const tellStory = async (
  { input }: { input: StoryInput },
  { context }: { context: { pubSub: NewStoryChannelType } }
): Promise<Story> => {
  try {
    const id = buildStoryId(input)

    const animal = animalsManager.get(input.animalId)
    const color = colorsManager.get(input.colorId)
    const activity = activitiesManager.get(input.activityId)
    const adjective = adjectivesManager.get(input.adjectiveId)

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        {
          role: 'system',
          content: PROMPT + MARKDOWN,
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
      id,
      animal,
      color,
      activity,
      adjective,
      title: `${adjective.name}, ${color.name} ${animal.name} who ${activity.name}`,
      body,
    }

    logger.debug('OpenAI stream received started ...')
    for await (const part of stream) {
      const { content } = part.choices[0].delta
      logger.debug({ content }, 'OpenAI stream received ...')
      body += content ?? ''
      story.body = body
      logger.debug({ id }, 'Publishing newStory topic')

      context.pubSub.publish('newStory', id, story)
    }
    logger.debug('OpenAI stream received ended.')

    return story
  } catch (error) {
    logger.error({ error }, 'Failed to tell story')
    throw new SyntaxError(
      "Sorry, I'm having trouble telling a story right now. PLease try again soon."
    )
  }
}

export const animals = (): Animal[] => animalsManager.all()
export const colors = (): Color[] => colorsManager.all()
export const activities = (): Activity[] => activitiesManager.all()
export const adjectives = (): Adjective[] => adjectivesManager.all()
