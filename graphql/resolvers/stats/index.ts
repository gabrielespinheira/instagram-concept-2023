import { Context } from 'graphql/context'

async function stats(_parent, args, context: Context) {
  if (!context.payload) {
    throw new Error('Unauthorized')
  }

  const { userId } = args

  if (!userId) {
    throw new Error('User not found')
  }

  const posts = await context.prisma.post.count({
    where: {
      userId,
    },
  })

  const followers = await context.prisma.follow.count({
    where: {
      followingId: userId,
    },
  })

  const following = await context.prisma.follow.count({
    where: {
      followerId: userId,
    },
  })

  return { posts, followers, following }
}

export { stats }
