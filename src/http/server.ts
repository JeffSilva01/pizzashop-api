import { Elysia } from 'elysia'
import { registerRestaurants } from './routes/register-restaurants'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurant } from './routes/get-managed-restaurant'
import swagger from '@elysiajs/swagger'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'

const app = new Elysia()
  .use(swagger())
  .use(registerRestaurants)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .onError(({ error, code, set }) => {
    if (error instanceof ResourceNotFoundError) {
      set.status = 404

      return {
        message: error.message,
      }
    }

    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      default: {
        set.status = 500

        console.error(error)

        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
  )
})
