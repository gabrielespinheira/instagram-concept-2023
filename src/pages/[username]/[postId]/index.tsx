import { prisma } from 'prisma/db'
import { BasicTemplate, Card } from 'src/components'

const Post = ({ postData, userData }) => {
  const post = JSON.parse(postData) || {}
  const user = JSON.parse(userData) || {}

  return (
    <BasicTemplate>
      <div className="flex flex-wrap gap-4 w-full justify-center">
        <Card user={user} post={post} className="max-w-[720px]" />
      </div>
    </BasicTemplate>
  )
}

export async function getServerSideProps(context) {
  const { username, postId } = context.query

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      deletedAt: null,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      username,
      deletedAt: null,
    },
  })

  return {
    props: {
      postData: JSON.stringify(post),
      userData: JSON.stringify(user),
    },
  }
}

export default Post
