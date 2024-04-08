import { Elysia } from 'elysia'
import { auth } from '../auth'
import { makeGetUser } from '../../use-cases/factories/make-get-user'

export const getProfile = new Elysia()
  .use(auth)
  .get('/me', async ({ getCurrentUser }) => {
    const { userId: id } = await getCurrentUser()

    const fetchProfile = makeGetUser()
    const { user } = await fetchProfile.execute({ id })

    return { user }
  })
