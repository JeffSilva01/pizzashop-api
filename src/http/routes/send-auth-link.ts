import { Elysia, t } from 'elysia'

import { env } from '../../env'
import { db } from '../../db/connection'
import { authLinks } from '../../db/schema'
import { createId } from '@paralleldrive/cuid2'
import { transport } from '../../lib/nodemailer'

export const sendAuthLink = new Elysia().post(
  'authenticate',
  async ({ body, set }) => {
    const { email } = body

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })

    if (!user) {
      throw new Error('User not found.')
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: user.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    transport.sendMail({
      from: '"Jefferson Silva 👻" <jeffsilva01.dev@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: `Click no link para fazer login: ${authLink.toString()}`, // plain text body
      html: `<p>Click no link para fazer login: <a href="${authLink.toString()}">LINK</a></p>`,
    })

    set.status = 204
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
