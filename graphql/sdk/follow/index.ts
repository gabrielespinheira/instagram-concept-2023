import { gql } from 'graphql-request'

export const mutationFollow = gql`
  mutation Follow($followingId: UUID) {
    follow(followingId: $followingId) {
      id
      followerID
      followingId
      createdAt
    }
  }
`

export const mutationUnfollow = gql`
  mutation Unfollow($followingId: UUID) {
    unfollow(followingId: $followingId)
  }
`

export const mutationIsFollower = gql`
  mutation IsFollower($followingId: UUID) {
    isFollower(followingId: $followingId)
  }
`
