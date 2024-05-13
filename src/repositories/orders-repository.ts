import { NewOrder, Order } from '../db/schema'

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  create(newOrder: NewOrder): Promise<Order>
}
