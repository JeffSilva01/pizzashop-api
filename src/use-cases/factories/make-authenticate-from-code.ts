import { DrizzleAuthCodesRepository } from '../../repositories/drizzle/drizzle-auth-codes-repository'
import { DrizzleRestaurantRepository } from '../../repositories/drizzle/drizzle-restaurants-repository'
import { AuthenticateFromCodeUseCase } from '../authenticate-from-code'

export function makeAuthenticateFromCode() {
  const authCodesRepository = new DrizzleAuthCodesRepository()
  const restaurantRepository = new DrizzleRestaurantRepository()

  const useCase = new AuthenticateFromCodeUseCase(
    authCodesRepository,
    restaurantRepository,
  )

  return useCase
}
