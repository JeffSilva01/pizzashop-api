import { faker } from '@faker-js/faker'
import type { Order, NewOrder } from '../../db/schema'
import type { OrdersRepository } from '../orders-repository'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create({ status, customerId, restaurantId, totalInCents }: NewOrder) {
    const createOrder = {
      id: createId(),
      status: status || 'pending',
      comments: faker.lorem.paragraphs(),
      customerId: customerId || null,
      restaurantId,
      totalInCents,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(createOrder)

    return createOrder
  }

  async findById(orderId: string) {
    const order = this.items.find((item) => item.id === orderId)

    if (!order) {
      return null
    }

    return order
  }
}
