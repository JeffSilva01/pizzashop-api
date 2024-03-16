import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'
import { UnauthorizadErro } from '../errors/unauthorized-error'

export const getProfile = new Elysia()
  .use(auth)
  .get('/me', async ({ getCurrentUser }) => {
    const { userId } = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where(filds, { eq }) {
        return eq(filds.id, userId)
      },
    })

    if (!user) {
      throw new UnauthorizadErro()
    }

    return { user }
  })
