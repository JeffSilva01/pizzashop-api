import { RestaurantsRepository } from '../repositories/restaurants-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateRestaurantUseCaseRequest {
  managerEmail: string
  managerPhone?: string
  managerName: string
  restaurantName: string
  restaurantDescription?: string
}

interface CreateRestaurantUseCaseResponse {
  restaurant: {
    id: string
    name: string
    description: string | null
    managerId: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export class CreateRestaurantUseCase {
  constructor(
    private restaurantRepository: RestaurantsRepository,
    private userRepository: UsersRepository,
  ) {}

  async execute({
    managerName,
    managerEmail,
    managerPhone,
    restaurantName,
    restaurantDescription,
  }: CreateRestaurantUseCaseRequest): Promise<CreateRestaurantUseCaseResponse> {
    const userWithSameEmail =
      await this.userRepository.findByEmail(managerEmail)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const manager = await this.userRepository.create({
      name: managerName,
      email: managerEmail,
      role: 'manager',
      phone: managerPhone,
    })

    const restaurant = await this.restaurantRepository.create({
      name: restaurantName,
      description: restaurantDescription,
      managerId: manager.id,
    })

    return {
      restaurant,
    }
  }
}
