import { Elysia, t } from 'elysia'

import { env } from '../../env'
import { db } from '../../db/connection'
import { authLinks } from '../../db/schema'
import { createId } from '@paralleldrive/cuid2'
import { mail } from '../../lib/mail'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
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

    mail.sendMail({
      from: {
        name: 'Pizza Shop',
        address: 'hi@pizzashop.com',
      }, // sender address
      to: email, // list of receivers
      subject: 'Authenticate to Pizza Shop', // Subject line
      text: `Use the following to authenticate on Pizza Shop: ${authLink.toString()}`, // plain text body
      html: `<p>Use the following to authenticate on Pizza Shop: <a href="${authLink.toString()}" target="_blank">LINK</a></p>`,
    })

    set.status = 204
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
