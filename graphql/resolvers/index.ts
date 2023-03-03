import { login, profile, register } from './auth'
import { post } from './post'
import { follow, unfollow, isFollower } from './follow'

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
  },
}
