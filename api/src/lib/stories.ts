import type { Animal, Color, Activity } from 'types/graphql'

import { ANIMALS, COLORS, ACTIVITIES } from './data'

export class Animals {
  private animals: Animal[] = ANIMALS

  get(id: string): Animal | undefined {
    return this.animals.find((animal) => animal.id === id)
  }

  all(): Animal[] {
    return this.animals
  }
}

export class Colors {
  private colors: Color[] = COLORS

  get(id: string): Color | undefined {
    return this.colors.find((color) => color.id === id)
  }

  all(): Color[] {
    return this.colors
  }
}

export class Activities {
  private activities: Activity[] = ACTIVITIES

  get(id: string): Activity | undefined {
    return this.activities.find((activity) => activity.id === id)
  }

  all(): Activity[] {
    return this.activities
  }
}
