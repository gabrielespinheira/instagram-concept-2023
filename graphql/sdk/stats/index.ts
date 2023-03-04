import { gql } from 'graphql-request'

export const queryStats = gql`
  query Stats($userId: UUID) {
    stats(userId: $userId) {
      posts
      followers
      following
    }
  }
`
