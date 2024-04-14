import { Elysia, t } from 'elysia'

import { env } from '../../env'
import queue from '../../lib/queue'
import { makeCreateAuthenticateCode } from '../../use-cases/factories/make-create-authenticate-code'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body, set }) => {
    const { email } = body

    const createAuthLinksUseCase = makeCreateAuthenticateCode()
    const { code } = await createAuthLinksUseCase.execute({ userEmail: email })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', code)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    queue.add('registrationMail', { authLink, email })

    set.status = 204
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
