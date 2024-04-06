import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { FetchProfileUseCase } from '../fetch-profile'

export function makeFetchProfile() {
  const userRepository = new DrizzleUsersRepository()
  const useCase = new FetchProfileUseCase(userRepository)

  return useCase
}
