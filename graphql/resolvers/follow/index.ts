import { Context } from 'graphql/context'

async function follow(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { followingId } = args
  const followerId = context.payload.sub

  if (!followingId) {
    throw new Error('User Id not found')
  }

  const isFollowing = await context.prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  })

  if (isFollowing) {
    return isFollowing
  }

  const follow = await context.prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  })

  return follow
}

async function unfollow(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { followingId } = args
  const followerId = context.payload.sub

  if (!followingId) {
    throw new Error('User Id not found')
  }

  const isFollowing = await context.prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  })

  if (!isFollowing) {
    return false
  }

  await context.prisma.follow.delete({
    where: {
      id: isFollowing.id,
    },
  })

  return true
}

async function isFollower(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { followingId } = args
  const followerId = context.payload.sub

  if (!followingId) {
    throw new Error('User Id not found')
  }

  const isFollowing = await context.prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  })

  if (isFollowing) {
    return true
  }

  return false
}

export { follow, unfollow, isFollower }
