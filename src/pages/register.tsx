import { NextPage } from 'next'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiLock } from 'react-icons/fi'

import { Footer, Header } from 'src/components'

const registerSchema = z.object({
  email: z.string().email().min(5).max(190),
  name: z.string().min(3).max(190),
  username: z.string().min(3).max(190),
  password: z.string().min(8).max(50),
})

type IRegisterForm = z.infer<typeof registerSchema>

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    console.log('🔥 data', data)
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <Header />

      <div className="container flex flex-col items-center justify-center h-full">
        <h2 className="text-gray-100 text-center text-6xl font-bold tracking-tight">
          Create new account
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
            type="text"
            placeholder="Name"
            {...register('name')}
          />
          <input
            className="input"
            type="text"
            placeholder="Username"
            {...register('username')}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            {...register('password')}
          />

          <button
            type="submit"
            className="btn group relative mt-4 flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium bg-indigo-600 hover:bg-indigo-800"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiLock className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            Sign up
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

export default RegisterPage
