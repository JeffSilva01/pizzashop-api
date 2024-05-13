import { OrdersRepository } from '../repositories/orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetOrderRequeste = {
  orderId: string
}

type GetOrderResponse = {
  order: {
    id: string
    customerId: string | null
    restaurantId: string
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    totalInCents: number
    comments: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export class GetOrderUseCase {
  constructor(private orderRepository: OrdersRepository) {}
  async execute({ orderId }: GetOrderRequeste): Promise<GetOrderResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
