import type {
  Adjective,
  Animal,
  Color,
  Activity,
  StoryInput,
} from 'types/graphql'

import { ADJECTIVES, ANIMALS, COLORS, ACTIVITIES } from './data/stories'

export const buildStoryId = (input: StoryInput) => {
  return [
    'animal',
    input.animalId,
    'color',
    input.colorId,
    'activity',
    input.activityId,
    'adjective',
    input.adjectiveId,
  ].join('|')
}
export class Animals {
  private animals: Animal[] = ANIMALS

  get(id: string): Animal | undefined {
    return this.animals.find((animal) => animal.id === id)
  }

  random(): Animal {
    return this.animals[Math.floor(Math.random() * this.animals.length)]
  }

  all(): Animal[] {
    return this.animals.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export class Colors {
  private colors: Color[] = COLORS

  get(id: string): Color | undefined {
    return this.colors.find((color) => color.id === id)
  }

  random(): Color {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  all(): Color[] {
    return this.colors.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export class Activities {
  private activities: Activity[] = ACTIVITIES

  get(id: string): Activity | undefined {
    return this.activities.find((activity) => activity.id === id)
  }

  random(): Activity {
    return this.activities[Math.floor(Math.random() * this.activities.length)]
  }

  all(): Activity[] {
    return this.activities.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export class Adjectives {
  private adjectives: Adjective[] = ADJECTIVES

  get(id: string): Adjective | undefined {
    return this.adjectives.find((adjective) => adjective.id === id)
  }

  random(): Adjective {
    return this.adjectives[Math.floor(Math.random() * this.adjectives.length)]
  }

  all(): Adjective[] {
    return this.adjectives.sort((a, b) => a.name.localeCompare(b.name))
  }
}
