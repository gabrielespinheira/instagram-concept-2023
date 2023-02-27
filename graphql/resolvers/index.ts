import { login, profile, register } from './auth'
import { post } from './post'

export const resolvers = {
  Query: {
    profile,
    post,
  },
  Mutation: {
    register,
    login,
  },
}
