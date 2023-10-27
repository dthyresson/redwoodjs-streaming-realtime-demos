import type { MovieMashupInput } from 'types/graphql'

import { Repeater } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'
import { Movies } from 'src/lib/movies'
import { openai } from 'src/lib/openai'
import { PROMPT } from 'src/services/movies/movies'

const movieData = new Movies()

/**
 * Usage in GraphiQL:
 * query StreamMovieMashupExample {
 *   streamMovieMashup(input: {firstMovieId: "11522-pretty-in-pink",
 *                            secondMovieId: "14370-real-genius"}) @stream
 * }
 */

/** Usage in curl:
 *
 * curl -X POST -H "Content-Type: application/json" -d "{\"query\":\"query StreamMovieMashupExample { streamMovieMashup(input: { firstMovieId: \\\"11522-pretty-in-pink\\\", secondMovieId: \\\"14370-real-genius\\\" }) @stream }\"}" http://localhost:8911/graphql
 */

export const streamMovieMashup = async ({
  input,
}: {
  input: MovieMashupInput
}) => {
  const firstMovie = input.firstMovieId
    ? movieData.get(input.firstMovieId)
    : movieData.random()

  const secondMovie = input.secondMovieId
    ? movieData.get(input.secondMovieId)
    : movieData.random()

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
            content: `Movie 1: ${firstMovie.title}\nMovie 2: ${secondMovie.title}`,
          },
        ],
        temperature: 1,
        max_tokens: 256,
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
