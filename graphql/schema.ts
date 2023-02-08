import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  scalar DateTime
  scalar UUID
  scalar NonEmptyString

  type User {
    id: UUID
    email: NonEmptyString
    name: NonEmptyString
    username: NonEmptyString
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
  }

  type Auth {
    user: User
    token: NonEmptyString
  }

  type Query {
    profile: User
  }

  type Mutation {
    login(email: NonEmptyString, password: NonEmptyString): Auth
    register(
      email: NonEmptyString
      password: NonEmptyString
      name: NonEmptyString
      username: NonEmptyString
    ): Auth
  }
`
