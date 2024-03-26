import { db } from '../../db/connection'
import { NewRestaurant, restaurants } from '../../db/schema'
import { RestaurantsRepository } from '../restaurants-repository'

export class DrizzleRestaurantRepository implements RestaurantsRepository {
  async create({ name, description, managerId }: NewRestaurant) {
    const [restaurant] = await db
      .insert(restaurants)
      .values({
        name,
        description,
        managerId,
      })
      .returning()

    return restaurant
  }
}
