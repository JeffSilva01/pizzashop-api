import { Elysia } from 'elysia'
import { auth } from '../auth'
import { makeFetchRestaurantManaged } from '../../use-cases/factories/make-fetch-restaurant-managed'
import { UserIsNotManage } from '../../use-cases/errors/user-is-not-manage'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UserIsNotManage()
    }

    const fetchRestaurantManaged = makeFetchRestaurantManaged()
    const managedRestaurant = fetchRestaurantManaged.execute({ restaurantId })

    return {
      managedRestaurant,
    }
  })
