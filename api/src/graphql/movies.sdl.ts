export const schema = gql`
  type Movie {
    id: ID!
    title: String!
    photo: String!
  }

  type Mashup {
    title: String!
    tagline: String!
    treatment: String!
  }

  type MashupStream {
    chunk: String!
  }

  type MovieMashup {
    id: ID!
    firstMovie: Movie!
    secondMovie: Movie!
    mashup: Mashup!
  }

  type MovieMashupStream {
    id: ID!
    firstMovie: Movie!
    secondMovie: Movie!
    mashup: MashupStream!
  }

  input MovieMashupInput {
    firstMovieId: ID!
    secondMovieId: ID!
  }

  type Query {
    movies: [Movie!]! @skipAuth
    movie(id: ID!): Movie! @skipAuth
    movieMashup(input: MovieMashupInput!): MovieMashup! @skipAuth
    movieMashupStream(input: MovieMashupInput!): MovieMashupStream! @skipAuth
    mashup(input: MovieMashupInput!): MovieMashupStream! @skipAuth
  }

  type Mutation {
    movieMashupStream(input: MovieMashupInput!): MovieMashupStream! @skipAuth
  }
`
