import type { MovieMashup } from 'types/graphql'

export class MovieMashups {
  private mashups: { [key: string]: MovieMashup } = {}

  get(key: string): MovieMashup | undefined {
    return this.mashups[key]
  }

  set(key: string, value: MovieMashup): void {
    this.mashups[key] = value
  }

  delete(key: string): void {
    delete this.mashups[key]
  }

  all(): { [key: string]: MovieMashup } {
    return this.mashups
  }
}
