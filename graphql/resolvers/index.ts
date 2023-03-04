import { login, profile, register } from './auth'
import { post } from './post'
import { follow, unfollow, isFollower } from './follow'
import { like, unlike, hasLike, getLikes } from './like'

export const resolvers = {
  Query: {
    profile,
    post,
    isFollower,
    hasLike,
    getLikes,
  },
  Mutation: {
    register,
    login,
    follow,
    unfollow,
    like,
    unlike,
  },
}
