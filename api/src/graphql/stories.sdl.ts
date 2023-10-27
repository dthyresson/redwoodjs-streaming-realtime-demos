export const schema = gql`
  type Adjective {
    id: ID!
    name: String!
  }
  type Animal {
    id: ID!
    name: String!
  }

  type Color {
    id: ID!
    name: String!
  }

  type Activity {
    id: ID!
    name: String!
  }

  type Story {
    id: ID!
    title: String!
    body: String!
    animal: Animal!
    color: Color!
    activity: Activity!
    adjective: Adjective!
  }

  input StoryInput {
    animalId: ID
    colorId: ID
    activityId: ID
    adjectiveId: ID
  }

  type Mutation {
    tellStory(input: StoryInput!): Story! @skipAuth
  }

  type Query {
    animals: [Animal!]! @skipAuth
    colors: [Color!]! @skipAuth
    activities: [Activity!]! @skipAuth
    adjectives: [Adjective!]! @skipAuth
    streamStory(input: StoryInput!): [String!]! @skipAuth
  }
`
