import { RestaurantsRepository } from '../repositories/restaurants-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetRestaurantUseCaseRequest {
  restaurantId: string
}

interface GetRestaurantUseCaseResponse {
  restaurant: {
    id: string
    name: string
    managerId: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export class GetRestaurant {
  constructor(private restaurantRepository: RestaurantsRepository) {}
  async execute({
    restaurantId,
  }: GetRestaurantUseCaseRequest): Promise<GetRestaurantUseCaseResponse> {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new ResourceNotFoundError()
    }

    return {
      restaurant,
    }
  }
}
