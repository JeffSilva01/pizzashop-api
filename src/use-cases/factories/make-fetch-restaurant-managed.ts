import { DrizzleRestaurantRepository } from '../../repositories/drizzle/drizzle-restaurants-repository'
import { FetchRestaurantManaged } from '../fetch-restaurant-managed'

export function makeFetchRestaurantManaged() {
  const restaurantRepository = new DrizzleRestaurantRepository()
  const useCase = new FetchRestaurantManaged(restaurantRepository)

  return useCase
}
