import Link from 'next/link'
import { Post } from '@prisma/client'

import { BasicTemplate } from 'src/components'
import { prisma } from 'prisma/db'

const Tags = ({ tagsData }) => {
  const tags: string[] = JSON.parse(tagsData) || {}

  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-7xl font-bold leading-tighter tracking-tighter mb-14"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Tags
        </span>
      </h1>

      <h2 className="text-2xl mb-8">Explore some hashtags</h2>
      <div className="flex flex-row flex-wrap max-w-3xl gap-4 justify-center items-center">
        {tags.map((tag) => (
          <Link
            href={`/tags/${tag}`}
            key={tag}
            className="bg-gray-700 p-1 px-3 rounded-md text-sm"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </BasicTemplate>
  )
}

export async function getServerSideProps(context) {
  const posts = await prisma.post.findMany({
    skip: 0,
    take: 5,
    where: {
      deletedAt: null,
    },
  })

  if (!posts) {
    return []
  }

  const tags = posts
    .map((post: Post) => {
      return post.tags
    })
    .flat(1)

  return {
    props: {
      tagsData: JSON.stringify([...new Set(tags)]),
    },
  }
}

export default Tags
