import type { Movie, MovieMashup, MovieMashupInput } from 'types/graphql'

import type { LiveQueryStorageMechanism } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'
import { MovieMashups } from 'src/lib/movieMashups'
import { Movies } from 'src/lib/movies'
import { openai } from 'src/lib/openai'

const movieMashups = new MovieMashups()
const movieData = new Movies()

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

export const PROMPT = `
Propose a short new movie treatment in the style of a movie trailer advertisement voice over
by mashing up the plots, characters, their names, and themes of two existing movies.

Give the new movie a title and tagline that could be used on a movie poster.

The treatment should be no longer than 3 sentences.
`

const MARKDOWN = `
Return the title, tagline, and treatment of the new movie as text with labels:
Title, Tagline, and Treatment and format as markdown where the title is a heading, tagline is a subheading and treatment uses bold for emphasis on some exciting words.
`

export const mashupMovies = async (
  { input }: { input: MovieMashupInput },
  { context }: { context: { liveQueryStore: LiveQueryStorageMechanism } }
): Promise<MovieMashup> => {
  try {
    const { id, firstMovie, secondMovie } = getMovies(input)

    if (!firstMovie || !secondMovie) {
      throw new Error('Missing movie')
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        {
          role: 'system',
          content: PROMPT + MARKDOWN,
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

    logger.debug('OpenAI stream received started ...')

    for await (const part of stream) {
      const { content } = part.choices[0].delta
      logger.debug({ content }, 'OpenAI stream received ...')
      body += content ?? ''
      movieMashups.get(id).mashup.body = body
      logger.debug(
        { id, mashup: movieMashups.get(id) },
        'Invalidating movie mashup key'
      )
      logger.debug('OpenAI stream received ended.')

      context.liveQueryStore.invalidate(`MovieMashup:${id}`)
    }

    return {
      id,
      firstMovie,
      secondMovie,
      mashup: { body },
    }
  } catch (error) {
    logger.error({ error }, 'Failed to mashup movies')
    throw new SyntaxError(`Failed to mashup movies: ${error.message}`)
  }
}

export const movieMashup = async ({
  input,
}: {
  input: MovieMashupInput
}): Promise<MovieMashup> => {
  const { id, firstMovie, secondMovie } = getMovies(input)

  if (!firstMovie || !secondMovie) {
    throw new Error('Missing movie')
  }

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
