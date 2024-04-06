import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FetchProfileUseCaseRequeste = {
  id: string
}

type FetchProfileUseCaseResponse = {
  profile: {
    id: string
    email: string
    name: string
    phone: string | null
    role: 'manager' | 'customer'
    createdAt: Date
    updatedAt: Date
  }
}

export class FetchProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }
  async execute({
    id,
  }: FetchProfileUseCaseRequeste): Promise<FetchProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { profile: user }
  }
}
