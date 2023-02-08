import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'

import { prisma } from 'prisma/db'

interface Payload {
  sub: string
  email: string
  iat: number
  exp: number
}

export interface Context {
  prisma: PrismaClient
  request: any
  token: string | false
  signed: boolean
  payload: Payload | false
}

export async function createContext(request, _response): Promise<Context> {
  try {
    const { authorization } = request.req.headers
    let [, token] = authorization?.trim().split(' ')
    if (!token) token = null

    const isValid: any = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.GUARD_SIGNATURE)
    )

    if (!isValid || typeof isValid.payload === 'undefined') {
      throw new Error('Token not valid')
    }

    const signed = token && isValid ? true : false

    return {
      prisma,
      token,
      signed,
      payload: isValid.payload,
      ...request,
    }
  } catch (error) {
    return {
      prisma,
      token: false,
      signed: false,
      payload: false,
      ...request,
    }
  }
}
