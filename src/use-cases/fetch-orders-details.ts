import { OrdersRepository } from '../repositories/orders-repository'

type Filters = {
  customerName?: string
  orderId?: string
  status?: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
}

type FetchOrdersDetailsPaginatedUseCaseRequeste = {
  restaurantId: string
  pageIndex: number
  filters?: Filters
}

type FetchOrdersDetailsPaginatedUseCaseResponse = {
  orders: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    total: number
    customerName: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export class FetchOrdersDetailsPaginatedUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    restaurantId,
    pageIndex,
    filters,
  }: FetchOrdersDetailsPaginatedUseCaseRequeste): Promise<FetchOrdersDetailsPaginatedUseCaseResponse> {
    const { orders, meta } = await this.ordersRepository.findMany(
      restaurantId,
      pageIndex,
      filters,
    )

    return { orders, meta }
  }
}
