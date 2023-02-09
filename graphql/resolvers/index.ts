import { login, profile, register } from './auth'

export const resolvers = {
  Query: {
    profile,
  },
  Mutation: {
    register,
    login,
  },
}
