import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-5xl font-bold">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
      </div>
    </>
  )
}

export default Home
