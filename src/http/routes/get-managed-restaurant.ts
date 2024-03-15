import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new Error('User is not manage.')
    }

    const managerRestaurant = await db.query.restaurants.findFirst({
      where(filds, { eq }) {
        return eq(filds.id, restaurantId)
      },
    })

    return {
      managerRestaurant,
    }
  })
