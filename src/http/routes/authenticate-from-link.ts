import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { auth } from '../auth'
import { authCodes } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const authenticateFomLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, set, signUser }) => {
    const { code, redirect } = query

    const authLinkFromCode = await db.query.authCodes.findFirst({
      where(filds, { eq }) {
        return eq(filds.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Auth link not Found.')
    }

    const minutesSinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'minutes',
    )

    if (minutesSinceAuthLinkWasCreated > 15) {
      await db.delete(authCodes).where(eq(authCodes.code, code))
      throw new Error('Auth link expied, please generate a new one.')
    }

    const restaurant = await db.query.restaurants.findFirst({
      where(filds, { eq }) {
        return eq(filds.managerId, authLinkFromCode.userId)
      },
    })

    await signUser({
      sub: authLinkFromCode.userId,
      restaurantId: restaurant?.id,
    })

    await db.delete(authCodes).where(eq(authCodes.code, code))

    set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
