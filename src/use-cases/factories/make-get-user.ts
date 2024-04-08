import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { GetUserUseCase } from '../get-user'

export function makeGetUser() {
  const userRepository = new DrizzleUsersRepository()
  const useCase = new GetUserUseCase(userRepository)

  return useCase
}
