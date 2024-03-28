import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUser() {
  const userRepository = new DrizzleUsersRepository()
  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}
