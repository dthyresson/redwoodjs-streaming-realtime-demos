import OpenAI from 'openai'
import type { Movie, MovieMashup, MovieMashupInput } from 'types/graphql'

import type { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'
import { MovieMashups } from 'src/lib/movieMashups'
import { Movies } from 'src/lib/movies'

const movieMashups = new MovieMashups()
const movieData = new Movies()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const movies = (): Movie[] => {
  return movieData.all()
}

export const movie = ({ id }): Movie => {
  return movieData.get(id)
}

const getMovies = (input: MovieMashupInput) => {
  const firstMovie = movieData.get(input.firstMovieId)
  const secondMovie = movieData.get(input.secondMovieId)

  const id = `${firstMovie.id}|${secondMovie.id}`
  return { id, firstMovie, secondMovie }
}

const PROMPT = `
Propose a short new movie treatment in the style of a movie trailer advertisement voice over
by mashing up the plots, characters, their names, and themes of two existing movies.

Give the new movie a title and tagline that could be used on a movie poster.

The treatment should be no longer than 3 sentences.

Return the title, tagline, and treatment of the new movie as text with labels:
Title, Tagline, and Treatment.
`

export const mashupMovies = async (
  { input }: { input: MovieMashupInput },
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
): Promise<MovieMashup> => {
  const { id, firstMovie, secondMovie } = getMovies(input)

  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
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

  const streamingMashup = movieMashups.get(id)

  let body = ''

  if (!streamingMashup) {
    movieMashups.set(id, {
      id,
      firstMovie,
      secondMovie,
      mashup: { body },
    })
  }

  for await (const part of stream) {
    const { content } = part.choices[0].delta
    logger.debug({ content }, 'OpenAI stream part')
    body += content ?? ''
    movieMashups.get(id).mashup.body = body
    logger.debug(
      { id, mashup: movieMashups.get(id) },
      'Invalidating movie mashup key'
    )

    context.liveQueryStore.invalidate(`MovieMashup:${id}`)
  }

  logger.debug({ body }, 'Mashup body')

  return {
    id,
    firstMovie,
    secondMovie,
    mashup: { body },
  }
}

export const movieMashup = async ({
  input,
}: {
  input: MovieMashupInput
}): Promise<MovieMashup> => {
  const { id, firstMovie, secondMovie } = getMovies(input)

  let streamingMashup = movieMashups.get(id)

  if (!streamingMashup) {
    movieMashups.set(id, {
      id,
      firstMovie,
      secondMovie,
      mashup: { body: '' },
    })
  }

  streamingMashup = movieMashups.get(id)

  logger.debug({ id, mashup: streamingMashup }, 'Listening to movie mashup key')

  return streamingMashup
}
