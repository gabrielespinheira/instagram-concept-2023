import type { NextPage } from 'next'

import { useAtom, sessionAtom } from 'src/atoms'
import { BasicTemplate } from 'src/components'

const FeedPage: NextPage = () => {
  const [session, setSession] = useAtom(sessionAtom)

  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-7xl font-bold leading-tighter tracking-tighter mt-14"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Feed
        </span>
      </h1>
    </BasicTemplate>
  )
}

export default FeedPage
