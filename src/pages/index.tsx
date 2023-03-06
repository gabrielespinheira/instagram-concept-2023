import type { NextPage } from 'next'
import Link from 'next/link'

import { BasicTemplate } from 'src/components'

const HomePage: NextPage = () => {
  return (
    <BasicTemplate>
      <h1
        className="text-5xl md:text-7xl font-bold leading-tighter tracking-tighter mt-14"
        data-aos="zoom-y-out"
      >
        Share your{' '}
        <span className="bg-clip-text text-transparent gradient pl-2 pr-2">
          Memories
        </span>
      </h1>

      <span className="text-gray-100/75 mt-6 text-xl font-light text-center leading-8">
        Introducing the all-new Instagram{' '}
        <strong className="font-bold">concept</strong> app, where creativity
        knows no bounds. <br />
        With the power of <strong className="font-bold">AI</strong>, you can now
        upload your photos and get instant, <br />
        accurate tags that bring your memories to{' '}
        <strong className="font-bold">life</strong>.
      </span>

      <div className="flex flex-row items-center mt-12 gap-8">
        <Link
          className="btn text-gray-900 bg-gray-100 hover:bg-gray-300 w-full sm:w-auto"
          href="/register"
        >
          Sign up
        </Link>

        <Link
          className="btn w-full sm:w-auto bg-indigo-600 hover:bg-indigo-800"
          href="/login"
        >
          Login
        </Link>
      </div>
    </BasicTemplate>
  )
}

export default HomePage
