import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { auth } from '../auth'
import { authLinks } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const authenticateFomLInk = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, set, signUser }) => {
    const { code, redirect } = query

    const authLinkFromCode = await db.query.authLinks.findFirst({
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
      await db.delete(authLinks).where(eq(authLinks.code, code))
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

    await db.delete(authLinks).where(eq(authLinks.code, code))

    set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
