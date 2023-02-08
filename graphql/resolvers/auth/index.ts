import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Context } from 'graphql/context'

async function login(_parent, args, context: Context) {
  const { email, password } = args

  if (!email || !password) {
    throw new Error('Credentials not found')
  }

  const user = await context.prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const hashedPassword = bcrypt.compareSync(password, user.password)

  if (!hashedPassword) {
    throw new Error('Credentials not valid')
  }

  const token = jwt.sign(
    { sub: user.id, email },
    process.env.GUARD_SIGNATURE as string,
    {
      algorithm: process.env.GUARD_ALGORITHM as any,
      expiresIn: process.env.GUARD_EXPIRESIN,
    }
  )

  return {
    user,
    token,
  }
}

async function register(_parent, args, context: Context) {
  const { email, password, name, username } = args

  const userExists = await context.prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userExists) {
    throw new Error('User already exists')
  }

  const hashedPassword = bcrypt.hashSync(password, 8)

  const user = await context.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      username,
    },
  })

  if (!user) {
    throw new Error('Could not possible to register user')
  }

  const token = jwt.sign(
    { sub: user.id, email },
    process.env.GUARD_SIGNATURE as string,
    {
      algorithm: process.env.GUARD_ALGORITHM as any,
      expiresIn: process.env.GUARD_EXPIRESIN,
    }
  )

  return {
    user,
    token,
  }
}

async function profile(_parent, _args, context: Context) {
  if (!context.payload) {
    throw new Error('Permission denied')
  }

  const user = await context.prisma.user.findFirst({
    where: {
      id: context.payload.sub,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

export { login, register, profile }
