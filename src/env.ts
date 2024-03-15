import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url().default('http://localhost:3333'),
  AUTH_REDIRECT_URL: z.string().url(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  JWT_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
