/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'
import { useMutation, useQuery } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import MovieCard from 'src/components/MovieCard/MovieCard'
import { HistoryContext } from 'src/layouts/DemoLayout/DemoLayout'
import MarkdownFormatter from 'src/utils/MarkdownFormatter'

const GET_MOVIES_QUERY = gql`
  query GetMovies {
    movies {
      id
      title
      photo
    }
  }
`

const MOVIE_MASHUP_QUERY = gql`
  query MovieMashup($input: MovieMashupInput!) @live {
    movieMashup(input: $input) {
      id
      firstMovie {
        id
        title
        photo
      }
      secondMovie {
        id
        title
        photo
      }
      mashup {
        body
      }
    }
  }
`

const MASHUP_MOVIE_MUTATION = gql`
  mutation MashupMovies($input: MovieMashupInput!) {
    mashupMovies(input: $input) {
      id
    }
  }
`

const MovieMashupPage = () => {
  const [loading, setLoading] = useState(false)
  const [firstMovieId, setFirstMovieId] = useState(null)
  const [secondMovieId, setSecondMovieId] = useState(null)
  const history = React.useContext(HistoryContext)

  const handleMovieClick = (movieId) => {
    if (firstMovieId === movieId) {
      setFirstMovieId(null) // Deselect if already selected
    } else if (secondMovieId === movieId) {
      setSecondMovieId(null) // Deselect if already selected
    } else if (firstMovieId === null) {
      setFirstMovieId(movieId) // Select as first movie
    } else if (secondMovieId === null) {
      setSecondMovieId(movieId) // Select as second movie
    }
  }

  const { data: movieData } = useQuery(GET_MOVIES_QUERY)

  const { data: movieMashupData } = useQuery(MOVIE_MASHUP_QUERY, {
    variables: {
      input: {
        firstMovieId,
        secondMovieId,
      },
    },
    onCompleted: (data) => {
      setLoading(false)

      history.unshift(data.movieMashup)
    },
  })

  const [create] = useMutation(MASHUP_MOVIE_MUTATION)

  const onMashup = (_data) => {
    setLoading(true)
    create({
      variables: {
        input: {
          firstMovieId,
          secondMovieId,
        },
      },
    })
  }

  return (
    <div className="h-full w-screen bg-[#06b6d4]">
      <MetaTags
        title="Movie Mashup"
        description="Mashup two movies and make a new one"
      />

      <Drawer theme="vividYellow">
        <pre>
          <HistoryContext.Consumer>
            {(value) => (
              <p
                key={`movie-mashup-history-${value}`}
                className="w-[400px] max-w-[400px] overflow-scroll"
              >
                {JSON.stringify(value, null, 2)}
              </p>
            )}
          </HistoryContext.Consumer>
        </pre>
      </Drawer>
      <a
        href="https://github.com/redwoodjs/redwoodjs-streaming-realtime-demos#movie-mashup-live-query-with-openai-streaming"
        target="_blank"
        rel="noreferrer"
        className="absolute right-0 top-0 z-grid"
      >
        <GitHubCorner />
      </a>

      <div className="mb-24 grid grid-cols-2 gap-4 p-12">
        <div className="grid max-h-screen grid-cols-4 justify-around gap-4 overflow-scroll">
          {movieData &&
            movieData.movies.map((movie) => (
              <div
                key={`movie1-pick-${movie.id}`}
                className={`flex h-full w-full cursor-pointer flex-col items-center justify-between gap-2 p-4 ${
                  firstMovieId === movie.id
                    ? 'rounded-md border-2 border-amber-500 bg-amber-400'
                    : secondMovieId === movie.id
                    ? 'rounded-md border-2 border-purple-500 bg-purple-400'
                    : `rounded-md border-2 border-blue-100 bg-blue-200 ${
                        firstMovieId
                          ? 'hover:bg-purple-300'
                          : secondMovieId
                          ? 'hover:bg-amber-300'
                          : 'hover:bg-blue-300'
                      }`
                }`}
                onClick={() => handleMovieClick(movie.id)}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>

        <div className="h-full rounded-md bg-sky-200 p-2">
          {movieMashupData && movieMashupData.movieMashup && (
            <div className="grid grid-cols-2 gap-8">
              <div
                className={`flex h-full w-full cursor-pointer flex-col items-center justify-between gap-2 p-4 ${
                  firstMovieId === movieMashupData.movieMashup.firstMovie.id
                    ? 'rounded-md border-2 border-amber-500 bg-amber-400'
                    : secondMovieId ===
                      movieMashupData.movieMashup.firstMovie.id
                    ? 'rounded-md border-2 border-purple-500 bg-purple-400'
                    : `rounded-md border-2 border-blue-100 bg-blue-200 ${
                        firstMovieId
                          ? 'hover:bg-purple-300'
                          : secondMovieId
                          ? 'hover:bg-amber-300'
                          : 'hover:bg-blue-300'
                      }`
                }`}
              >
                <MovieCard movie={movieMashupData.movieMashup.firstMovie} />
              </div>
              <div
                className={`flex h-full w-full cursor-pointer flex-col items-center justify-between gap-2 p-4 ${
                  firstMovieId === movieMashupData.movieMashup.secondMovie.id
                    ? 'rounded-md border-2 border-amber-500 bg-amber-400'
                    : secondMovieId ===
                      movieMashupData.movieMashup.secondMovie.id
                    ? 'rounded-md border-2 border-purple-500 bg-purple-400'
                    : `rounded-md border-2 border-blue-100 bg-blue-200 ${
                        firstMovieId
                          ? 'hover:bg-purple-300'
                          : secondMovieId
                          ? 'hover:bg-amber-300'
                          : 'hover:bg-blue-300'
                      }`
                }`}
              >
                <MovieCard movie={movieMashupData.movieMashup.secondMovie} />
              </div>
            </div>
          )}
          {!movieMashupData ||
            (movieMashupData.movieMashup.mashup.body === '' && (
              <div className="my-8 flex items-center justify-center">
                {!loading && (
                  <button
                    type="button"
                    className="rounded-md bg-sky-600 px-3.5 py-2.5 text-2xl font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:bg-white"
                    onClick={onMashup}
                    disabled={!firstMovieId || !secondMovieId}
                  >
                    Mashup!
                  </button>
                )}
                {loading && (
                  <div className="animate-bounce p-12 p-2 font-black text-green-600">
                    Mashing ...
                  </div>
                )}
              </div>
            ))}
          {!movieMashupData && (
            <div className="flex h-full items-center justify-center text-2xl font-extrabold">
              {!firstMovieId && !secondMovieId && <>Pick two movies!</>}
              {firstMovieId && !secondMovieId && <>Pick another movie!</>}
              {!firstMovieId && secondMovieId && <>Pick another movie!</>}
            </div>
          )}
          {movieMashupData && movieMashupData.movieMashup.mashup.body && (
            <div
              key={`movie-mashup-${movieMashupData.movieMashup.id}`}
              className="my-8 rounded-md bg-sky-100 p-4"
            >
              <h2>{movieMashupData.movieMashup.mashup.title}</h2>
              <MarkdownFormatter
                content={movieMashupData.movieMashup.mashup.body}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieMashupPage
