import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email().min(5).max(190),
  name: z.string().min(3).max(190),
  username: z.string().min(3).max(190),
  password: z.string().min(8).max(50),
})

export type RegisterType = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  email: z.string().email().min(5).max(190),
  password: z.string().min(8).max(50),
})

export type LoginType = z.infer<typeof LoginSchema>
