import type { NextPage } from 'next'
import Link from 'next/link'

import { Footer, Header } from 'src/components'

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-center items-center absolute top-0 left-0 bottom-0 right-0 min-h-screen bg-cover bg-center max-h-screen overflow-hidden z-[-1]">
        <div className="bg-blue-900/20 w-96 h-96 blur-3xl backdrop-blur rounded-xl"></div>
      </div>

      <Header />

      <div className="container flex-col justify-center items-center">
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
          With the power of <strong className="font-bold">AI</strong>, you can
          now upload your photos and get instant, <br />
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
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
