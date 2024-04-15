import { DrizzleAuthCodesRepository } from '../../repositories/drizzle/drizzle-auth-codes-repository'
import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { CreateAuthenticateCodeUseCase } from '../create-authenticate-code'

export function makeCreateAuthenticateCode() {
  const usersRepository = new DrizzleUsersRepository()
  const authLinksRepository = new DrizzleAuthCodesRepository()
  const useCase = new CreateAuthenticateCodeUseCase(
    usersRepository,
    authLinksRepository,
  )

  return useCase
}
