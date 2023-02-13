import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FiLoader, FiLock } from 'react-icons/fi'

import { Footer, Header } from 'src/components'
import { useAtom, sessionAtom } from 'src/atoms'
import { fetcher } from 'src/utils'
import { mutationAuthLogin } from 'graphql/sdk/auth'
import { LoginSchema, LoginType } from 'graphql/schemas'
import { validationResolver } from 'graphql/schemas/validationResolver'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [session, setSession] = useAtom(sessionAtom)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    resolver: validationResolver(LoginSchema),
  })

  useEffect(() => {
    if (session && session.signed) {
      router.push('/feed')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setLoading(true)

    try {
      const resp = await fetcher(mutationAuthLogin, data)

      setSession({
        user: resp.login.user,
        token: resp.login.token,
        signed: !!resp.login.user,
      })

      router.push('/feed')
      setLoading(false)
    } catch (error: any) {
      setLoading(false)

      setError('root', {
        type: 'server',
        message: 'It was not possible to register',
      })
      return
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <Header />

      <div className="container flex flex-col items-center justify-center h-full">
        <h2 className="text-gray-100 text-center text-6xl font-bold tracking-tight">
          Login
        </h2>
        <form
          className="flex flex-col gap-2 mt-12 w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input"
            type="email"
            placeholder="Email address"
            {...register('email')}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            {...register('password')}
          />

          <button
            type="submit"
            className={`btn group relative mt-4 flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium bg-indigo-600 hover:bg-indigo-800 ${
              loading && 'opacity-80 bg-indigo-500'
            }`}
            disabled={loading ?? 'disabled'}
          >
            {!loading && (
              <>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                Sign in
              </>
            )}

            {loading && (
              <>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLoader
                    className="h-5 w-5 text-white animate-spin"
                    aria-hidden="true"
                  />
                </span>
                Loading
              </>
            )}
          </button>
        </form>

        <div id="errors" className="flex justify-center">
          {errors[Object.keys(errors)[0]] && (
            <span className="flex justify-center items-center font-normal text-sm text-center px-4 bg-red-500 p-2 text-white rounded-md mt-6">
              {Object.keys(errors)[0]} -{' '}
              {errors[Object.keys(errors)[0]].message}
            </span>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LoginPage
