/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Post, User } from '@prisma/client'
import { FiHeart, FiMessageCircle, FiShare } from 'react-icons/fi'
import { gql } from 'graphql-request'

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
        <FiHeart size={24} />
        <FiMessageCircle size={24} />
        <FiShare size={24} />

        <div className="flex-1"></div>

        <div className="flex flex-row">
          <img
            src={`http://via.placeholder.com/300x300`}
            alt={post.text}
            width="32px"
            height="32px"
            className="rounded-full border-2 border-white"
          />
          <img
            src={`http://via.placeholder.com/300x300`}
            alt={post.text}
            width="32px"
            height="32px"
            className="rounded-full ml-[-8px] border-2 border-white"
          />
          <img
            src={`http://via.placeholder.com/300x300`}
            alt={post.text}
            width="32px"
            height="32px"
            className="rounded-full ml-[-8px] border-2 border-white"
          />
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
