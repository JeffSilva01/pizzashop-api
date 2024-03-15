import { Elysia } from 'elysia'
import { registerRestaurants } from './routes/register-restaurants'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFomLInk } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'

const app = new Elysia()
  .use(registerRestaurants)
  .use(sendAuthLink)
  .use(authenticateFomLInk)
  .use(signOut)
  .use(getProfile)

app.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
  )
})
