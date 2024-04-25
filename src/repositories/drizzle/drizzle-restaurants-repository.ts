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

  async findById(id: string) {
    const restaurant = await db.query.restaurants.findFirst({
      where(filds, { eq }) {
        return eq(filds.id, id)
      },
    })

    return restaurant || null
  }

  async findByManagerId(id: string) {
    const restaurant = await db.query.restaurants.findFirst({
      where(filds, { eq }) {
        return eq(filds.managerId, id)
      },
    })

    return restaurant || null
  }
}
