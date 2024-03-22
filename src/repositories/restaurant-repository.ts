import { NewRestaurant, Restaurant } from '../db/schema'

export interface RestaurantRepository {
  create(data: NewRestaurant): Promise<Restaurant>
}
