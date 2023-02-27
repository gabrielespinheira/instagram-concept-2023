import { prisma } from 'prisma/db'
import { BasicTemplate, Card } from 'src/components'

const FeedPage = ({ postsData }) => {
  const posts = JSON.parse(postsData) || {}

  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-7xl font-bold leading-tighter tracking-tighter mb-14"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Feed
        </span>
      </h1>

      <div className="w-full columns-1 md:columns-2 lg:columns-3">
        {posts.map((post) => {
          return (
            <Card post={post} user={post.user} key={post.id} className="mb-4" />
          )
        })}
      </div>
    </BasicTemplate>
  )
}

export async function getServerSideProps(context) {
  const posts = await prisma.post.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    props: {
      postsData: JSON.stringify(posts),
    },
  }
}

export default FeedPage
