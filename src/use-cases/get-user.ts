import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetUserUseCaseRequeste = {
  id: string
}

type GetUserUseCaseResponse = {
  user: {
    id: string
    email: string
    name: string
    phone: string | null
    role: 'manager' | 'customer'
    createdAt: Date
    updatedAt: Date
  }
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    id,
  }: GetUserUseCaseRequeste): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
