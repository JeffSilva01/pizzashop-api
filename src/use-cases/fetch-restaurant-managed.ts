import { RestaurantsRepository } from '../repositories/restaurants-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchRestaurantManagedUseCaseRequest {
  restaurantId: string
}

interface FetchRestaurantManagedUseCaseResponse {
  restaurant: {
    id: string
    name: string
    managerId: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export class FetchRestaurantManaged {
  constructor(private restaurantRepository: RestaurantsRepository) { }
  async execute({
    restaurantId,
  }: FetchRestaurantManagedUseCaseRequest): Promise<FetchRestaurantManagedUseCaseResponse> {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new ResourceNotFoundError()
    }

    return {
      restaurant,
    }
  }
}
