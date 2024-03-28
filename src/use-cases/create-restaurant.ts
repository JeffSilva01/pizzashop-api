import { RestaurantsRepository } from '../repositories/restaurants-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateRestaurantUseCaseRequest {
  userEmail: string
  userPhone?: string
  userName: string
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
    userName,
    restaurantName,
    userEmail,
    userPhone,
    restaurantDescription,
  }: CreateRestaurantUseCaseRequest): Promise<CreateRestaurantUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(userEmail)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name: userName,
      email: userEmail,
      role: 'manager',
      phone: userPhone,
    })

    const restaurant = await this.restaurantRepository.create({
      name: restaurantName,
      description: restaurantDescription,
      managerId: user.id,
    })

    return {
      restaurant,
    }
  }
}
