import { Elysia, Static, t } from 'elysia'

import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ setCookie, jwt, removeCookie }) => {
    return {
      signUser: async ({ sub, restaurantId }: Static<typeof jwtPayload>) => {
        const jwtToken = await jwt.sign({
          sub,
          restaurantId,
        })

        setCookie('auth', jwtToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })
      },
      signOut: () => {
        removeCookie('auth')
      },
    }
  })
