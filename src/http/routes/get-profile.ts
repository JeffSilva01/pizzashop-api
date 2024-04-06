import { Elysia } from 'elysia'
import { auth } from '../auth'
import { makeFetchProfile } from '../../use-cases/factories/make-fetch-profile'

export const getProfile = new Elysia()
  .use(auth)
  .get('/me', async ({ getCurrentUser }) => {
    const { userId: id } = await getCurrentUser()

    const fetchProfile = makeFetchProfile()
    const { profile } = await fetchProfile.execute({ id })

    return { user: profile }
  })
