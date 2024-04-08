import { Elysia } from 'elysia'
import { auth } from '../auth'
import { makeGetRestaurant } from '../../use-cases/factories/make-get-restaurant'
import { UserIsNotManage } from '../../use-cases/errors/user-is-not-manage'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UserIsNotManage()
    }

    const getRestaurant = makeGetRestaurant()
    const managedRestaurant = await getRestaurant.execute({ restaurantId })

    return {
      managedRestaurant,
    }
  })
