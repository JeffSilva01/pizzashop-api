import { createId } from '@paralleldrive/cuid2'
import { RestaurantsRepository } from '../restaurants-repository'
import { NewRestaurant, Restaurant } from '../../db/schema'

export class InMemoryRestaurantsRepository implements RestaurantsRepository {
  public items: Restaurant[] = []

  async create({ name, description, managerId }: NewRestaurant) {
    const restaurant = {
      id: createId(),
      name,
      description: description || null,
      managerId: managerId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(restaurant)

    return restaurant
  }

  async findById(id: string) {
    const restaurant = this.items.find((item) => item.id === id)

    return restaurant || null
  }
}
