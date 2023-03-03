import { gql } from 'graphql-request'

export const mutationLike = gql`
  mutation Like($postId: UUID) {
    like(postId: $postId) {
      id
      postId
      userID
      createdAt
    }
  }
`

export const mutationUnlike = gql`
  mutation Unlike($postId: UUID) {
    unlike(postId: $postId)
  }
`

export const queryHasLike = gql`
  query HasLike($postId: UUID) {
    hasLike(postId: $postId)
  }
`
