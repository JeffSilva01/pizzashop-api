import { createId } from '@paralleldrive/cuid2'
import { UsersRepository } from '../repositories/users-repository'
import { AuthCodesRepository } from '../repositories/auth-codes-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type CreateAuthenticateCodeUseCaseRequeste = {
  userEmail: string
}

type CreateAuthenticateCodeUseCaseResponse = {
  code: string
}

export class CreateAuthenticateCodeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private authCodesRepository: AuthCodesRepository,
  ) {}

  async execute({
    userEmail,
  }: CreateAuthenticateCodeUseCaseRequeste): Promise<CreateAuthenticateCodeUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(userEmail)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const code = createId()

    await this.authCodesRepository.create({
      userId: user.id,
      code,
    })

    return {
      code,
    }
  }
}
