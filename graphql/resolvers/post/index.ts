import { Context } from 'graphql/context'

async function post(_parent, args, context: Context) {
  const { id } = args

  console.log('🔥', id)

  if (!id) {
    throw new Error('Post not found')
  }

  const post = await context.prisma.post.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  })

  return post
}

export { post }
