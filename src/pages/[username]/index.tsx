/* eslint-disable @next/next/no-img-element */
import { Post, User } from '@prisma/client'
import Link from 'next/link'

import {
  mutationFollow,
  queryIsFollower,
  mutationUnfollow,
} from 'graphql/sdk/follow'
import { prisma } from 'prisma/db'
import { useAtom, sessionAtom } from 'src/atoms'
import { BasicTemplate, Card } from 'src/components'
import { fetcher } from 'src/utils'
import { useEffect, useState } from 'react'
import { FiLoader } from 'react-icons/fi'

const Username = ({ userData, postsData }) => {
  const [session, _] = useAtom(sessionAtom)
  const [loading, setLoading] = useState<boolean>(true)
  const [follow, setFollow] = useState<boolean>(false)
  const user: User = JSON.parse(userData) || {}
  const posts: Post[] = JSON.parse(postsData) || []

  useEffect(() => {
    async function isFollower() {
      const resp = await fetcher(queryIsFollower, {
        followingId: user.id,
      })

      setLoading(false)
      setFollow(resp.isFollower)
    }

    if (loading) {
      isFollower()
    }
  }, [])

  async function handleFollow() {
    setLoading(true)

    const resp = await fetcher(mutationFollow, {
      followingId: user.id,
    })

    if (resp.follow) {
      setFollow(true)
    }

    setLoading(false)
  }

  async function handleUnfollow() {
    setLoading(true)

    const resp = await fetcher(mutationUnfollow, {
      followingId: user.id,
    })

    if (resp.unfollow) {
      setFollow(false)
    }

    setLoading(false)
  }

  if (!session?.user?.username) {
    return <></>
  }

  return (
    <BasicTemplate>
      <div className="bg-gray-100 text-gray-800 rounded-md flex flex-row justify-center items-center w-full gap-6 p-6 mb-12">
        <Link href={`/${user.username}`}>
          <img
            src={user.avatar || 'http://via.placeholder.com/100x100?text='}
            alt={user.name || ''}
            className="rounded-full w-36"
          />
        </Link>
        <div className="flex flex-col w-full">
          <Link href={`/${user.username}`}>
            <h1 className="text-3xl mb-1">{user.username}</h1>
          </Link>
          <h2 className="text-xl">{user.name}</h2>
        </div>

        {session.user.username !== user.username && (
          <div className="mr-4">
            {loading && (
              <button className="p-2 px-4 cursor-progress rounded-md leading-6 bg-green-500 hover:bg-green-400 transition-all text-gray-50">
                <FiLoader
                  className="h-5 w-5 text-white animate-spin"
                  aria-hidden="true"
                />
              </button>
            )}

            {!loading && !follow && (
              <button
                onClick={handleFollow}
                className="p-2 px-4 text-sm rounded-md bg-green-500 hover:bg-green-400 transition-all text-gray-50"
              >
                Follow
              </button>
            )}

            {!loading && follow && (
              <button
                onClick={handleUnfollow}
                className="p-2 px-4 text-sm rounded-md bg-green-500 hover:bg-green-400 transition-all text-gray-50"
              >
                Unfollow
              </button>
            )}
          </div>
        )}

        <div className="flex flex-row gap-8">
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl">12</span>
            <span className="text-sm">Posts</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl">16</span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl">25</span>
            <span className="text-sm">Following</span>
          </div>
        </div>
      </div>

      <div className="w-full columns-1 md:columns-2 lg:columns-3">
        {posts.map((post) => {
          return <Card post={post} user={user} key={post.id} className="mb-4" />
        })}
      </div>
    </BasicTemplate>
  )
}

export async function getServerSideProps(context) {
  const { username } = context.query

  const user = await prisma.user.findFirst({
    where: {
      username,
      deletedAt: null,
    },
  })

  if (!user) {
    return false
  }

  const userPosts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  })

  return {
    props: {
      userData: JSON.stringify(user),
      postsData: JSON.stringify(userPosts),
    },
  }
}

// TODO: server side props - get user

export default Username
