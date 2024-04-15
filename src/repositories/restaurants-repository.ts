import { NewRestaurant, Restaurant } from '../db/schema'

export interface RestaurantsRepository {
  create(data: NewRestaurant): Promise<Restaurant>
  findById(id: string): Promise<Restaurant | null>
  findByManagerId(id: string): Promise<Restaurant | null>
}
