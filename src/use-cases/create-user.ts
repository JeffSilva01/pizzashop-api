import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  email: string
  phone?: string
  name: string
  role?: 'manager' | 'customer'
}

interface CreateUserUseCaseResponse {
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

export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    phone,
    name,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.userRepository.create({
      email,
      phone,
      name,
      role,
    })

    return {
      user,
    }
  }
}
