import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Basement</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-5xl font-bold">Next Basement</h1>
      </div>
    </>
  )
}

export default Home
