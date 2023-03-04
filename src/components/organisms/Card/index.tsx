/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Like, Post, User } from '@prisma/client'
import { FiHeart, FiShare } from 'react-icons/fi'
import { gql } from 'graphql-request'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { fetcher } from 'src/utils'
import {
  queryHasLike,
  mutationLike,
  mutationUnlike,
  queryGetLikes,
} from 'graphql/sdk/like'

const queryPost = gql`
  query Post($postId: UUID) {
    post(id: $postId) {
      id
      url
      tags
      text
      updatedAt
      userId
      deletedAt
    }
  }
`

const Card = ({
  post,
  user,
  className = '',
}: {
  post: Post
  user: User
  className?: string
}) => {
  const tags: string[] = (post.tags as string[]) || []
  const [like, setLike] = useState(false)
  const [likes, setLikes] = useState([])

  useEffect(() => {
    async function hasLike() {
      const resp = await fetcher(queryHasLike, {
        postId: post.id,
      })

      setLike(resp.hasLike)
      handleLikeList()
    }

    hasLike()
  }, [])

  async function handleLikeList() {
    const likes = await fetcher(queryGetLikes, {
      postId: post.id,
    })

    setLikes(likes.getLikes)
  }

  async function handleLike() {
    await fetcher(mutationLike, {
      postId: post.id,
    })

    setLike(true)
    handleLikeList()
  }

  async function handleUnlike() {
    await fetcher(mutationUnlike, {
      postId: post.id,
    })

    setLike(false)
    handleLikeList()
  }

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard')
  }

  return (
    <div
      className={`flex flex-col justify-center items-center bg-gray-100 rounded-md text-gray-800 p-4 gap-3 w-full break-inside-avoid ${className}`}
    >
      <Link
        href={`/${user.username}`}
        className="flex gap-3 w-full items-center"
      >
        <img
          src={user.avatar || 'http://via.placeholder.com/32x32?text='}
          alt={user.name || ''}
          width="32px"
          height="32px"
          className="rounded-full"
        />
        <span className="font-semibold text-sm">{user.username}</span>
      </Link>

      <Link href={`/${user.username}/${post.id}`}>
        <img src={post.url} alt={post.text} className="rounded-md" />
      </Link>

      <div className="flex flex-row justify-start w-full gap-4 items-center">
        {like && (
          <a onClick={handleUnlike} className="cursor-pointer">
            <FiHeart
              size={24}
              className="text-red-500"
              fill="rgb(239 68 68 / var(--tw-text-opacity))"
            />
          </a>
        )}

        {!like && (
          <a onClick={handleLike} className="cursor-pointer">
            <FiHeart size={24} />
          </a>
        )}
        {/* <FiMessageCircle size={24} /> */}
        <a onClick={handleShare} className="cursor-pointer">
          <FiShare size={24} />
        </a>

        <div className="flex-1"></div>

        <div className="flex flex-row h-[32px]">
          {likes.map((like: any, index) => (
            <img
              key={like.id}
              src={
                like.user.avatar
                  ? like.user.avatar
                  : `http://via.placeholder.com/300x300`
              }
              alt={like.user.username}
              width="32px"
              height="32px"
              className={`rounded-full border-2 border-white ${
                index === 0 ? '' : 'ml-[-8px]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-md p-2 px-3">{post.text}</div>

      <div className="flex w-full rounded-md p-1 gap-2 flex-wrap">
        {tags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="leading-3 text-sm text-gray-600"
            >
              #{tag}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Card
