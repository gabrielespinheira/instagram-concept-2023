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

  type Post {
    id: UUID
    text: String
    url: String
    userId: UUID
    tags: [String]
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
  }

  type Follow {
    id: UUID
    followerID: UUID
    followingId: UUID
    createdAt: DateTime
  }

  type Like {
    id: UUID
    postId: UUID
    userID: UUID
    createdAt: DateTime
  }

  type Auth {
    user: User
    token: NonEmptyString
  }

  type Query {
    profile: User
    post(id: UUID): Post
    isFollower(followingId: UUID): Boolean
    hasLike(postId: UUID): Boolean
  }

  type Mutation {
    login(email: NonEmptyString, password: NonEmptyString): Auth
    register(
      email: NonEmptyString
      password: NonEmptyString
      name: NonEmptyString
      username: NonEmptyString
    ): Auth

    follow(followingId: UUID): Follow
    unfollow(followingId: UUID): Boolean

    like(postId: UUID): Like
    unlike(postId: UUID): Boolean
  }
`
