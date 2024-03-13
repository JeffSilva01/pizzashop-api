import { Elysia, t } from 'elysia'
import { db } from '../db/connection'
import { restaurants, users } from '../db/schema'

const app = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, description, phone } = body

    const [manager] = await db
      .insert(users)
      .values({
        email,
        phone,
        name: managerName,
        role: 'manager',
      })
      .returning({ id: users.id })

    await db.insert(restaurants).values({
      name: restaurantName,
      description,
      managerId: manager.id,
    })

    set.status = 204
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      managerName: t.String(),
      email: t.String({ format: 'email' }),
      description: t.Optional(t.String()),
      phone: t.String(),
    }),
  },
)

app.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
  )
})
