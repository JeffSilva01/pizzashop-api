import { Elysia, Static, t } from 'elysia'

import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '../env'
import { UnauthorizadErro } from './errors/unauthorized-error'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .error({
    UNAUTHORIZAD: UnauthorizadErro,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'UNAUTHORIZAD': {
        set.status = 401
        return { code, message: error.message }
      }
    }
  })
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ setCookie, jwt, removeCookie, cookie }) => {
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
      getCurrentUser: async () => {
        const authCookie = cookie.auth

        const payload = await jwt.verify(authCookie)

        if (!payload) {
          throw new UnauthorizadErro()
        }

        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
    }
  })
