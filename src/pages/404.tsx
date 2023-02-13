import type { NextPage } from 'next'
import Link from 'next/link'

import { BasicTemplate } from 'src/components'

const Error404: NextPage = () => {
  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-7xl font-bold leading-tighter tracking-tighter mt-14"
        data-aos="zoom-y-out"
      >
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Error 404
        </span>
      </h1>

      <span className="text-4xl font-semibold leading-tight mt-3">
        Page not found
      </span>

      <Link
        className="btn w-full sm:w-auto bg-indigo-600 hover:bg-indigo-800 mt-16"
        href="/"
      >
        Back to Home
      </Link>
    </BasicTemplate>
  )
}

export default Error404
