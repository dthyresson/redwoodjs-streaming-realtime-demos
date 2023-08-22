import type { Movie } from 'types/graphql'

import { MOVIES } from './data'

export class Movies {
  private movies: Movie[] = MOVIES

  get(id: string): Movie | undefined {
    return this.movies.find((movie) => movie.id === id)
  }

  all(): Movie[] {
    return this.movies
  }
}
