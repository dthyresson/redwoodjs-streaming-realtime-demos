import { MetaTags } from '@redwoodjs/web'
import { useMutation, useQuery } from '@redwoodjs/web'

import Drawer from 'src/components/Drawer/Drawer'
import GitHubCorner from 'src/components/GitHubCorner/GitHubCorner'
import { HistoryContext } from 'src/layouts/DemoLayout/DemoLayout'

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

const MarkdownFormatter = ({ content }) => {
  const lines = content.split('\n')
  const formattedLines = []

  lines.forEach((line, index) => {
    if (line.startsWith('#')) {
      // Handle headings
      const level = line.match(/^(#+)\s/)
      if (level) {
        const headingLevel = Math.min(level[1].length, 3)
        let headingSize = 'sm'
        switch (headingLevel) {
          case 1:
            headingSize = '2xl'
            break
          case 2:
            headingSize = 'xl'
            break
          case 3:
            headingSize = 'lg'
            break
          default:
            headingSize = 'sm'
        }
        const text = line.replace(/^#+\s/, '')
        formattedLines.push(
          React.createElement(
            `h${headingLevel}`,
            { key: index, className: `text-${headingSize} my-2` },
            text
          )
        )
      }
    } else if (line.startsWith('* ')) {
      // Handle bold
      const text = line.replace(/^\* /, '')
      formattedLines.push(React.createElement('strong', { key: index }, text))
    } else {
      // Regular text
      formattedLines.push(React.createElement('p', { key: index }, line))
    }
  })

  return <div>{formattedLines}</div>
}

const MovieMashupPage = () => {
  const { data: movieData } = useQuery(GET_MOVIES_QUERY)

  const { data: movieMashupData } = useQuery(MOVIE_MASHUP_QUERY, {
    variables: {
      input: {
        firstMovieId: '9340-the-goonies',
        secondMovieId: '146-wo-hu-cang-long',
      },
    },
  })

  const [create] = useMutation(MASHUP_MOVIE_MUTATION)

  const onMashup = (_data) => {
    create({
      variables: {
        input: {
          firstMovieId: '9340-the-goonies',
          secondMovieId: '146-wo-hu-cang-long',
        },
      },
    })
  }

  return (
    <div className="h-screen w-screen bg-[#06b6d4]">
      <MetaTags
        title="Movie Mashup"
        description="Mashup two movies and make a new one"
      />

      <Drawer theme="vividYellow">
        <pre>
          <HistoryContext.Consumer>
            {(value) => (
              <p key={`countdown-history-${value}`}>
                {JSON.stringify(value, null, 2)}
              </p>
            )}
          </HistoryContext.Consumer>
        </pre>
      </Drawer>
      <a href="http://github.com" className="absolute right-0 top-0 z-grid">
        <GitHubCorner />
      </a>

      <div className="grid grid-cols-2 gap-4 p-24">
        <div className="grid grid-cols-4 justify-around gap-4">
          {movieData &&
            movieData.movies.map((movie) => (
              <div
                key={`movie1-pick-${movie.id}`}
                className="my-4 flex flex-col justify-items-center gap-2"
              >
                <img className="w-24" alt={movie.title} src={movie.photo} />
                <p>{movie.title}</p>
              </div>
            ))}
        </div>

        <div className="h-full rounded-md bg-sky-200 p-2">
          {movieMashupData && (
            <div key={`movie-mashup-${movieMashupData.movieMashup.id}`}>
              <h2>{movieMashupData.movieMashup.mashup.title}</h2>
              <MarkdownFormatter
                content={movieMashupData.movieMashup.mashup.body}
              />
            </div>
          )}
          {!movieMashupData ||
            (movieMashupData.movieMashup.mashup.body === '' && (
              <div className="flex h-full items-center  justify-center">
                <button
                  type="button"
                  className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  onClick={onMashup}
                >
                  Mashup
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MovieMashupPage
