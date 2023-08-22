export const schema = gql`
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
  }

  input StoryInput {
    animalId: ID!
    colorId: ID!
    activityId: ID!
  }

  type Mutation {
    tellStory(input: StoryInput!): Story! @skipAuth
  }
`
