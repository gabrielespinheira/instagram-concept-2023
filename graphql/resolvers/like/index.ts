import { Context } from 'graphql/context'

async function like(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { postId } = args
  const userId = context.payload.sub

  if (!postId) {
    throw new Error('Post not found')
  }

  const hasLike = await context.prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  })

  if (hasLike) {
    return hasLike
  }

  const like = await context.prisma.like.create({
    data: {
      postId,
      userId,
    },
  })

  return like
}

async function unlike(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { postId } = args
  const userId = context.payload.sub

  if (!postId) {
    throw new Error('Post not found')
  }

  const hasLike = await context.prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  })

  if (!hasLike) {
    return false
  }

  await context.prisma.like.delete({
    where: {
      id: hasLike.id,
    },
  })

  return true
}

async function hasLike(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { postId } = args
  const userId = context.payload.sub

  if (!postId) {
    throw new Error('Post not found')
  }

  const hasLike = await context.prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  })

  if (hasLike) {
    return true
  }

  return false
}

export { like, unlike, hasLike }
