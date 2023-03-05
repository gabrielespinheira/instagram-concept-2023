import { useRouter } from 'next/router'

import { BasicTemplate, Card } from 'src/components'
import { prisma } from 'prisma/db'

const Tag = ({ postsData }) => {
  const {
    query: { tag },
  } = useRouter()
  const posts: string[] = JSON.parse(postsData) || {}

  console.log('🔥', posts)

  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-7xl font-bold leading-tighter tracking-tighter mb-14"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          #{tag}
        </span>
      </h1>

      <div className="w-full columns-1 md:columns-2 lg:columns-3">
        {posts.map((post: any) => {
          return (
            <Card post={post} user={post.user} key={post.id} className="mb-4" />
          )
        })}
      </div>
    </BasicTemplate>
  )
}

export async function getServerSideProps(context) {
  const { tag } = context.query

  const postsWithTag: [] = await prisma.$queryRaw`
    SELECT id
    FROM post
    WHERE JSON_SEARCH(tags, 'one', ${tag}) IS NOT NULL AND deletedAt IS NULL;
  `

  if (!postsWithTag) {
    return {
      props: {
        postsData: JSON.stringify([]),
      },
    }
  }

  const ids = postsWithTag.map((post: { id: string }) => {
    return post.id
  })

  const posts = await prisma.post.findMany({
    where: {
      id: { in: ids },
      deletedAt: null,
    },
    include: {
      user: true,
    },
  })

  return {
    props: {
      postsData: JSON.stringify(posts),
    },
  }
}

export default Tag
