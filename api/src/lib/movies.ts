import type { Movie } from 'types/graphql'

import { MOVIES } from './data/movies'

export class Movies {
  private movies: Movie[] = MOVIES

  get(id: string): Movie | undefined {
    return this.movies.find((movie) => movie.id === id)
  }

  random(): Movie {
    return this.movies[Math.floor(Math.random() * this.movies.length)]
  }

  all(): Movie[] {
    return this.movies.sort((a, b) => a.title.localeCompare(b.title))
  }
}
