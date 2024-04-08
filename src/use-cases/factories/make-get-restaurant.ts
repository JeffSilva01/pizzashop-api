import { DrizzleRestaurantRepository } from '../../repositories/drizzle/drizzle-restaurants-repository'
import { GetRestaurant } from '../get-restaurant'

export function makeGetRestaurant() {
  const restaurantRepository = new DrizzleRestaurantRepository()
  const useCase = new GetRestaurant(restaurantRepository)

  return useCase
}
