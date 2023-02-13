import { atomWithStorage } from 'jotai/utils'

interface ISession {
  user: {
    email: string
    name: string
    username: string
    createdAt: Date
  }
  token: string
  signed: boolean
}

export const sessionAtom = atomWithStorage<ISession | null>('session', null)
