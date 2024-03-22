import { db } from '../../db/connection'
import { NewRestaurant, restaurants } from '../../db/schema'
import { RestaurantRepository } from '../restaurant-repository'

export class DrizzleRestaurantRepository implements RestaurantRepository {
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
