import { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAtom, sessionAtom } from 'src/atoms'
import { BasicTemplate } from 'src/components'
import { FiLoader } from 'react-icons/fi'

const HashtagsPage: NextPage = () => {
  const router = useRouter()
  const { postId } = router.query
  const [session, _] = useAtom(sessionAtom)

  useEffect(() => {
    let timer = setTimeout(() => {
      handleGenerateTags()
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, postId])

  async function handleGenerateTags() {
    if (session && session.token) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/hashtags`,
          {
            method: 'POST',
            body: JSON.stringify({
              postId,
            }),
            headers: {
              Authorization: 'Bearer ' + session.token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )

        const json = await res.json()

        if (!json.hashtags) {
          console.warn('error', 'hashtags not found')
          return router.push('/error')
        }

        return router.push(`/${session.user.username}/${postId}`)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  return (
    <BasicTemplate>
      <h1
        className="text-3xl md:text-5xl font-bold leading-tighter tracking-tighter"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Generating Hashtags...
        </span>
      </h1>

      <FiLoader
        className="h-8 w-8 text-white animate-spin mt-12"
        aria-hidden="true"
      />
    </BasicTemplate>
  )
}

export default HashtagsPage
