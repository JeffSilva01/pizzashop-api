import { Elysia, t } from 'elysia'
import { auth } from '../auth'
import { makeAuthenticateFromCode } from '../../use-cases/factories/make-authenticate-from-code'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, set, signUser }) => {
    const { code, redirect } = query

    const authenticateFromCodeUseCase = makeAuthenticateFromCode()
    const { userId, restaurantId } = await authenticateFromCodeUseCase.execute({
      code,
    })

    await signUser({
      sub: userId,
      restaurantId,
    })

    set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
