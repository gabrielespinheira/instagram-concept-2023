import { login, profile, register } from './auth'
import { post } from './post'
import { follow, unfollow, isFollower } from './follow'
import { like, unlike, hasLike } from './like'

export const resolvers = {
  Query: {
    profile,
    post,
  },
  Mutation: {
    register,
    login,
    follow,
    unfollow,
    isFollower,
    like,
    unlike,
    hasLike,
  },
}
