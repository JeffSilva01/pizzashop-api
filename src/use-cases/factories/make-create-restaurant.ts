import { DrizzleRestaurantRepository } from '../../repositories/drizzle/drizzle-restaurants-repository'
import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { CreateRestaurantUseCase } from '../create-restaurant'

export function makeCreateRestaurant() {
  const userRepository = new DrizzleUsersRepository()
  const restaurantRepository = new DrizzleRestaurantRepository()

  const useCase = new CreateRestaurantUseCase(
    restaurantRepository,
    userRepository,
  )

  return useCase
}
