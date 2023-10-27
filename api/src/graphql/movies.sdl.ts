export const schema = gql`
  type Movie {
    id: ID!
    title: String!
    photo: String!
  }

  type Mashup {
    body: String!
  }

  type MovieMashup {
    id: ID!
    firstMovie: Movie!
    secondMovie: Movie!
    mashup: Mashup!
  }

  input MovieMashupInput {
    firstMovieId: ID!
    secondMovieId: ID!
  }

  input StreamMovieMashupInput {
    firstMovieId: ID
    secondMovieId: ID
  }

  type Query {
    movies: [Movie!]! @skipAuth
    movie(id: ID!): Movie! @skipAuth
    movieMashup(input: MovieMashupInput!): MovieMashup! @skipAuth
    streamMovieMashup(input: StreamMovieMashupInput!): [String!]! @skipAuth
  }

  type Mutation {
    mashupMovies(input: MovieMashupInput!): MovieMashup! @skipAuth
  }
`
