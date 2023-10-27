import type {
  Animal,
  Color,
  Activity,
  Adjective,
  StoryInput,
} from 'types/graphql'

import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'
import { openai } from 'src/lib/openai'
import { Animals, Colors, Activities, Adjectives } from 'src/lib/stories'

import { PROMPT } from './stories'

const animalsManager = new Animals()
const colorsManager = new Colors()
const activitiesManager = new Activities()
const adjectivesManager = new Adjectives()

/**
 * Usage in GraphiQL:
 *
 * query StreamStoryExample {
 *  streamStory(input: {}) @stream
 * }
 *
 */

/** Usage in curl:
 *
 * curl -X POST -H "Content-Type: application/json" -d "{\"query\":\"query StreamStoryExample { streamStory(input: { }) @stream }\"}" http://localhost:8911/graphql
 */

export const streamStory = async ({ input }: { input: StoryInput }) => {
  const animal = animalsManager.get(input.animalId || '1')
  const color = colorsManager.get(input.colorId || '1')
  const activity = activitiesManager.get(input.activityId || '1')
  const adjective = adjectivesManager.get(input.adjectiveId || '1')

  return new Repeater<string>(async (push, stop) => {
    const publish = async () => {
      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
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
      logger.debug('OpenAI stream received started ...')

      for await (const part of stream) {
        const { content } = part.choices[0].delta

        if (content) {
          logger.debug({ content }, 'OpenAI stream received ...')
          // Make sure one does not push a null value
          // as this will cause an error in the return value
          push(content)
        }
      }

      logger.debug('OpenAI stream received ended.')
      stop()
    }

    publish()

    await stop.then(() => {
      logger.debug('stream done')
    })
  })
}

export const animals = (): Animal[] => animalsManager.all()
export const colors = (): Color[] => colorsManager.all()
export const activities = (): Activity[] => activitiesManager.all()
export const adjectives = (): Adjective[] => adjectivesManager.all()
